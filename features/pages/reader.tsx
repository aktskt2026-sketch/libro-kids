"use client";
import { useState } from "react";
import Link from "@/components/app-link";
import { ArrowLeft, ArrowRight, Check, Star } from "lucide-react";
import { AppShell } from "@/layouts/app-shell";
import {
  PageHeading,
  Icon,
  PrimaryButton,
  ProgressBar,
} from "@/components/common";
import { useApp } from "@/hooks/use-app";
import { books, categoryNames } from "@/data/books";
import { StoryIllustration } from "@/components/world-illustration";
import { POINT_REWARDS } from "@/data/point-rules";
import { dateKey } from "@/lib/progress";
export function ReaderPage({ bookId }: { bookId: string }) {
  const { preferences, progress, completeBook, ready, t } = useApp();
  const [page, setPage] = useState(0),
    [finished, setFinished] = useState(false);
  const [earned, setEarned] = useState({ book: 0, daily: 0 });
  const book = books.find((b) => b.id === bookId);
  if (!book)
    return (
      <AppShell>
        <PageHeading title={t("Kitob topilmadi", "Книга не найдена")} />
        <PrimaryButton href="/library">
          {t("Kutubxonaga qaytish", "В библиотеку")}
        </PrimaryButton>
      </AppShell>
    );
  const completed = progress.completedBooks.includes(book.id);
  function finish() {
    if (book && ready) {
      const goalDone = progress.dailyGoalDates.includes(dateKey(new Date()));
      setEarned({
        book: completed ? 0 : book.reward,
        daily: goalDone ? 0 : POINT_REWARDS.dailyGoal,
      });
      completeBook(book.id, book.reward);
      setFinished(true);
    }
  }
  return (
    <AppShell>
      <PageHeading
        back="/library"
        eyebrow={
          categoryNames[book.category][preferences.language] +
          " · " +
          book.age +
          " " +
          t("yosh", "лет")
        }
        title={book.title[preferences.language]}
      />
      {finished ? (
        <section className="result-card">
          <span className="result-trophy">
            <Icon name="trophy" size={64} />
          </span>
          <h2>{t("Barakalla, kitobxon!", "Молодец, читатель!")}</h2>
          <p>
            {t(
              "Yana bir sarguzashtni oxirigacha o‘qiding. Bilim daraxting sen bilan o‘smoqda!",
              "Ты прочитал ещё одно приключение. Дерево знаний растёт вместе с тобой!",
            )}
          </p>
          <div className="earned-points">
            <Check size={22} />
            {earned.book + earned.daily > 0
              ? `+${earned.book + earned.daily} ${t("ball qo‘shildi", "баллов начислено")}`
              : t("Kitob yakunlandi", "Книга прочитана")}
          </div>
          <p className="reading-reward-breakdown">
            {earned.daily > 0
              ? t(
                  `Kunlik maqsad +${earned.daily}${earned.book ? ` · Kitob +${earned.book}` : ""}`,
                  `Ежедневная цель +${earned.daily}${earned.book ? ` · Книга +${earned.book}` : ""}`,
                )
              : earned.book
                ? t("Yangi kitob uchun mukofot", "Награда за новую книгу")
                : t(
                    "Bu kitob va bugungi maqsad avval bajarilgan",
                    "Книга и сегодняшняя цель уже завершены",
                  )}
          </p>
          <PrimaryButton href="/rewards">
            {t("Daraxtimni ko‘rish", "Посмотреть дерево")}
          </PrimaryButton>
          <Link href="/library" className="text-button">
            {t("Yana bir kitob tanlash", "Выбрать ещё книгу")}
          </Link>
        </section>
      ) : (
        <section className="reader-card">
          <div className="reader-top">
            <span className="reader-page-label">
              {t("Sahifa", "Страница")} {page + 1} / {book.pages.length}
            </span>
            <span className="book-reward">
              <Star size={17} />
              {completed
                ? t("Ball olingan", "Баллы получены")
                : "+" + book.reward + " " + t("ball", "баллов")}
            </span>
          </div>
          <ProgressBar
            value={((page + 1) / book.pages.length) * 100}
            label={t("O‘qish jarayoni", "Прогресс чтения")}
          />
          <div className={"reader-symbol illustrated-reader " + book.color}>
            <StoryIllustration bookId={book.id} />
          </div>
          <p className="story-text">{book.pages[page][preferences.language]}</p>
          <div className="reader-navigation">
            <button
              className="secondary-button"
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 0}
            >
              <ArrowLeft size={18} />
              {t("Oldingi", "Назад")}
            </button>
            {page < book.pages.length - 1 ? (
              <PrimaryButton onClick={() => setPage((p) => p + 1)}>
                {t("Keyingi sahifa", "Следующая страница")}
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={finish} disabled={!ready}>
                {t("O‘qib bo‘ldim!", "Я прочитал!")}
              </PrimaryButton>
            )}
          </div>
        </section>
      )}
      <div className="reader-footnote">
        {t(
          "Shoshilma. Har bir sahifadan zavq ol!",
          "Не спеши. Наслаждайся каждой страницей!",
        )}
      </div>
    </AppShell>
  );
}
