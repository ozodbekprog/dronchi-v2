export type Course = {
  slug: string;
  title: string;
  description: string;
  image: string;
  level: string;
  duration: string;
  lessons: string;
  highlight?: boolean;
  tag?: string;
  category: "Boshlash uchun" | "Texnologiyalar";
};

export const courses: Course[] = [
  {
    slug: "dron-boshqaruvi",
    category: "Boshlash uchun",
    title: "Dron boshqaruvi",
    description: "Pult bilan tanishish va boshqaruv asoslarini o'rganing.",
    image: "/images/course-drone.webp",
    level: "Boshlang'ich",
    duration: "4 soat",
    lessons: "12 dars",
    tag: "Boshlash uchun",
  },
  {
    slug: "fpv-asoslari",
    category: "Boshlash uchun",
    title: "FPV asoslari",
    description: "Parvozni yangi nigoh bilan ko'ring. FPV tizimlari va boshqaruv usullari.",
    image: "/images/course-people.webp",
    level: "Boshlang'ich",
    duration: "6 soat",
    lessons: "18 dars",
    highlight: true,
    tag: "Tavsiya etamiz",
  },
  {
    slug: "xavfsiz-parvoz",
    category: "Boshlash uchun",
    title: "Xavfsiz parvoz",
    description: "Parvozoldi tekshiruvi va xavfsizlik qoidalarini o'rganing.",
    image: "/images/course-safe.webp",
    level: "Boshlang'ich",
    duration: "3 soat",
    lessons: "9 dars",
    tag: "Boshlash uchun",
  },
  {
    slug: "kamera-sozlamalari",
    category: "Texnologiyalar",
    title: "Kamera sozlamalari",
    description: "Dron kamerasi bilan suratga olish va video yozishni o'rganing.",
    image: "/images/course-camera.webp",
    level: "O'rta",
    duration: "4 soat",
    lessons: "11 dars",
    tag: "Texnologiyalar",
  },
  {
    slug: "texnik-xizmat",
    category: "Texnologiyalar",
    title: "Texnik xizmat ko'rsatish",
    description: "Droningizni to'g'ri texnik xizmat qilish va parvarishlash bo'yicha ko'rsatmalar.",
    image: "/images/course-maintenance.webp",
    level: "O'rta",
    duration: "3 soat",
    lessons: "8 dars",
    tag: "Texnologiyalar",
  },
  {
    slug: "parvoz-rejalashtirish",
    category: "Texnologiyalar",
    title: "Parvoz rejalashtirish",
    description: "Ma'lumotlarni yig'ish va samarali parvoz marshrutini tuzishni o'rganing.",
    image: "/images/course-planning.webp",
    level: "O'rta",
    duration: "5 soat",
    lessons: "14 dars",
    tag: "Texnologiyalar",
  },
  {
    slug: "dron-dasturlash",
    category: "Texnologiyalar",
    title: "Dron dasturlash asoslari",
    description: "Dronni avtomatik rejimda boshqarish uchun dasturlash asoslarini egallang.",
    image: "/images/course-coding.webp",
    level: "Yuqori",
    duration: "7 soat",
    lessons: "16 dars",
    tag: "Texnologiyalar",
  },
  {
    slug: "drone-racing",
    category: "Texnologiyalar",
    title: "Drone racing",
    description: "Tezkor parvoz, to'siqlardan o'tish va musobaqa tayyorgarligi.",
    image: "/images/course-racing.webp",
    level: "O'rta",
    duration: "6 soat",
    lessons: "15 dars",
    tag: "Yangi",
  },
  {
    slug: "drone-mapping",
    category: "Texnologiyalar",
    title: "Drone Mapping",
    description: "Xarita va 3D modellarni yaratish uchun parvoz ma'lumotlarini yig'ish.",
    image: "/images/course-mapping.webp",
    level: "Yuqori",
    duration: "5 soat",
    lessons: "13 dars",
    tag: "Yangi",
  },
];

export type Step = {
  n: string;
  title: string;
  text: string;
  image: string;
  highlight?: boolean;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Ro'yxatdan o'ting",
    text: "Shaxsiy profilingizni yarating va o'quv platformasiga kiring.",
    image: "/images/step-1.webp",
  },
  {
    n: "02",
    title: "Kursni tanlang",
    text: "O'zingizga mos yo'nalishni toping va o'rganishni boshlang.",
    image: "/images/step-2.webp",
    highlight: true,
  },
  {
    n: "03",
    title: "Bilim oling",
    text: "Darslar va amaliy topshiriqlar orqali ko'nikmalaringizni rivojlantiring.",
    image: "/images/step-3.webp",
  },
  {
    n: "04",
    title: "Amaliyotga o'ting",
    text: "O'rganganlaringizni poligonlarda amalda sinab ko'ring.",
    image: "/images/step-4.webp",
  },
];

