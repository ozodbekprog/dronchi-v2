export const COURSE_IMAGES: Record<string, string> = {
  "dron-boshqaruvi": "/images/course-drone.webp",
  "fpv-asoslari": "/images/course-people.webp",
  "xavfsiz-parvoz": "/images/step-4.webp",
  "kamera-sozlamalari": "/images/fpv-video.webp",
  "texnik-xizmat": "/images/product-3.webp",
  "parvoz-rejalashtirish": "/images/map-hero.webp",
  "dron-dasturlash": "/images/about.webp",
  "drone-racing": "/images/event.webp",
  "drone-mapping": "/images/map-b.webp",
};

export const COURSE_PROGRESS: Record<
  string,
  { done: number; total: number; percent: number; enrolled?: boolean }
> = {
  "dron-boshqaruvi": { done: 3, total: 5, percent: 60, enrolled: true },
  "fpv-asoslari": { done: 3, total: 5, percent: 60, enrolled: true },
  "xavfsiz-parvoz": { done: 2, total: 4, percent: 50, enrolled: true },
  "kamera-sozlamalari": { done: 4, total: 4, percent: 100, enrolled: true },
};

export type PathLesson = {
  title: string;
  text: string;
  minutes: number;
  xp: number;
  state: "done" | "current" | "locked";
};

function genericLessons(titles: string[]): PathLesson[] {
  return titles.map((title, index) => ({
    title,
    text: `${title} bo'yicha asosiy tushuncha va amaliy ko'rsatma.`,
    minutes: [8, 12, 10, 14, 18][index] ?? 10,
    xp: [20, 30, 25, 40, 60][index] ?? 25,
    state: index < 3 ? "done" : index === 3 ? "current" : "locked",
  }));
}

function genericCourse(
  slug: string,
  title: string,
  category: string,
  level: string,
  duration: string,
  titles: string[]
) {
  return { slug, title, category, level, duration, lessons: genericLessons(titles) };
}

export const PATH_COURSES: {
  slug: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  lessons: PathLesson[];
}[] = [
  {
    slug: "fpv-asoslari",
    title: "FPV asoslari",
    category: "Racing",
    level: "Boshlang'ich",
    duration: "6 soat",
    lessons: [
      { title: "Pult bilan tanishish", text: "Tugmalar, rejimlar va xavfsiz sozlash.", minutes: 8, xp: 20, state: "done" },
      { title: "Birinchi ko'tarilish", text: "Hover, balandlik va yumshoq qo'nish.", minutes: 12, xp: 30, state: "done" },
      { title: "Xavfsizlik qoidalari", text: "Parvozoldi tekshiruvi va cheklovlar.", minutes: 10, xp: 20, state: "done" },
      { title: "Marshrut va balandlik", text: "Trassa o'qish va masofa hissi.", minutes: 12, xp: 40, state: "current" },
      { title: "Yakuniy amaliy parvoz", text: "To'liq marshrutni mustaqil uchish.", minutes: 20, xp: 60, state: "locked" },
    ],
  },
  {
    slug: "dron-boshqaruvi",
    title: "Dron boshqaruvi",
    category: "Muhandislik",
    level: "Boshlang'ich",
    duration: "4 soat",
    lessons: [
      { title: "Dron tuzilishi", text: "Ramka, motor va propellers bilan tanishish.", minutes: 9, xp: 20, state: "done" },
      { title: "Pult sozlamalari", text: "Kanallar, trim va rejimlarni sozlash.", minutes: 11, xp: 25, state: "done" },
      { title: "Birinchi parvoz", text: "Ochiq maydonda xavfsiz ko'tarilish.", minutes: 14, xp: 30, state: "done" },
      { title: "Aniq boshqaruv", text: "Sekin harakat va pozitsiyani ushlash.", minutes: 12, xp: 35, state: "current" },
      { title: "Nazorat mashqi", text: "To'siqlar orasidan barqaror parvoz.", minutes: 18, xp: 50, state: "locked" },
    ],
  },
  {
    slug: "drone-racing",
    title: "Drone Racing",
    category: "Sport",
    level: "O'rta",
    duration: "6 soat",
    lessons: [
      { title: "Trassa bilan tanishish", text: "Start, darvozalar va finish nuqtalari.", minutes: 10, xp: 20, state: "done" },
      { title: "Tezlikni boshqarish", text: "Gaz va tormoz balansi.", minutes: 13, xp: 30, state: "done" },
      { title: "Burilish texnikasi", text: "Trek bo'ylab optimal traektoriya.", minutes: 15, xp: 35, state: "done" },
      { title: "To'siqlardan o'tish", text: "Darvozalarni aniq va tez bosib o'tish.", minutes: 16, xp: 45, state: "current" },
      { title: "Musobaqa simulyatsiyasi", text: "Vaqtga qarshi to'liq trassa.", minutes: 22, xp: 70, state: "locked" },
    ],
  },
  {
    slug: "drone-mapping",
    title: "Drone Mapping",
    category: "Aerial",
    level: "Yuqori",
    duration: "5 soat",
    lessons: [
      { title: "Parvoz rejasi", text: "Hudud, balandlik va qamrovni belgilash.", minutes: 12, xp: 25, state: "done" },
      { title: "Kamera sozlamalari", text: "Overlap, ISO va fokus.", minutes: 10, xp: 25, state: "done" },
      { title: "Marshrut bo'ylab suratga olish", text: "Avtomatik missiya va nazorat.", minutes: 18, xp: 40, state: "done" },
      { title: "Ma'lumotlarni yig'ish", text: "Fayllar, geoteglar va zaxira nusxa.", minutes: 14, xp: 35, state: "current" },
      { title: "Xarita va 3D model", text: "Natijani qayta ishlash va eksport.", minutes: 20, xp: 55, state: "locked" },
    ],
  },
  genericCourse("xavfsiz-parvoz", "Xavfsiz parvoz", "Boshlash uchun", "Boshlang'ich", "3 soat", [
    "Parvozoldi tekshiruvi",
    "Batareya va quvvat",
    "Atrof-muhit xavfsizligi",
    "Favqulodda holatlar",
    "Yakuniy xavfsiz parvoz",
  ]),
  genericCourse("kamera-sozlamalari", "Kamera sozlamalari", "Texnologiyalar", "O'rta", "4 soat", [
    "Kamera rejimlari",
    "Ekspozitsiya va ISO",
    "Kadr va kompozitsiya",
    "Video sozlamalari",
    "Amaliy suratga olish",
  ]),
  genericCourse("texnik-xizmat", "Texnik xizmat ko'rsatish", "Texnologiyalar", "O'rta", "3 soat", [
    "Dron qismlari",
    "Tozalash va parvarish",
    "Motor va propeller",
    "Batareya xizmati",
    "Diagnostika va ta'mirlash",
  ]),
  genericCourse("parvoz-rejalashtirish", "Parvoz rejalashtirish", "Texnologiyalar", "O'rta", "5 soat", [
    "Hududni o'rganish",
    "Marshrut tuzish",
    "Balandlik va vaqt",
    "Ruxsat va cheklovlar",
    "Rejani amalda sinash",
  ]),
  genericCourse("dron-dasturlash", "Dron dasturlash asoslari", "Texnologiyalar", "Yuqori", "7 soat", [
    "Avtopilot asoslari",
    "Missiya skriptlari",
    "GPS va sensorlar",
    "Avtomatik marshrut",
    "Test va xavfsizlik",
  ]),

];

