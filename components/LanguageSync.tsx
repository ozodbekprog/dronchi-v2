"use client";

import { useEffect } from "react";
import { langInfo, useLang } from "@/lib/lang";

export default function LanguageSync() {
  const { lang } = useLang();

  useEffect(() => {
    document.documentElement.lang = langInfo(lang).htmlLang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  return null;
}
