import type {
  Book,
  Quiz,
  ChildProfile,
  ProgressState,
  Language,
  NatureGameAction,
} from "@/types";
export interface ParentSession {
  userId: string;
  email: string;
}
export interface ParentAuthService {
  signUp(
    email: string,
    password: string,
    displayName?: string,
  ): Promise<ParentSession | null>;
  signIn(email: string, password: string): Promise<ParentSession>;
  requestPasswordReset(email: string, redirectTo: string): Promise<void>;
  signOut(): Promise<void>;
}
export interface ContentService {
  listBooks(filters?: {
    query?: string;
    age?: string;
    category?: string;
  }): Promise<Book[]>;
  getBook(id: string): Promise<Book | null>;
  listQuizzes(): Promise<Quiz[]>;
  getQuiz(id: string): Promise<Quiz | null>;
}
export interface ChildService {
  getProfile(childId: string): Promise<ChildProfile>;
  updateProfile(childId: string, profile: ChildProfile): Promise<void>;
  savePreferences(
    childId: string,
    preferences: {
      language: Language;
      notifications: boolean;
    },
  ): Promise<void>;
}
export interface ProgressService {
  getProgress(childId: string): Promise<ProgressState>;
  recordReading(childId: string, bookId: string): Promise<ProgressState>;
  submitQuiz(
    childId: string,
    quizId: string,
    answers: number[],
  ): Promise<ProgressState>;
  completeNatureGame(
    childId: string,
    gameId: string,
    actions: NatureGameAction[],
  ): Promise<ProgressState>;
  completeWisdomLesson(
    childId: string,
    lessonId: string,
  ): Promise<ProgressState>;
}
/** Future server award logic must derive rewards from catalog data, never trust a client score. */