export const EVENTS = [
  {
    id: "uav-trening",
    date: "12-noyabr, 2026",
    time: "10:00–13:00",
    type: "Trening",
    title: "Yangi ishtirokchilar uchun UAV trening",
    text: "Parvozoldi tayyorgarligi, xavfsiz boshqaruv va poligonda amaliy uchish.",
    place: "Ko'ksoy o'quv maydoni",
    seats: "8 / 12 joy",
    image: "/images/event.webp",
  },
  {
    id: "drone-racing-cup",
    date: "16-noyabr, 2026",
    time: "14:00–18:00",
    type: "Musobaqa",
    title: "DRONCHI Racing Cup — ochiq trassa",
    text: "Boshlang'ich va o'rta daraja uchuvchilari uchun vaqtga qarshi musobaqa.",
    place: "Ufq FPV maydoni",
    seats: "14 / 20 joy",
    image: "/images/news-hero.webp",
  },
  {
    id: "mapping-workshop",
    date: "21-noyabr, 2026",
    time: "09:00–12:00",
    type: "Workshop",
    title: "Drone Mapping: xarita va 3D model",
    text: "Parvoz ma'lumotlarini yig'ish va natijani qayta ishlash bo'yicha amaliy dars.",
    place: "DRONCHI lab",
    seats: "6 / 10 joy",
    image: "/images/news-2.webp",
  },
  {
    id: "safety-day",
    date: "28-noyabr, 2026",
    time: "11:00–13:00",
    type: "Seminar",
    title: "Xavfsiz parvoz kuni",
    text: "Shamol, cheklovlar va favqulodda holatlarda to'g'ri qaror qabul qilish.",
    place: "Onlayn + poligon",
    seats: "18 / 30 joy",
    image: "/images/step-4.webp",
  },
];

export const RATING = [
  { name: "Malika Yusupova", xp: 1420, level: 7, streak: 21, initials: "MY" },
  { name: "Bekzod Tursunov", xp: 1310, level: 6, streak: 16, initials: "BT" },
  { name: "Dilnoza Rahimova", xp: 1250, level: 6, streak: 14, initials: "DR" },
  { name: "Sardor Aliyev", xp: 980, level: 5, streak: 11, initials: "SA" },
  { name: "Javohir Qodirov", xp: 860, level: 4, streak: 9, initials: "JQ" },
  { name: "Nigora Salimova", xp: 740, level: 4, streak: 8, initials: "NS" },
  { name: "Aziz Karimov", xp: 160, level: 2, streak: 6, initials: "AK", you: true },
  { name: "Rustam Ergashev", xp: 140, level: 2, streak: 4, initials: "RE" },
];

export const CERTIFICATES = [
  {
    id: "fpv-2026-0142",
    title: "FPV asoslari",
    code: "DRN-FPV-2026-0142",
    date: "2-noyabr, 2026",
    status: "earned" as const,
    hours: "6 soat · 18 dars",
  },
  {
    id: "racing-2026-0088",
    title: "Drone Racing",
    code: "DRN-RAC-2026-0088",
    date: "—",
    status: "progress" as const,
    hours: "3 / 5 dars yakunlandi",
  },
];

export const ZONE_BOOKING_SLOTS = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00"];
