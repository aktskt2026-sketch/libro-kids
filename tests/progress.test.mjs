import test from "node:test";
import assert from "node:assert/strict";
import { recordBookRead, recordQuizScore } from "../lib/progress.ts";
const baseline = () => ({
  points: 35,
  streak: 3,
  completedBooks: ["old"],
  quizScores: {},
  readingDates: ["2026-10-06"],
});
test("new book rewards once; rereading still marks daily reading", () => {
  const first = recordBookRead(baseline(), "new", 5, new Date(2026, 9, 7));
  const second = recordBookRead(first, "new", 5, new Date(2026, 9, 7));
  assert.equal(first.points, 40);
  assert.equal(second.points, 40);
  assert.equal(second.streak, 4);
  assert.deepEqual(second.completedBooks, ["old", "new"]);
  const nextDay = recordBookRead(second, "new", 5, new Date(2026, 9, 8));
  assert.equal(nextDay.points, 40);
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
  assert.equal(second.points, 45);
  assert.equal(second.readingDates.length, 2);
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