export type Product = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  price: string;
  image: string;
  highlight?: boolean;
};

export const products: Product[] = [
  {
    id: "fpv-kit",
    kicker: "FPV kit",
    title: "FPV Quadcopter Kit",
    description: "Ochiq ramkali FPV kvadrokopter uchun asosiy komponentlar to'plami.",
    price: "2 450 000",
    image: "/images/product-1.webp",
  },
  {
    id: "controller-kit",
    kicker: "Kit + pult",
    title: "Drone + Controller Kit",
    description: "Ekranli pult bilan to'plam — boshqaruvni osonlashtiruvchi komplekt.",
    price: "3 980 000",
    image: "/images/product-2.webp",
    highlight: true,
  },
  {
    id: "parts-kit",
    kicker: "Qismlar",
    title: "Drone Parts Kit",
    description: "Motor, ramka, batareya va kamera uchun zarur qismlar to'plami.",
    price: "1 890 000",
    image: "/images/product-3.webp",
  },
];

export const opportunities = [
  {
    n: "01",
    title: "Interaktiv ta'lim",
    text: "Mavzularni tushunarli darslar va amaliy mashg'ulotlar orqali o'rganing.",
  },
  {
    n: "02",
    title: "Amaliy mashg'ulotlar",
    text: "Poligonlarda haqiqiy parvoz ko'nikmalarini mustahkamlang.",
  },
  {
    n: "03",
    title: "Rivojlanish yo'li",
    text: "O'quv jarayonidagi natijalaringizni kuzatib boring.",
  },
  {
    n: "04",
    title: "Hamkorlik va tarmoq",
    text: "Boshqalar bilan fikr almashish va birgalikda o'sish imkoniyatlarini yarating.",
  },
];

export type Faq = { q: string; a: string; open?: boolean };

export const homeFaqs: Faq[] = [
  {
    q: "DRONCHI nima?",
    a: "DRONCHI — dronlarni boshqarishni o'rganish uchun onlayn platforma. Kurslar, amaliy topshiriqlar, poligonlar va sertifikat bir joyda.",
  },
  {
    q: "Dron boshqarishni bilmasam ham boshlashim mumkinmi?",
    a: "Ha. Boshlang'ich darajadagi darslar asosiy tushunchalardan boshlashga yordam beradi.",
    open: true,
  },
  {
    q: "Kurslarni qanday boshlayman?",
    a: "Ro'yxatdan o'ting, Tariflar sahifasida mos tarifni tanlang va to'lovni tasdiqlang. Kurslar shaxsiy kabinetdagi \"Mening kurslarim\" bo'limida paydo bo'ladi.",
  },
  {
    q: "O'quv jarayonimni qayerdan kuzataman?",
    a: "Shaxsiy kabinetda kurslar progressi, tugatilgan darslar va sertifikatlar ko'rinadi. Dashboard keyingi bosqichda platformaga ulanadi.",
  },
  {
    q: "Poligonlarda qanday mashq qilaman?",
    a: "Poligonlar sahifasida maydonni, sanani va boshlanish vaqtini tanlab bron qilasiz. Maydon soatbay ijaraga beriladi; dron va instruktor xizmati alohida kelishiladi.",
  },
];

export const fpvFaqs: Faq[] = [
  {
    q: "FPV kursini tajribasiz boshlashim mumkinmi?",
    a: "Ha. FPV asoslari — boshlang'ich darajadagi kurs. Texnologiyaga kirishdan boshlab jihozlar, kamera, boshqaruv va xavfsizlikni bosqichma-bosqich o'rganasiz.",
    open: true,
  },
  {
    q: "Kurs qancha davom etadi?",
    a: "Kurs 6 soatlik videodan iborat: 8 mavzu va 18 dars. O'z sur'atingizda o'tishingiz mumkin.",
  },
  {
    q: "O'rganish uchun dron kerakmi?",
    a: "Kursni nazariy jihatdan dronisiz ham o'tish mumkin. Amaliy mashg'ulotlar uchun poligonlarda dron ijarasi mavjud.",
  },
  {
    q: "Darslarni o'z sur'atimda o'tsam bo'ladimi?",
    a: "Ha, barcha darslar onlayn va yozib olingan. Kursga 6 oy davomida kirish huquqingiz bor.",
  },
  {
    q: "Kurs yakunida sertifikat beriladimi?",
    a: "Ha. Barcha darslarni tugatganingizdan so'ng kurs sertifikati beriladi.",
  },
];

