import type { ProgressState } from "@/types";
import { POINT_REWARDS } from "../data/point-rules.ts";
export function dateKey(date: Date): string {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
}
export function recordBookRead(
  progress: ProgressState,
  id: string,
  reward: number,
  date = new Date(),
): ProgressState {
  const today = dateKey(date);
  const yesterday = new Date(date);
  yesterday.setDate(date.getDate() - 1);
  const newDay = !progress.readingDates.includes(today);
  const newBook = !progress.completedBooks.includes(id);
  // Older profiles already fulfilled their reading days; never back-award them.
  const goalDates = progress.dailyGoalDates ?? progress.readingDates;
  const newGoal = !goalDates.includes(today);
  return {
    ...progress,
    points:
      progress.points +
      (newBook ? reward : 0) +
      (newGoal ? POINT_REWARDS.dailyGoal : 0),
    dailyGoalDates: newGoal ? [...goalDates, today] : goalDates,
    completedBooks: newBook
      ? [...progress.completedBooks, id]
      : progress.completedBooks,
    readingDates: newDay
      ? [...progress.readingDates, today]
      : progress.readingDates,
    streak: newDay
      ? progress.readingDates.includes(dateKey(yesterday))
        ? progress.streak + 1
        : 1
      : progress.streak,
  };
}
export function recordWisdomLesson(
  progress: ProgressState,
  date = new Date(),
): ProgressState {
  const today = dateKey(date);
  const days = progress.wisdomDates ?? [];
  if (days.includes(today)) return progress;
  return {
    ...progress,
    points: progress.points + POINT_REWARDS.wisdom,
    wisdomDates: [...days, today],
  };
}
export function recordQuizScore(
  progress: ProgressState,
  id: string,
  score: number,
): ProgressState {
  const best = progress.quizScores[id] ?? 0;
  return {
    ...progress,
    points: progress.points + Math.max(0, score - best),
    quizScores: { ...progress.quizScores, [id]: Math.max(best, score) },
  };
}

export function recordGameCompletion(
  progress: ProgressState,
  id: string,
  reward: number,
): ProgressState {
  const completed = progress.completedGames ?? [];
  if (completed.includes(id)) return progress;
  return {
    ...progress,
    points: progress.points + reward,
    completedGames: [...completed, id],
  };
}
