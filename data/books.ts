import { POINT_REWARDS } from "@/data/point-rules";
import type { Book, Category, Localized } from "@/types";
const l = (uz: string, ru: string): Localized => ({ uz, ru });
export const categories: Category[] = [
  "Ertaklar",
  "Ilm-fan",
  "Tarbiya",
  "Sarguzasht",
  "Tabiat",
];
export const categoryNames: Record<Category, Localized> = {
  Ertaklar: l("Ertaklar", "Сказки"),
  "Ilm-fan": l("Ilm-fan", "Наука"),
  Tarbiya: l("Tarbiya", "Добрые поступки"),
  Sarguzasht: l("Sarguzasht", "Приключения"),
  Tabiat: l("Tabiat", "Природа"),
};
export const books: Book[] = [
  {
    id: "maymoqvoyning-xazinasi",
    title: l("Maymoqvoyning xazinasi", "Сокровище Маймоквоя"),
    category: "Ertaklar",
    age: "6–7",
    reward: 0,
    minutes: 1,
    icon: "book",
    color: "peach",
    subtitle: l(
      "Ertakni multfilmda tomosha qilamiz",
      "Смотрим сказку в мультфильме",
    ),
    pages: [],
    coverImage: "/images/cartoons/maymoqvoyning-xazinasi-1.jpg",
    cartoons: [
      {
        id: "maymoqvoy-1",
        number: 1,
        title: l("1-qism", "1-я серия"),
        source: "/videos/maymoqvoyning-xazinasi-1.mp4",
        poster: "/images/cartoons/maymoqvoyning-xazinasi-1.jpg",
        durationSeconds: 48.066,
        language: "uz",
      },
    ],
  },
  {
    id: "moon-rabbit",
    title: l("Oyga oshiq quyoncha", "Зайчонок и Луна"),
    category: "Ertaklar",
    age: "6–7",
    reward: POINT_REWARDS.book,
    minutes: 5,
    icon: "moon",
    color: "lilac",
    subtitle: l("Orzular tomon kichik qadam", "Маленький шаг к мечте"),
    pages: [
      l(
        "Bir bor ekan, bir yo‘q ekan, yashil o‘rmonda mitti quyoncha yashar ekan. Har oqshom u osmonga qarab: “Oy qanday chiroyli! U bilan do‘st bo‘lsam edi”, der ekan.",
        "Жил в зелёном лесу маленький зайчонок. Каждый вечер он смотрел в небо: «Как прекрасна Луна! Вот бы с ней подружиться».",
      ),
      l(
        "Bir kuni quyoncha tepalikka chiqib, oyga qo‘l silkidi. Yoniga boyo‘g‘li uchib keldi. “Oy uzoqda, lekin uning yorug‘ligi hammamizga yetadi”, dedi u. Quyoncha do‘sti bilan yulduzlarni sanay boshladi.",
        "Однажды зайчонок забрался на холм и помахал Луне. Рядом приземлилась сова. «Луна далеко, но её свет достаётся всем», — сказала она. Друзья стали считать звёзды.",
      ),
      l(
        "Quyoncha bildiki, go‘zal orzular bizga quvonch beradi. U har kecha do‘stlari bilan oyga salom berar ekan. Orzusiga bir qadam yaqinlashish uchun osmon haqida yangi narsalarni o‘rgana boshladi.",
        "Зайчонок понял: прекрасные мечты дарят радость. Каждый вечер он приветствовал Луну вместе с друзьями. Чтобы стать ближе к мечте, он начал узнавать новое о небе.",
      ),
    ],
  },
  {
    id: "kindness",
    title: l("Mehrli yurak", "Доброе сердце"),
    category: "Tarbiya",
    age: "6–7",
    reward: POINT_REWARDS.book,
    minutes: 4,
    icon: "heart",
    color: "pink",
    subtitle: l("Yaxshilik doimo qaytadi", "Добро всегда возвращается"),
    pages: [
      l(
        "Lola maktabga ketayotib, qo‘lidan olmalari tushib ketgan boboni ko‘rdi. U darhol yugurib borib, olmalarni yig‘ishga yordam berdi. Bobo jilmayib: “Mehrli yuraging bor ekan”, dedi.",
        "По дороге в школу Лола увидела дедушку, рассыпавшего яблоки. Она сразу помогла их собрать. Дедушка улыбнулся: «У тебя доброе сердце».",
      ),
      l(
        "Tanaffusda Lola yangi o‘quvchini yolg‘iz ko‘rdi. “Kel, biz bilan o‘yna!” dedi u. Yangi do‘sti juda xursand bo‘ldi. Ular birga qiziqarli o‘yin o‘ynashdi.",
        "На перемене Лола увидела нового ученика, который стоял один. «Давай играть с нами!» — позвала она. Новый друг обрадовался. Вместе они придумали весёлую игру.",
      ),
      l(
        "Kechqurun Lola kunini esladi. Yaxshilik qilish uchun katta bo‘lish shart emasligini bildi. Bir tabassum, bir yordam, bir yaxshi so‘z ham dunyoni chiroyli qiladi.",
        "Вечером Лола вспомнила свой день. Чтобы делать добро, не обязательно быть взрослым. Улыбка, помощь и доброе слово делают мир прекраснее.",
      ),
    ],
  },
  {
    id: "little-garden",
    title: l("Mening kichik bog‘im", "Мой маленький сад"),
    category: "Tabiat",
    age: "7–8",
    reward: POINT_REWARDS.book,
    minutes: 6,
    icon: "flower",
    color: "mint",
    subtitle: l("Urug‘dan mo‘jizagacha", "От семечка до чуда"),
    pages: [
      l(
        "Aziz kichkina tuvakka urug‘ ekdi. U tuproqni yumshatdi va ozgina suv quydi. “Bu urug‘dan nima o‘sar ekan?” deb o‘yladi u.",
        "Азиз посадил семечко в маленький горшок. Он разрыхлил землю и немного полил её. «Что же вырастет?» — подумал он.",
      ),
      l(
        "Har kuni Aziz tuvakni tekshirdi. Bir tong tuproqdan yashil nihol chiqdi! Aziz tuvakni yorug‘ deraza yoniga qo‘ydi. U niholni mehr bilan parvarish qildi.",
        "Каждый день Азиз проверял горшок. Однажды утром появился зелёный росток! Азиз поставил горшок у светлого окна и заботливо ухаживал за растением.",
      ),
      l(
        "Vaqt o‘tib, nihol chiroyli gulga aylandi. Aziz sabr va g‘amxo‘rlik qanday mo‘jiza yaratishini ko‘rdi. Endi uning derazasida kichkina bog‘ bor edi.",
        "Со временем росток превратился в красивый цветок. Азиз увидел, какие чудеса творят терпение и забота. Теперь на его окне был маленький сад.",
      ),
    ],
  },
  {
    id: "star-journey",
    title: l("Yulduzlar sari sayohat", "Путешествие к звёздам"),
    category: "Ilm-fan",
    age: "7–8",
    reward: POINT_REWARDS.book,
    minutes: 7,
    icon: "rocket",
    color: "blue",
    subtitle: l("Osmonning sirlarini ochamiz", "Откроем секреты неба"),
    pages: [
      l(
        "Bilbiljon kechasi osmonga boqdi. Juda ko‘p yulduzlar porlab turardi. U bobosidan: “Yulduzlar nima?” deb so‘radi. Bobo: “Ular juda uzoqdagi, o‘zidan yorug‘lik chiqaruvchi jismlar”, dedi.",
        "Билбильджон посмотрел в ночное небо. В нём сверкало множество звёзд. «Что такое звёзды?» — спросил он. «Это очень далёкие небесные тела, которые излучают свет», — ответил дедушка.",
      ),
      l(
        "Bobo unga Quyosh ham yulduz ekanini aytdi. Quyosh Yerga eng yaqin yulduz. Shuning uchun u bizga boshqa yulduzlarga qaraganda kattaroq va yorqinroq ko‘rinadi.",
        "Дедушка объяснил, что Солнце — тоже звезда. Оно ближе к Земле, чем другие звёзды, поэтому кажется нам большим и ярким.",
      ),
      l(
        "Bilbiljon rasm daftariga Quyosh, Oy va yulduzlarni chizdi. U yangi bilimlarini do‘stlariga aytib berdi. Har bir savol uni yangi kashfiyot sari yetakladi.",
        "Билбильджон нарисовал Солнце, Луну и звёзды. Он поделился новыми знаниями с друзьями. Каждый вопрос вёл его к новому открытию.",
      ),
    ],
  },
  {
    id: "magic-map",
    title: l("Sehrli xarita", "Волшебная карта"),
    category: "Sarguzasht",
    age: "8–9",
    reward: POINT_REWARDS.book,
    minutes: 8,
    icon: "compass",
    color: "peach",
    subtitle: l("Do‘stlik eng katta xazina", "Дружба — главное сокровище"),
    pages: [
      l(
        "Kamola eski kitob ichidan xarita topdi. Unda o‘rmon, daryo va yulduzcha chizilgan edi. Kamola do‘stlarini chaqirdi va ular xazina izlashga yo‘l olishdi.",
        "Камола нашла в старой книге карту. На ней были лес, река и звёздочка. Она позвала друзей, и они отправились искать сокровище.",
      ),
      l(
        "Yo‘lda ular kichik daryoga duch kelishdi. Bir do‘sti ko‘prikni topdi, boshqasi yo‘lni ko‘rsatdi. Birgalikda ular barcha to‘siqlardan o‘tishdi.",
        "На пути встретилась речка. Один друг нашёл мост, другой указал дорогу. Вместе они преодолели все препятствия.",
      ),
      l(
        "Yulduzcha belgilangan joyda bir quti bor edi. Qutida: “Eng katta xazina — bir-biringizga yordam berganingiz”, degan yozuv va uchta kitob turardi. Bolalar kulib, birga o‘qishga kirishishdi.",
        "В месте со звёздочкой стояла коробка. В ней лежали три книги и записка: «Главное сокровище — ваша помощь друг другу». Дети улыбнулись и принялись читать.",
      ),
    ],
  },
  {
    id: "water-drop",
    title: l("Tomchining sarguzashti", "Приключения капельки"),
    category: "Tabiat",
    age: "8–9",
    reward: POINT_REWARDS.book,
    minutes: 6,
    icon: "globe",
    color: "blue",
    subtitle: l("Suvni asrashni o‘rganamiz", "Учимся беречь воду"),
    pages: [
      l(
        "Mitti tomchi bulut ichida yashardi. Bir kuni yomg‘ir bilan yerga tushdi. U yumshoq tuproq orasidan o‘tib, kichkina ariqchaga yetib bordi.",
        "Маленькая капелька жила в облаке. Однажды она упала на землю вместе с дождём, просочилась сквозь мягкую почву и попала в ручей.",
      ),
      l(
        "Ariqcha tomchini katta daryoga olib bordi. Yo‘lda u gullar va daraxtlarga hayot bag‘ishladi. Har bir o‘simlik suvga muhtoj edi.",
        "Ручей отнёс капельку в реку. По пути она помогала цветам и деревьям жить. Каждому растению нужна вода.",
      ),
      l(
        "Tomchi bizga: “Suvni bekorga oqizmang”, deydi. Tish yuvayotganda jo‘mrakni yoping. Kichik odatlar bilan tabiatga katta yordam bera olamiz.",
        "Капелька просит: «Не тратьте воду зря». Закрывайте кран, пока чистите зубы. Маленькие привычки помогают природе.",
      ),
    ],
  },
  {
    id: "clever-fox",
    title: l("Topqir tulki", "Находчивый лисёнок"),
    category: "Ertaklar",
    age: "9–10",
    reward: POINT_REWARDS.book,
    minutes: 8,
    icon: "bulb",
    color: "yellow",
    subtitle: l(
      "Har bir muammoning yechimi bor",
      "У каждой задачи есть решение",
    ),
    pages: [
      l(
        "O‘rmondagi kutubxonaning eshigi yopilib qoldi. Kalit baland tokchada edi. Quyon uni ololmadi, ayiq esa ichkariga sig‘madi. Tulki o‘ylab ko‘rdi.",
        "Дверь лесной библиотеки захлопнулась. Ключ лежал на высокой полке. Зайчик не мог достать его, а медведь не помещался в окошко. Лисёнок задумался.",
      ),
      l(
        "“Keling, kuchimizni birlashtiramiz”, dedi tulki. Ayiq quyonni ko‘tardi. Quyon derazadan kirib, kalitni oldi. Tulki eshikni ochdi.",
        "«Давайте объединим наши силы», — предложил лисёнок. Медведь поднял зайчика, тот пролез в окошко и взял ключ. Лисёнок открыл дверь.",
      ),
      l(
        "Kutubxona yana ochildi. Do‘stlar har birining qobiliyati boshqacha ekanini tushunishdi. Birga ishlaganda qiyin muammolar ham oson yechiladi.",
        "Библиотека снова открылась. Друзья поняли: у каждого свои способности. Когда мы работаем вместе, даже трудные задачи становятся проще.",
      ),
    ],
  },
  {
    id: "book-friend",
    title: l("Kitob — mening do‘stim", "Книга — мой друг"),
    category: "Tarbiya",
    age: "9–10",
    reward: POINT_REWARDS.book,
    minutes: 7,
    icon: "book",
    color: "mint",
    subtitle: l("Har kuni yangi kashfiyot", "Новое открытие каждый день"),
    pages: [
      l(
        "Sardor kitob o‘qishni unchalik yoqtirmasdi. Bir kuni opasi unga qiziqarli sarguzasht kitobini berdi. Sardor birinchi sahifani ochdi va kutilmagan sayohat boshlandi.",
        "Сардор не очень любил читать. Однажды сестра подарила ему интересную книгу приключений. Он открыл первую страницу — и началось неожиданное путешествие.",
      ),
      l(
        "Kitob qahramoni bilan Sardor dengizlardan o‘tdi, sirlarni ochdi va yangi do‘stlar topdi. U bilmagan so‘zlarini opasidan so‘rab, daftariga yozib bordi.",
        "Вместе с героем Сардор пересекал моря, раскрывал тайны и находил друзей. Незнакомые слова он спрашивал у сестры и записывал в тетрадь.",
      ),
      l(
        "Endi Sardor har kuni ozgina kitob o‘qiydi. U kitobni ehtiyot qiladi va sahifalarini buklamaydi. Kitob uning eng yaxshi do‘stlaridan biriga aylandi.",
        "Теперь Сардор читает понемногу каждый день. Он бережёт книгу и не загибает страницы. Книга стала одним из его лучших друзей.",
      ),
    ],
  },
];