export const tariffFaqs: Faq[] = [
  {
    q: "To'lovni qanday amalga oshiraman?",
    a: "Tarifni tanlang va hisobingizga kiring. Xarid bosqichida mavjud to'lov usullari, yakuniy summa va shartlar ko'rsatiladi.",
    open: true,
  },
  {
    q: "To'lovdan keyin kursni qayerdan topaman?",
    a: "To'lov tasdiqlangach, \"Shaxsiy kabinet\" → \"Mening kurslarim\" bo'limida kurs ochiladi.",
  },
  {
    q: "Darslarni o'z vaqtimda ko'ra olamanmi?",
    a: "Ha. FPV asoslari onlayn, mustaqil o'rganish formatida: 18 dars, jami 6 soat. Kursga kirish muddati tanlangan tarif shartlarida ko'rsatiladi.",
  },
  {
    q: "To'lov o'tdi, lekin kurs ochilmadi. Nima qilaman?",
    a: "To'lov holati va hisobingizni tekshiring. Muammo qolsa, chek yoki buyurtma ma'lumotlari bilan yordam xizmatiga murojaat qiling.",
  },
];

export const polygonFaqs: Faq[] = [
  {
    q: "Ob-havo yomonlashsa, bronim nima bo'ladi?",
    a: "Kuchli shamol yoki yomg'ir sabab maydon yopilsa, mashg'ulotni boshqa bo'sh vaqtga ko'chirish mumkin. Parvozdan oldin maydon holatini yordam jamoasi bilan aniqlashtiring.",
    open: true,
  },
  {
    q: "Bronni bekor qilish yoki vaqtini o'zgartirish mumkinmi?",
    a: "Ha, mashg'ulot boshlanishidan kamida 12 soat oldin bekor qilish yoki vaqtni o'zgartirish mumkin.",
  },
  {
    q: "Instruktor va dron ijarasi narxga kiradimi?",
    a: "Maydon ijarasi narxi faqat hududdan foydalanishni o'z ichiga oladi. Dron va instruktor xizmati alohida kelishiladi.",
  },
  {
    q: "Bir bron bilan nechta ishtirokchi kelishi mumkin?",
    a: "Bitta bron bitta uchuvchi uchun. Qo'shimcha ishtirokchilar uchun alohida bron yoki kelishuv kerak.",
  },
];

export const dates = [
  { weekday: "Du", day: "2", label: "2-noyabr, 2026" },
  { weekday: "Se", day: "3", label: "3-noyabr, 2026" },
  { weekday: "Ch", day: "4", label: "4-noyabr, 2026" },
  { weekday: "Pa", day: "5", label: "5-noyabr, 2026" },
  { weekday: "Ju", day: "6", label: "6-noyabr, 2026" },
  { weekday: "Sh", day: "7", label: "7-noyabr, 2026" },
  { weekday: "Ya", day: "8", label: "8-noyabr, 2026" },
];

export const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export const busySlots = ["14:00", "15:00"];

export type Polygon = {
  id: "a" | "b" | "c";
  letter: string;
  name: string;
  type: string;
  location: string;
  size: string;
  hours: string;
  price: number;
  image: string;
  filter: string;
};

export const polygons: Polygon[] = [
  {
    id: "a",
    letter: "A",
    name: "Ko'ksoy o'quv maydoni",
    type: "Boshlang'ich mashqlar",
    location: "Toshkent atrofi · shimoliy hudud",
    size: "60 × 80 m",
    hours: "08:00–19:00",
    price: 120000,
    image: "/images/map-a.webp",
    filter: "Boshlang'ich",
  },
  {
    id: "b",
    letter: "B",
    name: "Ufq FPV maydoni",
    type: "FPV va to'siqlar",
    location: "Toshkent atrofi · sharqiy hudud",
    size: "80 × 100 m",
    hours: "08:00–19:00",
    price: 150000,
    image: "/images/map-b.webp",
    filter: "FPV",
  },
  {
    id: "c",
    letter: "C",
    name: "Kenglik parvoz maydoni",
    type: "Erkin parvoz",
    location: "Toshkent atrofi · janubiy hudud",
    size: "100 × 120 m",
    hours: "08:00–19:00",
    price: 180000,
    image: "/images/map-c.webp",
    filter: "Erkin parvoz",
  },
];

