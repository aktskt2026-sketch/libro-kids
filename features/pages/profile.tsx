"use client";
import Link from "@/components/app-link";
import { Pencil, Check } from "lucide-react";
import { AppShell } from "@/layouts/app-shell";
import {
  PageHeading,
  Icon,
  Mascot,
  PrimaryButton,
  Stats,
} from "@/components/common";
import { useApp } from "@/hooks/use-app";
import { getTreeLevel, treeLevels } from "@/data/rewards";
import { books } from "@/data/books";
import { quizzes } from "@/data/quizzes";
import { natureGames } from "@/data/nature-games";
export function ProfilePage() {
  const { profile, progress, preferences, t } = useApp();
  const level = treeLevels[getTreeLevel(progress.points)];
  return (
    <AppShell>
      <PageHeading
        eyebrow={t("SENING KICHIK BILIM OLAMING", "ТВОЙ МАЛЕНЬКИЙ МИР ЗНАНИЙ")}
        title={t("Mening profilim", "Мой профиль")}
      />
      <section className="profile-hero">
        <span className="profile-avatar">
          <Mascot />
        </span>
        <div>
          <span className="eyebrow">
            {t("KICHIK KITOBXON", "МАЛЕНЬКИЙ ЧИТАТЕЛЬ")}
          </span>
          <h2>{profile.name}</h2>
          <div className="profile-tags">
            <span>
              {profile.age} {t("yosh", "лет")}
            </span>
            <span>
              {level.icon} {t(level.name, level.ru)}
            </span>
          </div>
          <p>
            {t(
              "Kitoblar bilan o‘sayotgan kichik qahramon!",
              "Маленький герой, который растёт вместе с книгами!",
            )}
          </p>
        </div>
        <Link className="edit-profile" href="/child-setup?edit=1">
          <Pencil size={17} />
          {t("Tahrirlash", "Изменить")}
        </Link>
      </section>
      <Stats />
      <div className="profile-counts">
        <section>
          <span className="icon-bubble blue">
            <Icon name="book" size={31} />
          </span>
          <div>
            <strong>{progress.completedBooks.length}</strong>
            <span>{t("O‘qib bo‘lingan kitoblar", "Прочитанных книг")}</span>
          </div>
        </section>
        <section>
          <span className="icon-bubble peach">
            <Icon name="brain" size={31} />
          </span>
          <div>
            <strong>{Object.keys(progress.quizScores).length}</strong>
            <span>{t("Yakunlangan quizlar", "Пройденных викторин")}</span>
          </div>
        </section>
      </div>
      <div className="profile-history">
        <section className="history-card">
          <h2>
            <Icon name="book" size={23} />
            {t("O‘qigan kitoblarim", "Мои прочитанные книги")}
          </h2>
          {progress.completedBooks.map((id) => {
            const b = books.find((b) => b.id === id);
            return b ? (
              <Link className="history-item" href={"/library/" + id} key={id}>
                <span className={"icon-bubble " + b.color}>
                  <Icon name={b.icon} size={24} />
                </span>
                <div>
                  <strong>{b.title[preferences.language]}</strong>
                  <small>
                    {b.age} {t("yosh", "лет")}
                  </small>
                </div>
                <Check size={19} />
              </Link>
            ) : null;
          })}
          {!progress.completedBooks.length && (
            <p className="history-empty">
              {t(
                "Birinchi kitobing shu yerda bo‘ladi.",
                "Твоя первая книга появится здесь.",
              )}
            </p>
          )}
          <Link className="text-button" href="/library">
            {t("Yangi kitob tanlash", "Выбрать новую книгу")}
          </Link>
        </section>
        <section className="history-card">
          <h2>
            <Icon name="brain" size={23} />
            {t("Quiz natijalarim", "Мои результаты викторин")}
          </h2>
          {Object.entries(progress.quizScores).map(([id, score]) => (
            <Link className="history-item" href={"/quizzes/" + id} key={id}>
              <span className="icon-bubble mint">
                <Icon name="trophy" size={24} />
              </span>
              <div>
                <strong>{quizzes.find((q) => q.id === id)?.name}</strong>
                <small>
                  {score / 2} / 5 {t("to‘g‘ri javob", "верных ответов")}
                </small>
              </div>
              <span className="history-score">{score}/10</span>
            </Link>
          ))}
          {!Object.keys(progress.quizScores).length && (
            <div className="quiz-history-empty">
              <span className="icon-bubble peach">
                <Icon name="brain" size={32} />
              </span>
              <p>
                {t(
                  "Birinchi bilimingni sinab ko‘ramizmi?",
                  "Проверим твои знания впервые?",
                )}
              </p>
              <PrimaryButton href="/quizzes">
                {t("Quiz tanlash", "Выбрать викторину")}
              </PrimaryButton>
            </div>
          )}
        </section>
      </div>
      <section className="history-card nature-profile-history">
        <h2>
          <Icon name="leaf" size={23} />
          {t("Tabiatdagi yutuqlarim", "Мои достижения в природе")}
        </h2>
        {progress.completedGames.map((id) => {
          const game = natureGames.find((game) => game.id === id);
          return game ? (
            <Link className="history-item" href={`/nature/${id}`} key={id}>
              <span className="icon-bubble mint">
                <Icon name="leaf" size={24} />
              </span>
              <div>
                <strong>{game.title[preferences.language]}</strong>
                <small>
                  {t("Tabiatning kichik do‘sti", "Маленький друг природы")}
                </small>
              </div>
              <Check size={19} />
            </Link>
          ) : null;
        })}
        {!progress.completedGames.length && (
          <p className="history-empty">
            {t(
              "Birinchi tabiat o‘yiningni birga o‘ynaymizmi?",
              "Сыграем в твою первую игру о природе?",
            )}
          </p>
        )}
        <Link className="text-button" href="/nature">
          {t("Tabiat o‘yinlariga o‘tish", "К играм о природе")}
        </Link>
      </section>
    </AppShell>
  );
}
