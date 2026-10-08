"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { AppState, ChildProfile, Language } from "@/types";
import { initialState, learningRepository } from "@/lib/repository";
import { recordBookRead, recordQuizScore } from "@/lib/progress";
type Context = AppState & {
  ready: boolean;
  t: (uz: string, ru: string) => string;
  setLanguage: (l: Language) => void;
  updateProfile: (p: ChildProfile) => void;
  setEmail: (e: string) => void;
  toggleNotifications: () => void;
  completeBook: (id: string, reward: number) => void;
  completeQuiz: (id: string, score: number) => void;
  logout: () => void;
};
const AppContext = createContext<Context | null>(null);
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState(initialState);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    void learningRepository
      .load()
      .then((s) => {
        if (active) {
          setState(s);
          setReady(true);
        }
      })
      .catch(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (ready) {
      void learningRepository.save(state).catch(() => {});
      document.documentElement.lang = state.preferences.language;
    }
  }, [state, ready]);
  const value: Context = {
    ...state,
    ready,
    t: (uz, ru) => (state.preferences.language === "uz" ? uz : ru),
    setLanguage: (language) =>
      setState((s) => ({ ...s, preferences: { ...s.preferences, language } })),
    updateProfile: (profile) => setState((s) => ({ ...s, profile })),
    setEmail: (parentEmail) => setState((s) => ({ ...s, parentEmail })),
    toggleNotifications: () =>
      setState((s) => ({
        ...s,
        preferences: {
          ...s.preferences,
          notifications: !s.preferences.notifications,
        },
      })),
    completeBook: (id, reward) =>
      setState((s) => ({
        ...s,
        progress: recordBookRead(s.progress, id, reward),
      })),
    completeQuiz: (id, score) =>
      setState((s) => ({
        ...s,
        progress: recordQuizScore(s.progress, id, score),
      })),
    logout: () => {
      void learningRepository.clear();
      setState({
        ...structuredClone(initialState),
        preferences: state.preferences,
      });
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export function useApp() {
  const v = useContext(AppContext);
  if (!v) throw new Error("AppProvider required");
  return v;
}
