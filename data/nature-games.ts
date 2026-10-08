import type { Localized, NatureGame } from "@/types";

export const natureGames: NatureGame[] = [
  {
    id: "sort",
    title: { uz: "Chiqindini sarala", ru: "Сортируй отходы" },
    description: {
      uz: "Har bir chiqindi uchun to‘g‘ri qutini top. Yer sayyoramizga yordam ber!",
      ru: "Найди подходящий контейнер для каждого предмета. Помоги нашей планете!",
    },
    color: "lilac",
    reward: 5,
  },
  {
    id: "garden",
    title: { uz: "Bog‘ni tozala", ru: "Убери в парке" },
    description: {
      uz: "Yashil bog‘dagi chiqindilarni topib yig‘. Kapalaklar senga rahmat aytadi!",
      ru: "Найди и собери мусор в зелёном парке. Бабочки скажут тебе спасибо!",
    },
    color: "mint",
    reward: 5,
  },
];

export type WasteCategory = "plastic" | "paper" | "organic";
export const wasteBins: {
  id: WasteCategory;
  title: Localized;
  emoji: string;
  hint: Localized;
}[] = [
  {
    id: "plastic",
    title: { uz: "Plastik", ru: "Пластик" },
    emoji: "♻️",
    hint: { uz: "Idish va paketlar", ru: "Упаковка и пакеты" },
  },
  {
    id: "paper",
    title: { uz: "Qog‘oz", ru: "Бумага" },
    emoji: "📄",
    hint: { uz: "Varaq va gazetalar", ru: "Листы и газеты" },
  },
  {
    id: "organic",
    title: { uz: "Organik", ru: "Органика" },
    emoji: "🌱",
    hint: { uz: "Meva qoldiqlari", ru: "Остатки фруктов" },
  },
];
export const sortingItems: {
  id: string;
  title: Localized;
  emoji: string;
  category: WasteCategory;
}[] = [
  {
    id: "bottle",
    title: { uz: "Plastik idish", ru: "Пластиковая бутылка" },
    emoji: "🧴",
    category: "plastic",
  },
  {
    id: "sheet",
    title: { uz: "Qog‘oz varag‘i", ru: "Лист бумаги" },
    emoji: "📄",
    category: "paper",
  },
  {
    id: "banana",
    title: { uz: "Banan po‘sti", ru: "Банановая кожура" },
    emoji: "🍌",
    category: "organic",
  },
  {
    id: "bag",
    title: { uz: "Plastik paket", ru: "Пластиковый пакет" },
    emoji: "🛍️",
    category: "plastic",
  },
  {
    id: "newspaper",
    title: { uz: "Eski gazeta", ru: "Старая газета" },
    emoji: "📰",
    category: "paper",
  },
  {
    id: "apple",
    title: { uz: "Olma qoldig‘i", ru: "Огрызок яблока" },
    emoji: "🍎",
    category: "organic",
  },
];
export const gardenLitter: {
  id: string;
  title: Localized;
  emoji: string;
  x: number;
  y: number;
}[] = [
  {
    id: "bottle",
    title: { uz: "Plastik idish", ru: "Пластиковая бутылка" },
    emoji: "🧴",
    x: 16,
    y: 45,
  },
  {
    id: "cup",
    title: { uz: "Bo‘sh stakan", ru: "Пустой стакан" },
    emoji: "🥤",
    x: 47,
    y: 36,
  },
  {
    id: "newspaper",
    title: { uz: "Eski gazeta", ru: "Старая газета" },
    emoji: "📰",
    x: 76,
    y: 44,
  },
  {
    id: "bag",
    title: { uz: "Plastik paket", ru: "Пластиковый пакет" },
    emoji: "🛍️",
    x: 32,
    y: 56,
  },
  {
    id: "can",
    title: { uz: "Bo‘sh quti", ru: "Пустая банка" },
    emoji: "🥫",
    x: 60,
    y: 62,
  },
  {
    id: "paper",
    title: { uz: "Qog‘oz", ru: "Бумага" },
    emoji: "📄",
    x: 86,
    y: 71,
  },
  {
    id: "box",
    title: { uz: "Karton quti", ru: "Картонная коробка" },
    emoji: "📦",
    x: 18,
    y: 81,
  },
  {
    id: "wrapper",
    title: { uz: "Qog‘oz o‘ram", ru: "Бумажная обёртка" },
    emoji: "🧻",
    x: 43,
    y: 84,
  },
];
