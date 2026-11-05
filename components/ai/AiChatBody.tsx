"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkle } from "@/components/Icons";
import { useLang } from "@/lib/lang";
import { CHAT_TEXT } from "./chatText";
import { toCyrillic, toLatin, toOldLatin } from "./script";
import type { ChatMessage } from "./useAiChat";

function clean(text: string) {
  return text.replace(/\*\*/g, "").replace(/^#{1,6}\s*/gm, "");
}



export default function AiChatBody({
  messages,
  loading,
  error,
  onSend,
  onStop,
  onClear,
  compact = false,
}: {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  onSend: (text: string) => void;
  onStop: () => void;
  onClear: () => void;
  compact?: boolean;
}) {
  const { lang } = useLang();
  const t = CHAT_TEXT[lang] ?? CHAT_TEXT.uz;
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  useEffect(() => {
    const onAsk = (event: Event) => {
      const prompt = (event as CustomEvent<string>).detail;
      if (prompt && !loading) onSend(prompt);
    };
    window.addEventListener("dronchi-ai-ask", onAsk);
    return () => window.removeEventListener("dronchi-ai-ask", onAsk);
  }, [loading, onSend]);

  const submit = () => {
    if (!text.trim() || loading) return;
    onSend(text);
    setText("");
    inputRef.current?.focus();
  };

  return (
    <div className={`ai-chat${compact ? " ai-chat--compact" : ""}`}>
      <div className="ai-messages" ref={listRef} aria-live="polite">
        {messages.length === 0 && (
          <div className="ai-intro">
            <span className="ai-intro-icon">
              <Sparkle size={22} />
            </span>
            <h3>{t.introTitle}</h3>
            <p>{t.introText}</p>
            <div className="ai-suggestions">
              {t.suggestions.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => onSend(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message, index) => {
          const emptyAssistant =
            message.role === "assistant" && !message.content && loading && index === messages.length - 1;
          if (emptyAssistant) {
            return (
              <div className="ai-msg ai-msg--assistant" key={index}>
                <span className="ai-msg-avatar">
                  <Sparkle size={12} />
                </span>
                <div className="ai-msg-bubble ai-typing" aria-label="AI yozmoqda">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            );
          }
          const base = clean(message.content);
          const display =
            message.role === "assistant" && lang === "uz-cyrl"
              ? toCyrillic(base)
              : message.role === "assistant" && lang === "uz-old"
                ? toOldLatin(toLatin(base))
                : base;
          return (
            <div className={`ai-msg ai-msg--${message.role}`} key={index}>
              {message.role === "assistant" && (
                <span className="ai-msg-avatar">
                  <Sparkle size={12} />
                </span>
              )}
              <div className="ai-msg-bubble">{display}</div>
            </div>
          );
        })}

        {error && !loading && (
          <p className="ai-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="ai-compose">
        <textarea
          ref={inputRef}
          rows={2}
          value={text}
          placeholder={t.placeholder}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          aria-label="AI uchun savol"
        />
        <div className="ai-compose-actions">
          {messages.length > 0 && !loading && (
            <button type="button" className="ai-text-btn" onClick={onClear}>
              {t.clear}
            </button>
          )}
          {loading ? (
            <button type="button" className="ai-stop-btn" onClick={onStop}>
              {t.stop}
            </button>
          ) : (
            <button
              type="button"
              className="ai-send-btn"
              onClick={submit}
              disabled={!text.trim()}
              aria-label={t.send}
            >
              <Send size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
