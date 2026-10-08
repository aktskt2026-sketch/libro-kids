import type { AppState } from "@/types";
import { dateKey } from "@/lib/progress";
/** Async boundary for replacing device-local demo storage with Supabase. */
export interface LearningRepository {
  load(): Promise<AppState>;
  save(state: AppState): Promise<void>;
  clear(): Promise<void>;
}
const demoDates = [3, 2, 1].map((offset) => {
  const date = new Date();
  date.setDate(date.getDate() - offset);
  return dateKey(date);
});
export const initialState: AppState = {
  profile: { name: "Azizbek", age: "6–9", gender: "boy" },
  progress: {
    points: 35,
    streak: 3,
    completedBooks: ["kindness"],
    quizScores: {},
    completedGames: [],
    readingDates: demoDates,
  },
  preferences: { language: "uz", notifications: true },
  parentEmail: "",
};
const KEY = "libro-kids-demo-v1";
function isState(p: unknown): p is AppState {
  if (!p || typeof p !== "object") return false;
  const s = p as AppState;
  return (
    typeof s.profile?.name === "string" &&
    ["boy", "girl"].includes(s.profile?.gender) &&
    typeof s.progress?.points === "number" &&
    Number.isFinite(s.progress.points) &&
    Array.isArray(s.progress?.completedBooks) &&
    Array.isArray(s.progress?.readingDates) &&
    typeof s.progress?.quizScores === "object" &&
    ["uz", "ru"].includes(s.preferences?.language)
  );
}
export const mockRepository: LearningRepository = {
  async load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return structuredClone(initialState);
      const parsed: unknown = JSON.parse(raw);
      if (!isState(parsed)) return structuredClone(initialState);
      return {
        ...parsed,
        progress: {
          ...parsed.progress,
          completedGames: Array.isArray(parsed.progress.completedGames)
            ? parsed.progress.completedGames.filter(
                (id) => typeof id === "string",
              )
            : [],
        },
      };
    } catch {
      return structuredClone(initialState);
    }
  },
  async save(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* Continue in memory if device storage is unavailable. */
    }
  },
  async clear() {
    try {
      localStorage.removeItem(KEY);
    } catch {}
  },
};
/** Keep mock mode until a reviewed Supabase adapter implements this contract. */
export const learningRepository: LearningRepository = mockRepository;
