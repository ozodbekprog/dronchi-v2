export const DEMO_ACCOUNT = {
  name: "Demo foydalanuvchi",
  email: "demo@dronchi.uz",
  password: "demo1234",
} as const;

export const DEMO_SESSION_KEY = "dronchi-demo-session";
export const DEMO_SESSION_EVENT = "dronchi-demo-session-change";

/** Demo hisob uchun standart xarid qilingan tarif. */
export const DEMO_DEFAULT_TARIFF = "qollab-quvvatlash";

export type DemoSession = {
  name: string;
  email: string;
  demo: true;
  loggedInAt: number;
  tariff: string;
};

export function readDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DEMO_SESSION_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<DemoSession> | null;
    if (!saved || saved.demo !== true) return null;
    const name =
      typeof saved.name === "string" && saved.name.trim()
        ? saved.name.trim().slice(0, 80)
        : DEMO_ACCOUNT.name;
    const email =
      typeof saved.email === "string" && saved.email.includes("@")
        ? saved.email.trim().slice(0, 120)
        : DEMO_ACCOUNT.email;
    return {
      name,
      email,
      demo: true,
      loggedInAt: typeof saved.loggedInAt === "number" ? saved.loggedInAt : Date.now(),
      tariff:
        typeof saved.tariff === "string" && saved.tariff ? saved.tariff : DEMO_DEFAULT_TARIFF,
    };
  } catch {
    return null;
  }
}

function notifyChange() {
  try {
    window.dispatchEvent(new Event(DEMO_SESSION_EVENT));
  } catch {
    /* event mavjud bo'lmasa ham sessiya saqlanadi */
  }
}

export function saveDemoSession(
  tariff: string = DEMO_DEFAULT_TARIFF,
  profile?: { name?: string; email?: string }
): DemoSession {
  const session: DemoSession = {
    name: profile?.name?.trim() || DEMO_ACCOUNT.name,
    email: profile?.email?.trim() || DEMO_ACCOUNT.email,
    demo: true,
    loggedInAt: Date.now(),
    tariff,
  };
  try {
    window.localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(session));
  } catch {
    /* localStorage mavjud bo'lmasa ham kirish ishlaydi */
  }
  notifyChange();
  return session;
}

export function updateDemoTariff(tariff: string): DemoSession | null {
  const current = readDemoSession();
  if (!current) return null;
  return saveDemoSession(tariff, { name: current.name, email: current.email });
}

export function clearDemoSession() {
  try {
    window.localStorage.removeItem(DEMO_SESSION_KEY);
  } catch {
    /* sessiya tozalash imkoni bo'lmasa ham forma ochiladi */
  }
  notifyChange();
}
