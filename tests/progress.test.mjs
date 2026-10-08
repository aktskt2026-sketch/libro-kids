import test from "node:test";
import assert from "node:assert/strict";
import {
  recordBookRead,
  recordQuizScore,
  recordGameCompletion,
  recordWisdomLesson,
} from "../lib/progress.ts";
const baseline = () => ({
  points: 35,
  streak: 3,
  completedBooks: ["old"],
  quizScores: {},
  completedGames: [],
  readingDates: ["2026-10-06"],
  dailyGoalDates: ["2026-10-06"],
  wisdomDates: [],
});
test("nature games reward each completion once without changing reading or quizzes", () => {
  const first = recordGameCompletion(baseline(), "sort", 5);
  const replay = recordGameCompletion(first, "sort", 5);
  const second = recordGameCompletion(replay, "garden", 5);
  assert.equal(first.points, 40);
  assert.equal(replay.points, 40);
  assert.equal(second.points, 45);
  assert.deepEqual(second.completedGames, ["sort", "garden"]);
  assert.equal(second.streak, baseline().streak);
  assert.deepEqual(second.quizScores, {});
  assert.deepEqual(second.readingDates, baseline().readingDates);
});
test("nature completion supports progress saved before games existed", () => {
  const { completedGames, ...legacy } = baseline();
  const completed = recordGameCompletion(legacy, "garden", 5);
  assert.equal(completed.points, 40);
  assert.deepEqual(completed.completedGames, ["garden"]);
  assert.deepEqual(legacy.completedGames, undefined);
});
test("new book rewards once; rereading still marks daily reading", () => {
  const first = recordBookRead(baseline(), "new", 5, new Date(2026, 9, 7));
  const second = recordBookRead(first, "new", 5, new Date(2026, 9, 7));
  assert.equal(first.points, 43);
  assert.equal(second.points, 43);
  assert.equal(second.streak, 4);
  assert.deepEqual(second.completedBooks, ["old", "new"]);
  const nextDay = recordBookRead(second, "new", 5, new Date(2026, 9, 8));
  assert.equal(nextDay.points, 46);
  assert.equal(nextDay.streak, 5);
  assert.ok(nextDay.readingDates.includes("2026-10-08"));
});
test("reading after a calendar gap resets the streak", () => {
  assert.equal(
    recordBookRead(baseline(), "new", 5, new Date(2026, 9, 9)).streak,
    1,
  );
});
test("multiple books on one day do not inflate the streak", () => {
  const first = recordBookRead(baseline(), "one", 5, new Date(2026, 9, 7));
  const second = recordBookRead(first, "two", 5, new Date(2026, 9, 7));
  assert.equal(second.streak, 4);
  assert.equal(second.points, 48);
  assert.equal(second.readingDates.length, 2);
});
test("daily goal awards once per local calendar day, including rereads", () => {
  const first = recordBookRead(
    baseline(),
    "old",
    5,
    new Date(2026, 9, 7, 23, 59),
  );
  assert.equal(first.points, 38);
  assert.deepEqual(first.dailyGoalDates, ["2026-10-06", "2026-10-07"]);
  const repeat = recordBookRead(first, "old", 5, new Date(2026, 9, 7, 23, 59));
  assert.equal(repeat.points, 38);
  const nextDay = recordBookRead(repeat, "old", 5, new Date(2026, 9, 8, 0, 1));
  assert.equal(nextDay.points, 41);
  assert.equal(nextDay.streak, 5);
});
test("older reading dates do not receive a retroactive daily bonus", () => {
  const { dailyGoalDates, wisdomDates, ...legacy } = baseline();
  const sameDay = recordBookRead(legacy, "new", 5, new Date(2026, 9, 6));
  assert.equal(sameDay.points, 40);
  assert.deepEqual(sameDay.dailyGoalDates, ["2026-10-06"]);
  const nextDay = recordBookRead(sameDay, "new", 5, new Date(2026, 9, 7));
  assert.equal(nextDay.points, 43);
});
test("wisdom bonus persists once per day without changing reading progress", () => {
  const original = baseline();
  const first = recordWisdomLesson(original, new Date(2026, 9, 7));
  assert.equal(first.points, 37);
  assert.deepEqual(first.wisdomDates, ["2026-10-07"]);
  assert.equal(recordWisdomLesson(first, new Date(2026, 9, 7)), first);
  const next = recordWisdomLesson(first, new Date(2026, 9, 8));
  assert.equal(next.points, 39);
  assert.equal(next.streak, original.streak);
  assert.deepEqual(next.completedBooks, original.completedBooks);
  assert.deepEqual(next.dailyGoalDates, original.dailyGoalDates);
  assert.deepEqual(original.wisdomDates, []);
  const { wisdomDates, ...legacy } = original;
  assert.equal(recordWisdomLesson(legacy, new Date(2026, 9, 7)).points, 37);
});
test("quiz replay rewards only improvement, including zero-score completion", () => {
  const first = recordQuizScore(baseline(), "quiz", 6);
  assert.equal(first.points, 41);
  assert.equal(recordQuizScore(first, "quiz", 4).points, 41);
  const better = recordQuizScore(first, "quiz", 10);
  assert.equal(better.points, 45);
  assert.equal(recordQuizScore(better, "quiz", 10).points, 45);
  assert.equal(recordQuizScore(baseline(), "zero", 0).quizScores.zero, 0);
});
