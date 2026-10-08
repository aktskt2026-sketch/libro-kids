export const treeLevels = [
  { name: "Urug‘", ru: "Семечко", points: 0, icon: "🌰" },
  { name: "Nihol", ru: "Росток", points: 10, icon: "🌱" },
  { name: "Ko‘chat", ru: "Саженец", points: 25, icon: "🌿" },
  { name: "Yosh daraxt", ru: "Молодое дерево", points: 50, icon: "🌳" },
  { name: "Gullagan daraxt", ru: "Цветущее дерево", points: 80, icon: "🌸" },
  { name: "Mevali daraxt", ru: "Плодовое дерево", points: 120, icon: "🍎" },
  { name: "Bilim daraxti", ru: "Дерево знаний", points: 180, icon: "✨" },
];
export const getTreeLevel = (points: number) =>
  treeLevels.filter((l) => points >= l.points).length - 1;
export const achievements = [
  {
    id: "reader",
    title: "Birinchi kitob",
    ru: "Первая книга",
    description: "Bitta kitobni oxirigacha o‘qing",
    ruDescription: "Прочитайте одну книгу",
    icon: "book",
    goal: 1,
    kind: "books",
  },
  {
    id: "streak",
    title: "Har kuni bir qadam",
    ru: "Шаг каждый день",
    description: "3 kun ketma-ket o‘qing",
    ruDescription: "Читайте 3 дня подряд",
    icon: "flame",
    goal: 3,
    kind: "streak",
  },
  {
    id: "quiz",
    title: "Bilimdon",
    ru: "Знаток",
    description: "Bitta quizni yakunlang",
    ruDescription: "Завершите одну викторину",
    icon: "brain",
    goal: 1,
    kind: "quizzes",
  },
  {
    id: "star",
    title: "Yulduz yig‘uvchi",
    ru: "Коллекционер звёзд",
    description: "50 ball yig‘ing",
    ruDescription: "Соберите 50 баллов",
    icon: "star",
    goal: 50,
    kind: "points",
  },
] as const;
