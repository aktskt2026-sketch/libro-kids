"use client";
import Link from "next/link";
import { Check, Clock, Star, ArrowRight } from "lucide-react";
import { useApp } from "@/hooks/use-app";
import { Icon } from "@/components/common";
import { categoryNames } from "@/data/books";
import type { Book } from "@/types";
export function BookCard({ book }: { book: Book }) {
  const { preferences, progress, t } = useApp();
  const done = progress.completedBooks.includes(book.id);
  return (
    <article className="book-card">
      <Link
        href={"/library/" + book.id}
        className={"book-cover " + book.color}
        aria-label={book.title[preferences.language]}
      >
        <span className="cover-meta">
          LIBRO-KIDS · {categoryNames[book.category][preferences.language]}
        </span>
        <span className="cover-icon">
          <Icon name={book.icon} size={60} />
        </span>
        <strong>{book.title[preferences.language]}</strong>
        <span className="cover-subtitle">
          {book.subtitle[preferences.language]}
        </span>
        {done && (
          <span className="read-badge">
            <Check size={13} />
            {t("O‘qilgan", "Прочитано")}
          </span>
        )}
      </Link>
      <div className="book-details">
        <span className="book-category">
          {categoryNames[book.category][preferences.language]} · {book.age}{" "}
          {t("yosh", "лет")}
        </span>
        <h3>{book.title[preferences.language]}</h3>
        <div className="book-meta">
          <span>
            <Clock size={14} />
            {book.minutes} {t("daq", "мин")}
          </span>
          <span className="book-reward">
            <Star size={14} />+{book.reward} {t("ball", "баллов")}
          </span>
        </div>
        <Link href={"/library/" + book.id} className="read-button">
          {done
            ? t("Yana o‘qish", "Прочитать ещё")
            : t("O‘qishni boshlash", "Начать читать")}
          <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
