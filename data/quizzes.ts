import type { Localized, Question, Quiz } from "@/types";
const l = (uz: string, ru: string): Localized => ({ uz, ru });
const q = (
  uz: string,
  ru: string,
  answers: [string, string][],
  correct: number,
  eu: string,
  er: string,
): Question => ({
  question: l(uz, ru),
  answers: answers.map((a) => l(...a)),
  correct,
  explanation: l(eu, er),
});
export const quizzes: Quiz[] = [
  {
    id: "amir-temur",
    name: "Amir Temur",
    description: l(
      "Buyuk bobomizning tarixi bilan tanishamiz",
      "Познакомимся с историей великого предка",
    ),
    color: "peach",
    icon: "shield",
    questions: [
      q(
        "Amir Temur qachon tug‘ilgan?",
        "Когда родился Амир Темур?",
        [
          ["9-aprel", "9 апреля"],
          ["9-fevral", "9 февраля"],
          ["1-sentabr", "1 сентября"],
          ["21-mart", "21 марта"],
        ],
        0,
        "Amir Temur 1336-yil 9-aprelda tug‘ilgan.",
        "Амир Темур родился 9 апреля 1336 года.",
      ),
      q(
        "Amir Temurning mashhur unvoni qaysi?",
        "Какой известный титул носил Амир Темур?",
        [
          ["Shoir", "Поэт"],
          ["Sohibqiron", "Сахибкиран"],
          ["Rassom", "Художник"],
          ["Sayyoh", "Путешественник"],
        ],
        1,
        "Amir Temur Sohibqiron nomi bilan mashhur.",
        "Амир Темур известен под титулом Сахибкиран.",
      ),
      q(
        "Amir Temur qaysi sohada muhim o‘rin tutgan?",
        "В какой области Амир Темур сыграл важную роль?",
        [
          ["Faqat sportda", "Только в спорте"],
          ["Faqat musiqada", "Только в музыке"],
          ["Davlat boshqaruvida", "В управлении государством"],
          ["Faqat dehqonchilikda", "Только в земледелии"],
        ],
        2,
        "U davlat boshqaruvida muhim tarixiy shaxs bo‘lgan.",
        "Он был важной исторической фигурой в управлении государством.",
      ),
      q(
        "Amir Temur qaysi yo‘nalishlar rivojiga hissa qo‘shgan?",
        "Развитию каких областей способствовал Амир Темур?",
        [
          ["Ilm-fan va madaniyat", "Науки и культуры"],
          ["Video o‘yinlar", "Видеоигр"],
          ["Internet", "Интернета"],
          ["Telefonlar", "Телефонов"],
        ],
        0,
        "U ilm-fan va madaniyat rivojini qo‘llab-quvvatlagan.",
        "Он поддерживал развитие науки и культуры.",
      ),
      q(
        "Tarixni o‘rganish bizga nima beradi?",
        "Что даёт нам изучение истории?",
        [
          ["Faqat o‘yinchoqlar", "Только игрушки"],
          ["Hech narsa", "Ничего"],
          ["Faqat shirinliklar", "Только сладости"],
          ["O‘tmish haqida bilim", "Знания о прошлом"],
        ],
        3,
        "Tarix orqali ajdodlarimiz va o‘tmish haqida bilib olamiz.",
        "История помогает нам узнать о предках и прошлом.",
      ),
    ],
  },
  {
    id: "alisher-navoiy",
    name: "Alisher Navoiy",
    description: l(
      "She’riyat va ezgulik olamiga sayohat",
      "Путешествие в мир поэзии и доброты",
    ),
    color: "mint",
    icon: "feather",
    questions: [
      q(
        "Alisher Navoiy kim bo‘lgan?",
        "Кем был Алишер Навои?",
        [
          ["Faqat dengizchi", "Только моряком"],
          ["Shoir va mutafakkir", "Поэтом и мыслителем"],
          ["Faqat sportchi", "Только спортсменом"],
          ["Fazogir", "Космонавтом"],
        ],
        1,
        "Navoiy buyuk shoir va mutafakkir bo‘lgan.",
        "Навои был великим поэтом и мыслителем.",
      ),
      q(
        "Navoiy qaysi shaharda tug‘ilgan?",
        "В каком городе родился Навои?",
        [
          ["Hirot", "Герат"],
          ["Toshkent", "Ташкент"],
          ["Buxoro", "Бухара"],
          ["Xiva", "Хива"],
        ],
        0,
        "Alisher Navoiy Hirot shahrida tug‘ilgan.",
        "Алишер Навои родился в Герате.",
      ),
      q(
        "Navoiy tavallud kuni qachon?",
        "Когда день рождения Навои?",
        [
          ["9-aprel", "9 апреля"],
          ["21-mart", "21 марта"],
          ["9-fevral", "9 февраля"],
          ["1-iyun", "1 июня"],
        ],
        2,
        "Alisher Navoiy 1441-yil 9-fevralda tug‘ilgan.",
        "Алишер Навои родился 9 февраля 1441 года.",
      ),
      q(
        "“Xamsa” nechta dostondan iborat?",
        "Сколько поэм в «Хамсе»?",
        [
          ["Ikki", "Две"],
          ["Uch", "Три"],
          ["To‘rt", "Четыре"],
          ["Besh", "Пять"],
        ],
        3,
        "“Xamsa” beshta dostondan iborat.",
        "«Хамса» состоит из пяти поэм.",
      ),
      q(
        "Navoiy asarlarida qaysi fazilatlar ulug‘lanadi?",
        "Какие качества прославлял Навои?",
        [
          ["Dangasalik", "Лень"],
          ["Ezgulik va adolat", "Доброту и справедливость"],
          ["Xudbinlik", "Эгоизм"],
          ["Qo‘pollik", "Грубость"],
        ],
        1,
        "Uning asarlari ezgulik, adolat va bilimga chorlaydi.",
        "Его произведения призывают к доброте, справедливости и знаниям.",
      ),
    ],
  },
];
export const quizSources = {
  "amir-temur":
    "https://samarkand.uz/press/news/bugun-amir-temur-1336-1405-tavallud-topgan-kun2514",
  "alisher-navoiy": "https://gov.uz/oz/yoshlar/news/view/128016",
};
