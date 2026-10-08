"use client";
import { useState } from "react";
import Link from "@/components/app-link";
import { Check, X, Star, RotateCcw } from "lucide-react";
import { AppShell } from "@/layouts/app-shell";
import {
  PageHeading,
  Icon,
  PrimaryButton,
  ProgressBar,
} from "@/components/common";
import { useApp } from "@/hooks/use-app";
import { quizzes, quizSources } from "@/data/quizzes";
export function QuizPlayerPage({ quizId }: { quizId: string }) {
  const { preferences, completeQuiz, t } = useApp();
  const [index, setIndex] = useState(0),
    [answer, setAnswer] = useState<number | null>(null),
    [score, setScore] = useState(0),
    [finished, setFinished] = useState(false);
  const quiz = quizzes.find((q) => q.id === quizId);
  if (!quiz)
    return (
      <AppShell>
        <PageHeading title={t("Quiz topilmadi", "Викторина не найдена")} />
        <PrimaryButton href="/quizzes">
          {t("Quizlarga qaytish", "К викторинам")}
        </PrimaryButton>
      </AppShell>
    );
  const question = quiz.questions[index];
  function select(i: number) {
    if (answer !== null) return;
    setAnswer(i);
    if (i === question.correct) setScore((s) => s + 2);
  }
  function next() {
    if (answer === null) return;
    if (index === quiz!.questions.length - 1) {
      completeQuiz(quiz!.id, score);
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setAnswer(null);
    }
  }
  function restart() {
    setIndex(0);
    setAnswer(null);
    setScore(0);
    setFinished(false);
  }
  return (
    <AppShell>
      <PageHeading
        back="/quizzes"
        eyebrow={t("BILIM SARGUZASHTI", "ПРИКЛЮЧЕНИЕ ЗНАНИЙ")}
        title={quiz.name}
      />
      {finished ? (
        <section className="result-card">
          <span className="result-trophy">
            <Icon name="trophy" size={64} />
          </span>
          <h2>
            {score >= 6
              ? t("Ajoyib natija, bilimdon!", "Отличный результат, знаток!")
              : t("Yangi bilimlar muborak!", "Поздравляем с новыми знаниями!")}
          </h2>
          <p>
            {t(
              "Har bir javob bilan bilim daraxting o‘sadi. Yana mashq qilib, yanada ko‘proq o‘rganishing mumkin!",
              "С каждым ответом растёт твоё дерево знаний. Попробуй ещё раз и узнай больше!",
            )}
          </p>
          <div className="quiz-score-stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={32}
                className={i < score / 2 ? "earned" : ""}
              />
            ))}
          </div>
          <div className="earned-points">
            {score / 2} / 5 {t("to‘g‘ri javob", "верных ответов")}
            <span>
              +{score} {t("ball", "баллов")}
            </span>
          </div>
          <p className="result-note">
            {t(
              "Takroriy urinishda faqat yaxshilangan natija uchun qo‘shimcha ball beriladi.",
              "При повторной попытке дополнительные баллы даются только за улучшение результата.",
            )}
          </p>
          <PrimaryButton href="/rewards">
            {t("Mukofotlarimni ko‘rish", "Мои награды")}
          </PrimaryButton>
          <button className="text-button" onClick={restart}>
            <RotateCcw size={17} />
            {t("Yana sinab ko‘rish", "Попробовать ещё")}
          </button>
        </section>
      ) : (
        <section className="quiz-player-card">
          <div className="quiz-player-top">
            <span>
              {t("Savol", "Вопрос")} {index + 1} / {quiz.questions.length}
            </span>
            <span className="live-score">
              <Star size={17} />
              {score} {t("ball", "баллов")}
            </span>
          </div>
          <ProgressBar
            value={
              ((index + (answer !== null ? 1 : 0)) / quiz.questions.length) *
              100
            }
            label={t("Quiz jarayoni", "Прогресс викторины")}
          />
          <div className="question-label">
            <Icon name={quiz.icon} size={21} />
            {t("O‘ylab ko‘r va javobni tanla", "Подумай и выбери ответ")}
          </div>
          <h2>{question.question[preferences.language]}</h2>
          <div className="quiz-answers">
            {question.answers.map((a, i) => {
              const correct = answer !== null && i === question.correct,
                wrong = answer === i && i !== question.correct;
              return (
                <button
                  key={i}
                  className={
                    "quiz-answer " +
                    (correct ? "correct" : wrong ? "wrong" : "")
                  }
                  onClick={() => select(i)}
                  disabled={answer !== null}
                  aria-pressed={answer === i}
                >
                  <span className="answer-letter">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{a[preferences.language]}</span>
                  {correct ? (
                    <Check size={21} />
                  ) : wrong ? (
                    <X size={21} />
                  ) : null}
                </button>
              );
            })}
          </div>
          {answer !== null && (
            <div
              className={
                "answer-feedback " +
                (answer === question.correct ? "positive" : "")
              }
              role="status"
            >
              <strong>
                {answer === question.correct
                  ? t(
                      "Barakalla! To‘g‘ri javob! +2 ball",
                      "Молодец! Верный ответ! +2 балла",
                    )
                  : t(
                      "Yaxshi urinish! Birga o‘rganamiz.",
                      "Хорошая попытка! Будем учиться вместе.",
                    )}
              </strong>
              <p>{question.explanation[preferences.language]}</p>
            </div>
          )}
          <div className="quiz-next">
            <PrimaryButton onClick={next} disabled={answer === null}>
              {index === quiz.questions.length - 1
                ? t("Natijani ko‘rish", "Посмотреть результат")
                : t("Keyingi savol", "Следующий вопрос")}
            </PrimaryButton>
          </div>
        </section>
      )}
      <p className="source-note">
        {t("Tarixiy ma’lumotlar:", "Исторические сведения:")}{" "}
        <a
          href={quizSources[quiz.id as keyof typeof quizSources]}
          target="_blank"
          rel="noreferrer"
        >
          {quiz.id === "amir-temur"
            ? t(
                "Samarqand viloyati hokimligi",
                "Хокимият Самаркандской области",
              )
            : t("Yoshlar ishlari agentligi", "Агентство по делам молодёжи")}
        </a>
      </p>
    </AppShell>
  );
}
