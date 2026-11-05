"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "@/components/Icons";
import { LANGUAGES, useLang } from "@/lib/lang";

export default function LangSwitch({
  variant = "header",
}: {
  variant?: "header" | "app" | "panel";
}) {
  const { lang, setLang, info } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "panel") {
    return (
      <label className="ai-lang-select">
        <span className="sr-only">Til tanlash</span>
        <select
          value={lang}
          onChange={(event) => setLang(event.target.value as typeof lang)}
          aria-label="AI javob tili"
        >
          {LANGUAGES.map((language) => (
            <option value={language.code} key={language.code} title={language.label}>
              {language.short}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div className="lang-wrap" ref={ref}>
      <button
        type="button"
        className={variant === "app" ? "app-lang" : "lang-btn"}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        title={info.label}
      >
        {info.short} <ChevronDown size={12} />
      </button>
      {open && (
        <div className="lang-menu" role="menu" aria-label="Til tanlash">
          {LANGUAGES.map((language) => (
            <button
              type="button"
              role="menuitemradio"
              aria-checked={language.code === lang}
              className={language.code === lang ? "is-active" : undefined}
              key={language.code}
              onClick={() => {
                setLang(language.code);
                setOpen(false);
              }}
            >
              {language.label} <span>{language.hint}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
