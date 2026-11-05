"use client";

import { useCallback, useRef, useState } from "react";
import { useLang } from "@/lib/lang";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function useAiChat() {
  const { lang } = useLang();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || loading) return;

      const next: ChatMessage[] = [...messages, { role: "user", content: question }];
      setMessages([...next, { role: "assistant", content: "" }]);
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: { "content-type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: next,
            page: window.location.pathname,
            lang,
          }),
        });

        if (!response.ok) {
          const details = await response.text().catch(() => "");
          throw new Error(details || "AI javob bera olmadi.");
        }
        if (!response.body) throw new Error("AI javobi bo'sh keldi.");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          setMessages((current) => {
            const copy = [...current];
            copy[copy.length - 1] = { role: "assistant", content: answer };
            return copy;
          });
        }

        if (!answer.trim()) {
          throw new Error("AI bo'sh javob qaytardi. Qayta urinib ko'ring.");
        }
      } catch (caught) {
        if (controller.signal.aborted) {
          setMessages((current) => {
            const copy = [...current];
            if (copy[copy.length - 1]?.role === "assistant" && !copy[copy.length - 1].content) {
              copy.pop();
            }
            return copy;
          });
          return;
        }
        const message =
          caught instanceof Error ? caught.message : "AI bilan ulanishda xatolik.";
        setError(message);
        setMessages((current) => {
          const copy = [...current];
          if (copy[copy.length - 1]?.role === "assistant" && !copy[copy.length - 1].content) {
            copy[copy.length - 1] = {
              role: "assistant",
              content: "Kechirasiz, javob berishda xatolik yuz berdi. Qayta urinib ko'ring.",
            };
          }
          return copy;
        });
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [loading, messages, lang]
  );

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setLoading(false);
  }, []);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setError(null);
    setLoading(false);
  }, []);

  return { messages, loading, error, send, stop, clear };
}
