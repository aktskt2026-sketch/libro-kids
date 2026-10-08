"use client";
import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";
import { AppShell } from "@/layouts/app-shell";
import { PageHeading, Icon, Mascot } from "@/components/common";
import { useApp } from "@/hooks/use-app";
import { quizzes } from "@/data/quizzes";
import { WorldIllustration } from "@/components/world-illustration";
export function QuizzesPage() {
  const { preferences, progress, t } = useApp();
  return (
    <AppShell>
      <PageHeading
        eyebrow={t("O‘YNA. O‘YLA. O‘RGAN.", "ИГРАЙ. ДУМАЙ. УЗНАВАЙ.")}
        title={t("Bilimingni sinab ko‘r!", "Проверь свои знания!")}
        description={t(
          "Buyuk ajdodlarimiz bilan tanish va har bir javob uchun yulduz yig‘.",
          "Познакомься с великими предками и собирай звёзды за верные ответы.",
        )}
      />
      <section className="quiz-banner">
        <WorldIllustration world="quiz" className="quiz-banner-art" />
        <div>
          <h2>
            {t(
              "Har bir to‘g‘ri javob — yangi yulduz!",
              "Каждый верный ответ — новая звезда!",
            )}
          </h2>
          <p>
            {t(
              "5 ta savol · Har bir to‘g‘ri javob uchun +2 ball",
              "5 вопросов · +2 балла за каждый верный ответ",
            )}
          </p>
        </div>
        <span className="quiz-banner-star">✦</span>
      </section>
      <div className="quiz-grid">
        {quizzes.map((q) => (
          <article key={q.id} className={"quiz-card " + q.color}>
            <div className="quiz-card-top">
              <span className="eyebrow">
                {t("BUYUK AJDODLARIMIZ", "ВЕЛИКИЕ ПРЕДКИ")}
              </span>
              {q.id in progress.quizScores && (
                <span className="quiz-complete">
                  <Check size={13} />
                  {progress.quizScores[q.id]}/10
                </span>
              )}
            </div>
            <div className="hero-symbol">
              <WorldIllustration
                world={q.id === "amir-temur" ? "battle" : "books"}
              />
            </div>
            <h2>{q.name}</h2>
            <p>{q.description[preferences.language]}</p>
            <div className="quiz-card-meta">
              <span>
                <Icon name="brain" size={17} />
                {t("5 ta savol", "5 вопросов")}
              </span>
              <span>
                <Star size={17} />
                +2 {t("ball / javob", "балла / ответ")}
              </span>
            </div>
            <Link href={"/quizzes/" + q.id} className="primary-button">
              {q.id in progress.quizScores
                ? t("Yana sinab ko‘rish", "Попробовать ещё")
                : t("Quizni boshlash", "Начать викторину")}
              <ArrowRight size={18} />
            </Link>
          </article>
        ))}
      </div>
      <section className="quiz-encouragement">
        <Mascot />
        <div>
          <h3>{t("Xato qilishdan qo‘rqma!", "Не бойся ошибаться!")}</h3>
          <p>
            {t(
              "Har bir savol — yangi bilim. Birga o‘rganamiz, birga o‘samiz.",
              "Каждый вопрос — новое знание. Будем учиться и расти вместе.",
            )}
          </p>
        </div>
      </section>
    </AppShell>
  );
}
