const CYR: Record<string, string> = {
  a: "а", b: "б", c: "к", d: "д", e: "е", f: "ф", g: "г", h: "ҳ", i: "и",
  j: "ж", k: "к", l: "л", m: "м", n: "н", o: "о", p: "п", q: "қ", r: "р",
  s: "с", t: "т", u: "у", v: "в", w: "в", x: "х", y: "й", z: "з",
};

function convertWord(word: string) {
  const lower = word.toLowerCase();
  const upper = word[0] === word[0]?.toUpperCase() && /[A-Z]/.test(word[0] ?? "");
  const allCaps = /^[A-Z]+$/.test(word);
  let out = "";
  let i = 0;

  const push = (value: string) => {
    if (out === "" && upper && value) {
      out += value[0].toUpperCase() + value.slice(1);
    } else {
      out += value;
    }
  };

  while (i < lower.length) {
    const two = lower.slice(i, i + 2);
    const three = lower.slice(i, i + 3);

    if (three === "yo‘" || three === "yo'") {
      push("йў");
      i += 3;
      continue;
    }
    if (two === "o‘" || two === "o'") {
      push("ў");
      i += 2;
      continue;
    }
    if (two === "g‘" || two === "g'") {
      push("ғ");
      i += 2;
      continue;
    }
    if (two === "sh") {
      push("ш");
      i += 2;
      continue;
    }
    if (two === "ch") {
      push("ч");
      i += 2;
      continue;
    }
    if (two === "ng") {
      push("нг");
      i += 2;
      continue;
    }
    if (two === "ya") {
      push("я");
      i += 2;
      continue;
    }
    if (two === "yu") {
      push("ю");
      i += 2;
      continue;
    }
    if (two === "yo") {
      push("ё");
      i += 2;
      continue;
    }
    if (two === "ye") {
      push("е");
      i += 2;
      continue;
    }
    if (two === "ts") {
      push("ц");
      i += 2;
      continue;
    }
    if (two === "e‘" || two === "e'") {
      push("эъ");
      i += 2;
      continue;
    }
    if (lower[i] === "‘" || lower[i] === "'" || lower[i] === "’") {
      push("ъ");
      i += 1;
      continue;
    }

    const char = lower[i] ?? "";
    if (i === 0 && char === "e") {
      push("э");
      i += 1;
      continue;
    }
    push(CYR[char] ?? char);
    i += 1;
  }

  return allCaps ? out.toUpperCase() : out;
}

export function toCyrillic(text: string) {
  return text.replace(/[A-Za-zÀ-ÿ‘’']+/g, (word) => convertWord(word));
}

const LAT: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", ғ: "g'", д: "d", е: "e", ё: "yo", ж: "j",
  з: "z", и: "i", й: "y", к: "k", қ: "q", л: "l", м: "m", н: "n", ҳ: "h",
  о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ў: "o'", ф: "f", х: "x",
  ц: "ts", ч: "ch", ш: "sh", ъ: "'", ь: "", э: "e", ю: "yu", я: "ya",
  ө: "o'", ү: "u",
};

export function toLatin(text: string) {
  return text.replace(/[А-Яа-яЁёЎўҚқҒғҲҳЪъЬьЭэЮюЯяӨөҮү]/g, (char) => {
    const lower = char.toLowerCase();
    const mapped = LAT[lower] ?? char;
    return char === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1);
  });
}

function swap(text: string, pattern: RegExp, lower: string, upper: string) {
  return text.replace(pattern, (match) =>
    match[0] === match[0].toUpperCase() ? upper : lower
  );
}

export function toOldLatin(text: string) {
  let out = text;
  out = swap(out, /o[‘'’]/g, "ö", "Ö");
  out = swap(out, /g[‘'’]/g, "ğ", "Ğ");
  out = swap(out, /sh/g, "ş", "Ş");
  out = swap(out, /ch/g, "ç", "Ç");
  out = swap(out, /ng/g, "ñ", "Ñ");
  out = out.replace(/[‘'’]/g, "ʼ");
  return out;
}