export const bookings = [
  {
    polygon: "Ko'ksoy o'quv maydoni",
    letter: "A",
    code: "Bron № VP-1042",
    iso: "2026-11-05T10:00:00",
    date: "5-noyabr, 2026",
    time: "10:00–12:00",
    duration: "2 soat",
    total: "240 000 so'm",
    state: "Tasdiqlangan",
    stateType: "ok",
  },
  {
    polygon: "Ufq FPV maydoni",
    letter: "B",
    code: "Bron № VP-0981",
    iso: "2026-10-28T09:00:00",
    date: "28-oktabr, 2026",
    time: "09:00–10:00",
    duration: "1 soat",
    total: "150 000 so'm",
    state: "Yakunlangan",
    stateType: "done",
  },
  {
    polygon: "Kenglik parvoz maydoni",
    letter: "C",
    code: "Bron № VP-1025",
    iso: "2026-11-06T15:00:00",
    date: "6-noyabr, 2026",
    time: "15:00–16:00",
    duration: "1 soat",
    total: "180 000 so'm",
    state: "Bekor qilingan",
    stateType: "cancel",
  },
];

export type Tariff = {
  id: string;
  name: string;
  badge: string;
  sub: string;
  price: string;
  highlight?: boolean;
  features: string[];
};

export const tariffs: Tariff[] = [
  {
    id: "mustaqil",
    name: "Mustaqil",
    badge: "Birinchi qadam",
    sub: "O'z sur'atingizda o'rganish uchun asosiy kurs.",
    price: "490 000",
    features: [
      "18 dars · 6 soat",
      "Onlayn, o'z sur'atingizda",
      "Kurs yakunida sertifikat",
      "Kursga 6 oy kirish",
      "Mustaqil o'rganish formati",
      "Texnik yordam",
    ],
  },
  {
    id: "qollab-quvvatlash",
    name: "Qo'llab-quvvatlash",
    badge: "Tavsiya etamiz",
    sub: "Mustaqil ta'lim va savollaringizga yo'l-yo'riq.",
    price: "790 000",
    highlight: true,
    features: [
      "18 dars · 6 soat",
      "Onlayn, o'z sur'atingizda",
      "Kurs yakunida sertifikat",
      "Kursga 6 oy kirish",
      "Yuklab olinadigan konspekt",
      "2 ta guruh savol-javob sessiyasi",
    ],
  },
  {
    id: "mentor",
    name: "Mentor bilan",
    badge: "Shaxsiy yondashuv",
    sub: "Individual yondashuv bilan ishonchli boshlang.",
    price: "1 190 000",
    features: [
      "18 dars · 6 soat",
      "Onlayn, o'z sur'atingizda",
      "Kurs yakunida sertifikat",
      "Kursga 6 oy kirish",
      "Konspekt va 2 ta guruh sessiyasi",
      "2 × 45 daqiqa mentor bilan",
    ],
  },
];

export const fpvModules = [
  {
    n: "01",
    title: "FPV texnologiyasiga kirish",
    meta: "2 dars · 28 daqiqa",
    body: "FPV nima ekanligi, oddiy vizual parvozdan farqi va texnologiyaning amaliyotdagi imkoniyatlari bilan tanishasiz.",
  },
  {
    n: "02",
    title: "FPV jihozlari va ularning vazifasi",
    meta: "2 dars · 32 daqiqa",
    body: "Kamera, transmitter, qabul qiluvchi, ko'zoynak va pult — har bir qismning vazifasini bosqichma-bosqich ko'rib chiqasiz.",
  },
  {
    n: "03",
    title: "FPV kameralar turlari va sozlamalari",
    meta: "3 dars · 30 daqiqa",
    body: "FPV kameralarining analog va raqamli turlari, ularning farqlari va qo'llanish sohalari bilan tanishing. Sifatli tasvir olish uchun kamera burchagi, yorqinlik, kontrast va boshqa muhim sozlamalarni parvoz sharoitiga moslashni o'rganing.",
    open: true,
  },
  {
    n: "04",
    title: "Transmitter tizimlari va signallar",
    meta: "2 dars · 35 daqiqa",
    body: "Signal uzatish tizimlari, chastotalar, antennalar va barqaror aloqa uchun amaliy tavsiyalar.",
  },
  {
    n: "05",
    title: "Batareyalar va quvvat boshqaruvi",
    meta: "2 dars · 27 daqiqa",
    body: "LiPo batareyalar bilan xavfsiz ishlash, quvvat sarfini hisoblash va parvoz vaqtini rejalashtirish.",
  },
  {
    n: "06",
    title: "FPV dronlarni boshqarish asoslari",
    meta: "3 dars · 40 daqiqa",
    body: "Akro va yordamchi rejimlar, pult harakatlari va barqaror parvoz uchun asosiy boshqaruv ko'nikmalari.",
  },
  {
    n: "07",
    title: "FPV dronlar uchun xavfsizlik qoidalari",
    meta: "2 dars · 25 daqiqa",
    body: "Parvozoldi tekshiruvi, xavfsiz hudud tanlash, odamlar ustidan parvoz qilmaslik va favqulodda holatlar.",
  },
  {
    n: "08",
    title: "FPV parvozlarni rejalashtirish va amaliy mashg'ulotlar",
    meta: "2 dars · 38 daqiqa",
    body: "Marshrut tuzish, ob-havoni baholash va o'rganganlarini amaliy mashg'ulotda mustahkamlash.",
  },
];

