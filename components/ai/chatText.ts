export type ChatText = {
  assistantTitle: string;
  online: string;
  placeholder: string;
  clear: string;
  stop: string;
  send: string;
  introTitle: string;
  introText: string;
  suggestions: string[];
};

const UZ: ChatText = {
  assistantTitle: "Fariza",
  online: "Onlayn",
  placeholder: "Savolingizni yozing...",
  clear: "Tozalash",
  stop: "To'xtatish",
  send: "Yuborish",
  introTitle: "Salom, men Fariza — DRONCHI yordamchisiman",
  introText:
    "Dron, FPV, xavfsizlik yoki kurslar bo'yicha savol bering. 5 tilda qisqa va amaliy javob beraman.",
  suggestions: [
    "FPV dronni birinchi marta qanday uchirish kerak?",
    "Xavfsiz parvoz uchun 3 ta qoida ayt",
    "Menga qaysi kurs mos keladi?",
    "Drone Racing uchun qanday mashqlar bor?",
  ],
};

const RU: ChatText = {
  assistantTitle: "Фариза",
  online: "Онлайн",
  placeholder: "Введите вопрос...",
  clear: "Очистить",
  stop: "Остановить",
  send: "Отправить",
  introTitle: "Привет, я Фариза — помощник DRONCHI",
  introText:
    "Задайте вопрос о дронах, FPV, безопасности или курсах. Отвечу кратко и по делу.",
  suggestions: [
    "Как впервые запустить FPV-дрон?",
    "Назови 3 правила безопасного полёта",
    "Какой курс мне подойдёт?",
    "Какие упражнения есть для Drone Racing?",
  ],
};

const CYRL: ChatText = {
  assistantTitle: "Фариза",
  online: "Онлайн",
  placeholder: "Саволингизни ёзинг...",
  clear: "Тозалаш",
  stop: "Тўхтатиш",
  send: "Юбориш",
  introTitle: "Салом, мен Фариза — DRONCHI ёрдамчисиман",
  introText:
    "Дрон, FPV, хавфсизлик ёки курслар бўйича савол беринг. 5 тилда қисқа ва амалий жавоб бераман.",
  suggestions: [
    "FPV дронни биринчи марта қандай учириш керак?",
    "Хавфсиз парвоз учун 3 та қоида айт",
    "Менга қайси курс мос келади?",
    "Drone Racing учун қандай машқлар бор?",
  ],
};

export const CHAT_TEXT: Record<string, ChatText> = {
  uz: UZ,
  ru: RU,
  "uz-cyrl": CYRL,
  "uz-new": UZ,
  "uz-old": UZ,
};
