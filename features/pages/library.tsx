"use client";
import { useState } from "react";
import { useLibraryTools } from "@/hooks/use-library-tools";
import { Search, X } from "lucide-react";
import { AppShell } from "@/layouts/app-shell";
import { PageHeading, Icon } from "@/components/common";
import { BookCard } from "@/components/book-card";
import { useApp } from "@/hooks/use-app";
import { books, categories, categoryNames } from "@/data/books";
const normalize = (s: string) => s.toLocaleLowerCase().replace(/[‘’ʻʼ']/g, "");
export function LibraryPage() {
  const { preferences, t } = useApp();
  const [query, setQuery] = useState(""),
    [age, setAge] = useState("all"),
    [category, setCategory] = useState("all");
  useLibraryTools(preferences.language, setQuery, setAge, setCategory);
  const filtered = books.filter(
    (b) =>
      (age === "all" || b.age === age) &&
      (category === "all" || b.category === category) &&
      normalize(
        b.title[preferences.language] + " " + b.subtitle[preferences.language],
      ).includes(normalize(query.trim())),
  );
  return (
    <AppShell>
      <PageHeading
        eyebrow={t("HAR SAHIFADA YANGI OLAM", "НОВЫЙ МИР НА КАЖДОЙ СТРАНИЦЕ")}
        title={t(
          "Kichik kitobxonlar kutubxonasi",
          "Библиотека маленького читателя",
        )}
        description={t(
          "Ertaklar, kitoblar va multfilmlar seni kutmoqda.",
          "Тебя ждут сказки, книги и мультфильмы.",
        )}
      />
      <section className="library-controls">
        <div className="search-box">
          <Search size={22} />
          <input
            type="search"
            aria-label={t("Kitob qidirish", "Поиск книг")}
            placeholder={t(
              "Qaysi kitobni izlayapsan?",
              "Какую книгу ты ищешь?",
            )}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label={t("Qidiruvni tozalash", "Очистить поиск")}
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div className="filter-row">
          <span>{t("Yoshing uchun:", "Для твоего возраста:")}</span>
          <div
            className="filter-chips"
            aria-label={t("Yosh bo‘yicha filtr", "Фильтр по возрасту")}
          >
            {["all", "6–7", "7–8", "8–9", "9–10"].map((v) => (
              <button
                className={age === v ? "selected" : ""}
                aria-pressed={age === v}
                key={v}
                onClick={() => setAge(v)}
              >
                {v === "all"
                  ? t("Barchasi", "Все")
                  : v + " " + t("yosh", "лет")}
              </button>
            ))}
          </div>
        </div>
        <div className="category-chips">
          {["all", ...categories].map((v) => (
            <button
              className={category === v ? "selected" : ""}
              key={v}
              onClick={() => setCategory(v)}
              aria-pressed={category === v}
            >
              {v === "all"
                ? t("Barcha kitoblar", "Все книги")
                : categoryNames[v as keyof typeof categoryNames][
                    preferences.language
                  ]}
            </button>
          ))}
        </div>
      </section>
      <div className="library-result-heading">
        <h2>
          {query
            ? t("Qidiruv natijalari", "Результаты поиска")
            : t("Sening yangi sarguzashting", "Твоё новое приключение")}
        </h2>
        <span aria-live="polite">
          {filtered.length} {t("ta ertak va kitob", "историй")}
        </span>
      </div>
      {filtered.length ? (
        <div className="book-grid">
          {filtered.map((b) => (
            <BookCard book={b} key={b.id} />
          ))}
        </div>
      ) : (
        <section className="empty-state">
          <span className="icon-bubble blue">
            <Icon name="book" size={32} />
          </span>
          <h2>{t("Bu kitob hali topilmadi", "Книга пока не найдена")}</h2>
          <p>
            {t(
              "Boshqa so‘z bilan qidirib ko‘r yoki filtrlarni o‘zgartir.",
              "Попробуй другое слово или измени фильтры.",
            )}
          </p>
          <button
            className="primary-button"
            onClick={() => {
              setQuery("");
              setAge("all");
              setCategory("all");
            }}
          >
            {t("Barcha kitoblarni ko‘rish", "Показать все книги")}
          </button>
        </section>
      )}
    </AppShell>
  );
}
