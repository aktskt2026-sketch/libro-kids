import type { Localized } from "../types/index";

export interface ParkPoint {
  x: number;
  y: number;
}
export const parkStart: ParkPoint = { x: 55, y: 73 };
export const parkBin: ParkPoint = { x: 49, y: 58 };
export const parkCharacters = [
  { id: "rabbit", name: "Bilbiljon", position: "0% 0%" },
  { id: "boy", name: "Aziz", position: "100% 0%" },
  { id: "girl", name: "Malika", position: "0% 100%" },
] as const;
export const parkLitter: {
  id: string;
  title: Localized;
  emoji: string;
  position: ParkPoint;
}[] = [
  {
    id: "bottle",
    title: { uz: "Plastik idish", ru: "Бутылка" },
    emoji: "🧴",
    position: { x: 63, y: 73 },
  },
  {
    id: "cup",
    title: { uz: "Bo‘sh stakan", ru: "Стакан" },
    emoji: "🥤",
    position: { x: 77, y: 83 },
  },
  {
    id: "can",
    title: { uz: "Bo‘sh quti", ru: "Банка" },
    emoji: "🥫",
    position: { x: 85, y: 60 },
  },
  {
    id: "paper",
    title: { uz: "Qog‘oz varag‘i", ru: "Лист бумаги" },
    emoji: "📄",
    position: { x: 70, y: 45 },
  },
  {
    id: "bag",
    title: { uz: "Plastik paket", ru: "Пакет" },
    emoji: "🛍️",
    position: { x: 82, y: 25 },
  },
  {
    id: "newspaper",
    title: { uz: "Eski gazeta", ru: "Газета" },
    emoji: "📰",
    position: { x: 60, y: 18 },
  },
  {
    id: "box",
    title: { uz: "Karton quti", ru: "Коробка" },
    emoji: "📦",
    position: { x: 45, y: 35 },
  },
  {
    id: "wrapper",
    title: { uz: "Qog‘oz o‘ram", ru: "Обёртка" },
    emoji: "🧻",
    position: { x: 24, y: 27 },
  },
  {
    id: "banana",
    title: { uz: "Banan po‘sti", ru: "Кожура банана" },
    emoji: "🍌",
    position: { x: 14, y: 48 },
  },
  {
    id: "carton",
    title: { uz: "Sharbat qutisi", ru: "Пакет сока" },
    emoji: "🧃",
    position: { x: 25, y: 65 },
  },
  {
    id: "apple",
    title: { uz: "Olma qoldig‘i", ru: "Огрызок" },
    emoji: "🍎",
    position: { x: 17, y: 82 },
  },
  {
    id: "packet",
    title: { uz: "Bo‘sh paket", ru: "Пустая упаковка" },
    emoji: "🍬",
    position: { x: 43, y: 88 },
  },
];