export const fpvOutcomes = [
  "FPV texnologiyasi va uning afzalliklari",
  "Jihozlar va ularning konfiguratsiyasi",
  "Kamera va transmitterlar",
  "Dronni boshqarish usullari",
  "Amaliy uchish mashg'ulotlari",
];

export type NewsItem = {
  id: string;
  type: string;
  date: string;
  dateUz: string;
  title: string;
  excerpt: string;
  image: string;
  read: string;
  tags?: string[];
  body?: string[];
};

export const news: NewsItem[] = [
  {
    id: "kurslar-ochildi",
    type: "News",
    date: "22 SEP, 2026",
    dateUz: "22-sentabr, 2026",
    title: "Drone racing, loyihalash va soccer kurslari ochildi",
    excerpt:
      "Kurs davomida nafaqat dronni yig'ish, balki uni uchirish va dronlardan to'g'ri foydalanish madaniyati o'rgatiladi.",
    image: "/images/news-hero.webp",
    read: "4 daqiqa",
    tags: ["Ta'lim", "DroneRacing", "Loyihalash", "DroneSoccer"],
  },
  {
    id: "uav-trening",
    type: "Event",
    date: "20 SEP, 2026",
    dateUz: "20-sentabr, 2026",
    title: "Toshkentda yangi ishtirokchilar uchun UAV trening dasturi",
    excerpt: "Toshkentda UAV bo'yicha amaliy trening dasturi boshlandi.",
    image: "/images/news-1.webp",
    read: "3 daqiqa",
    body: [
      "Toshkentda yangi ishtirokchilar uchun UAV bo'yicha amaliy trening dasturi boshlandi. Dastur dronlarni tanlash, parvozoldi tayyorgarligi va xavfsiz boshqaruv asoslarini qamrab oladi.",
      "Trening davomida ishtirokchilar haqiqiy pult bilan ishlash, parvoz marshrutini rejalashtirish va poligonda amaliy uchish ko'nikmalarini mashq qiladi. Mashg'ulotlar kichik guruhlarda olib boriladi.",
    ],
  },
  {
    id: "drone-mapping",
    type: "Update",
    date: "19 SEP, 2026",
    dateUz: "19-sentabr, 2026",
    title: "Yangi kurs: Drone Mapping endi platformada",
    excerpt: "Xarita va 3D modellarni yaratish bo'yicha yangi kurs platformaga qo'shildi.",
    image: "/images/news-2.webp",
    read: "2 daqiqa",
    body: [
      "Platformada Drone Mapping yo'nalishi ochildi. Kurs dron yordamida aerofotosurat olish, xarita va 3D modellarni yaratish jarayonini bosqichma-bosqich tushuntiradi.",
      "Darslar parvoz rejasini tuzishdan olingan ma'lumotlarni qayta ishlashgacha bo'lgan to'liq zanjirni qamrab oladi. Yo'nalish texnologiya va geoma'lumotlar bilan ishlashni istaganlar uchun mo'ljallangan.",
    ],
  },
];

export const articleBody = [
  "DRONCHI akademiyasida uchta yangi yo'nalish — Drone racing, dronlarni loyihalash va Drone soccer kurslari ochildi. Dasturlar texnologiyaga qiziqqan ishtirokchilarga nazariy bilimni amaliy tajriba bilan birlashtirish imkonini beradi.",
  "Drone racing yo'nalishida pultni aniq boshqarish, poligonlarda amaliy mashq qilish va trassada to'siqlardan o'tish o'rganiladi. Mashg'ulotlar oddiy harakatlardan boshlanib, bosqichma-bosqich murakkab parvoz vazifalariga o'tadi.",
  "Loyihalash kursida ishtirokchilar dron tuzilishi, asosiy qismlarni tanlash, yig'ish va parvozga tayyorlash bilan tanishadi. Drone soccer esa himoya karkasidagi dronlar yordamida jamoaviy o'yin, muvofiqlashtiruv va boshqaruv ko'nikmalarini rivojlantiradi.",
];
