const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://127.0.0.1:11435";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "qwen3.5:122b-a10b";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 60;
const buckets = new Map<string, number[]>();

function isAllowed(ip: string) {
  const now = Date.now();
  const recent = (buckets.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    buckets.set(ip, recent);
    return false;
  }
  recent.push(now);
  buckets.set(ip, recent);
  if (buckets.size > 500) {
    for (const [key, value] of buckets) {
      if (!value.some((time) => now - time < WINDOW_MS)) buckets.delete(key);
    }
  }
  return true;
}

type IncomingMessage = { role: string; content: string };

const LANG_RULES: Record<string, string> = {
  uz: "Answer in Uzbek using the Latin alphabet.",
  ru: "Answer in Russian.",
  "uz-cyrl": "Answer only in Uzbek Cyrillic script. Жавобни фақат ўзбек кирилл алифбосида ёзинг, лотин ҳарфларини ишлатманг.",
  "uz-new": "Answer in Uzbek using the modern official Latin alphabet (1995 reform).",
  "uz-old":
    "Answer only in the old Uzbek Latin alphabet (Yañalif), never in Cyrillic: ə, ç, ş, ñ, ö, ü, ı, ğ. Even if the question is in Cyrillic, answer in old Latin.",
};

function systemPrompt(page: string | undefined, lang: string) {
  return [
    "Sen Fariza — DRONCHI platformasining AI yordamchisisan.",
    "O'zingni doim Fariza deb tanishtir. Inson emasligingni yashirma; so'ralsa, AI yordamchi ekaningni ayt.",
    "Model nomi, versiyasi, parametrlar, server, GPU yoki boshqa texnik tafsilotlarni hech qachon aytma. So'ralsa: \"Men Fariza — DRONCHI yordamchisiman; texnik tafsilotlarni baham ko'rmayman.\"",
    "DRONCHI jamoasi yoki boshqa foydalanuvchilar haqidagi shaxsiy ma'lumotlarni ham oshkor qilma.",
    "Foydalanuvchining shaxsiy ma'lumotlarini so'rama, taxmin qilma yoki oshkor qilma. Faqat platforma va parvoz bo'yicha yordam ber.",
    "Har doim foydalanuvchi tanlagan tilda qisqa, aniq va do'stona javob ber.",
    LANG_RULES[lang] ?? LANG_RULES.uz,
    "Dron, FPV, parvoz xavfsizligi, kurslar, poligonlar va platformadan foydalanish bo'yicha yordam ber.",
    "Amaliy maslahatlarni 3–5 band yoki qisqa paragrafda ber; ortiqcha uzun javob yozma.",
    "Javobda Markdown belgilaridan (**, ##, ```) foydalanma; oddiy matn va 1) 2) ko‘rinishidagi ro‘yxatdan foydalan.",
    "Noqonuniy yoki xavfli parvozni tavsiya qilma; qonun va xavfsizlikni eslatib o't.",
    "Platforma narxlari yoki aniq kurs ma'lumotlarini bilmasang, taxmin qilma — akademiya yoki kabinetga yo'naltir.",
    page ? `Foydalanuvchi hozir "${page}" sahifasida.` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (!isAllowed(ip)) {
    return new Response("Fariza vaqtincha band. 10 daqiqadan keyin qayta urinib ko'ring.", {
      status: 429,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  let payload: { messages?: IncomingMessage[]; page?: string; lang?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response("Noto'g'ri so'rov.", { status: 400 });
  }

  const incoming = (payload.messages ?? [])
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
    )
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 2000),
    }));

  if (!incoming.length || incoming[incoming.length - 1].role !== "user") {
    return new Response("Savol yuborilmadi.", { status: 400 });
  }

  const page = typeof payload.page === "string" ? payload.page.slice(0, 120) : undefined;
  const lang = typeof payload.lang === "string" && LANG_RULES[payload.lang] ? payload.lang : "uz";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 180_000);

  let upstream: Response;
  try {
    upstream = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: true,
        think: false,
        messages: [
          { role: "system", content: systemPrompt(page, lang) },
          ...incoming,
        ],
        options: {
          temperature: 0.5,
          top_p: 0.9,
          num_predict: 700,
        },
      }),
    });
  } catch {
    clearTimeout(timeout);
    return new Response("Fariza hozir javob bera olmayapti. Keyinroq qayta urinib ko'ring.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  if (!upstream.ok || !upstream.body) {
    clearTimeout(timeout);
    const details = await upstream.text().catch(() => "");
    console.error("Ollama error", upstream.status, details.slice(0, 300));
    return new Response("Fariza hozir javob bera olmayapti. Keyinroq qayta urinib ko'ring.", {
      status: 502,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream<Uint8Array>({
    async start(streamController) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            try {
              const event = JSON.parse(trimmed) as {
                message?: { content?: string };
                done?: boolean;
                error?: string;
              };
              if (event.error) {
                streamController.enqueue(encoder.encode(`\nXatolik: ${event.error}`));
                continue;
              }
              const token = event.message?.content;
              if (token) streamController.enqueue(encoder.encode(token));
            } catch {
              /* yarim qolgan JSON qatorini keyingi chunk bilan davom ettiramiz */
            }
          }
        }
      } catch {
        streamController.enqueue(encoder.encode("\nUlanish uzildi. Qayta urinib ko'ring."));
      } finally {
        clearTimeout(timeout);
        reader.releaseLock();
        streamController.close();
      }
    },
    cancel() {
      clearTimeout(timeout);
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
    },
  });
}
