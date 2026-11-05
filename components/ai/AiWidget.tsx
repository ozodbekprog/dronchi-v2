"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Close, Sparkle } from "@/components/Icons";
import LangSwitch from "@/components/LangSwitch";
import { useLang } from "@/lib/lang";
import { CHAT_TEXT } from "./chatText";
import AiChatBody from "./AiChatBody";
import useAiChat from "./useAiChat";

export default function AiWidget() {
  const pathname = usePathname();
  const { lang } = useLang();
  const t = CHAT_TEXT[lang] ?? CHAT_TEXT.uz;
  const [open, setOpen] = useState(false);
  const { messages, loading, error, send, stop, clear } = useAiChat();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (pathname === "/ai") return null;

  return (
    <>
      <button
        type="button"
        className={`ai-fab${open ? " is-open" : ""}`}
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Fariza chatini yopish" : "Fariza bilan suhbat"}
        aria-expanded={open}
      >
        {open ? <Close size={18} /> : <Sparkle size={20} />}
        <span>Fariza</span>
      </button>

      {open && (
        <div className="ai-panel" role="dialog" aria-label="Fariza — DRONCHI yordamchisi">
          <div className="ai-panel-head">
            <div className="ai-panel-title">
              <span className="ai-panel-logo">
                <Sparkle size={15} />
              </span>
              <div>
                <strong>{t.assistantTitle}</strong>
                <em>DRONCHI AI yordamchisi</em>
              </div>
            </div>
            <div className="ai-panel-actions">
              <LangSwitch variant="panel" />
              <Link href="/ai" className="ai-panel-link" title="To'liq sahifa">
                <ArrowUpRight size={15} />
              </Link>
              <button type="button" onClick={() => setOpen(false)} aria-label="Yopish">
                <Close size={16} />
              </button>
            </div>
          </div>

          <AiChatBody
            messages={messages}
            loading={loading}
            error={error}
            onSend={send}
            onStop={stop}
            onClear={clear}
            compact
          />
        </div>
      )}
    </>
  );
}
