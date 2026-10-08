import type { Localized } from "@/types";

export const POINT_REWARDS = {
  book: 5,
  quizAnswer: 2,
  dailyGoal: 3,
  wisdom: 2,
  natureGame: 5,
} as const;

export const pointRules: {
  id: keyof typeof POINT_REWARDS;
  icon: string;
  color: string;
  title: Localized;
  detail: Localized;
  href: string;
}[] = [
  {
    id: "book",
    icon: "book",
    color: "blue",
    title: { uz: "O‘qilgan kitob uchun", ru: "За прочитанную книгу" },
    detail: {
      uz: "Oxirigacha o‘qi · har bir kitobga bir marta",
      ru: "Прочитай до конца · один раз за каждую книгу",
    },
    href: "/library",
  },
  {
    id: "quizAnswer",
    icon: "brain",
    color: "peach",
    title: {
      uz: "Quizdagi to‘g‘ri javob uchun",
      ru: "За верный ответ в викторине",
    },
    detail: {
      uz: "Quizni yakunla · takrorda faqat natija yaxshilansa",
      ru: "Заверши викторину · повтор даёт баллы за улучшение",
    },
    href: "/quizzes",
  },
  {
    id: "dailyGoal",
    icon: "target",
    color: "mint",
    title: { uz: "Kunlik maqsad uchun", ru: "За ежедневную цель" },
    detail: {
      uz: "Bugun bir kitobni tugat · kuniga bir marta",
      ru: "Прочитай одну книгу сегодня · раз в день",
    },
    href: "/library",
  },
  {
    id: "wisdom",
    icon: "heart",
    color: "pink",
    title: { uz: "Kunlik odob darsi uchun", ru: "За ежедневный урок доброты" },
    detail: {
      uz: "Darsni o‘qi va «Tushundim»ni bos · kuniga bir marta",
      ru: "Прочитай урок и нажми «Понял» · раз в день",
    },
    href: "/home#wisdom",
  },
  {
    id: "natureGame",
    icon: "leaf",
    color: "lilac",
    title: {
      uz: "Tabiat o‘yinini tugatganing uchun",
      ru: "За завершённую игру о природе",
    },
    detail: {
      uz: "Har bir o‘yinga bir marta · o‘yin ichidagi hisob alohida",
      ru: "Раз за каждую игру · игровой счёт считается отдельно",
    },
    href: "/nature",
  },
];
