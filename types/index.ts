export type Language = "uz" | "ru";
export type Localized = Record<Language, string>;
export type AgeGroup = "6–7" | "7–8" | "8–9" | "9–10";
export type Category =
  "Ertaklar" | "Ilm-fan" | "Tarbiya" | "Sarguzasht" | "Tabiat";
export interface ChildProfile {
  name: string;
  age: string;
  gender: "boy" | "girl";
}
export interface ProgressState {
  points: number;
  streak: number;
  completedBooks: string[];
  quizScores: Record<string, number>;
  completedGames: string[];
  readingDates: string[];
}
export interface AppState {
  profile: ChildProfile;
  progress: ProgressState;
  preferences: {
    language: Language;
    notifications: boolean;
  };
  parentEmail: string;
}
export interface Book {
  id: string;
  title: Localized;
  category: Category;
  age: AgeGroup;
  reward: number;
  minutes: number;
  icon: string;
  color: string;
  subtitle: Localized;
  pages: Localized[];
}
export interface Question {
  question: Localized;
  answers: Localized[];
  correct: number;
  explanation: Localized;
}
export interface Quiz {
  id: string;
  name: string;
  description: Localized;
  color: string;
  icon: string;
  questions: Question[];
}
export interface NatureGame {
  id: "sort" | "garden";
  title: Localized;
  description: Localized;
  color: string;
  reward: number;
}
export type NatureGameAction =
  | { itemId: string; action: "collect" }
  | {
      itemId: string;
      action: "sort";
      category: "plastic" | "paper" | "organic";
    };
