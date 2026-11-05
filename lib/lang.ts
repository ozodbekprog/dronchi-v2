import { useSyncExternalStore } from "react";

export type LangCode = "uz" | "ru" | "uz-cyrl" | "uz-new" | "uz-old";

export const LANGUAGES: {
  code: LangCode;
  label: string;
  short: string;
  hint: string;
  htmlLang: string;
}[] = [
  { code: "uz", label: "O'zbekcha", short: "UZ", hint: "Lotin", htmlLang: "uz-Latn" },
  { code: "ru", label: "Русский", short: "RU", hint: "Рус", htmlLang: "ru" },
  { code: "uz-cyrl", label: "Ўзбекча", short: "ЎЗ", hint: "Кирилл", htmlLang: "uz-Cyrl" },
  { code: "uz-new", label: "O'zbek (yangi lotin)", short: "UZ+", hint: "Yangi lotin", htmlLang: "uz-Latn" },
  { code: "uz-old", label: "O'zbek (eski lotin)", short: "UZ−", hint: "Eski lotin", htmlLang: "uz-Latn" },
];

const STORAGE_KEY = "dronchi-lang";
const EVENT = "dronchi-lang-change";

export function isLang(value: unknown): value is LangCode {
  return LANGUAGES.some((language) => language.code === value);
}

export function readLang(): LangCode {
  if (typeof window === "undefined") return "uz";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : "uz";
  } catch {
    return "uz";
  }
}

export function langInfo(code: LangCode) {
  return LANGUAGES.find((language) => language.code === code) ?? LANGUAGES[0];
}

function applyLang(code: LangCode) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = langInfo(code).htmlLang;
  document.documentElement.dataset.lang = code;
}

export function setLang(code: LangCode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, code);
  } catch {
    /* localStorage mavjud bo'lmasa ham til o'zgaradi */
  }
  applyLang(code);
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): LangCode {
  return "uz";
}

export function useLang() {
  const lang = useSyncExternalStore(subscribe, readLang, getServerSnapshot);
  return { lang, setLang, info: langInfo(lang) };
}

export function syncLangAttribute() {
  applyLang(readLang());
}
