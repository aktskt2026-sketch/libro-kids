"use client";
import type { ReactNode } from "react";
import { ArrowLeft, Globe, Heart, BookOpen, Leaf } from "lucide-react";
import Link from "@/components/app-link";
import { Logo, Mascot } from "@/components/common";
import { useApp } from "@/hooks/use-app";

export function FamilyAuthShell({
  children,
  stage,
}: {
  children: ReactNode;
  stage?: number;
}) {
  const { preferences, setLanguage, t } = useApp();
  return (
    <div className="family-auth">
      <header className="family-auth-header">
        <Logo />
        <div>
          <button
            className="language-pill"
            aria-label={t("Tilni almashtirish", "Сменить язык")}
            onClick={() =>
              setLanguage(preferences.language === "uz" ? "ru" : "uz")
            }
          >
            <Globe size={16} />
            {preferences.language.toUpperCase()}
          </button>
          <Link href="/home" className="family-home-link">
            <ArrowLeft size={17} />
            {t("Bosh sahifa", "Главная")}
          </Link>
        </div>
      </header>
      <main className="family-auth-layout">
        <aside className="family-auth-world">
          <span className="family-kicker">
            {t("OILANGIZNING BILIM OLAMI", "МИР ЗНАНИЙ ВАШЕЙ СЕМЬИ")}
          </span>
          <h2>
            {t("Katta orzular", "Большие мечты")}
            <br />
            <span>
              {t("kichik qadamdan", "начинаются с")}
              <br />
              {t("boshlanadi!", "маленького шага!")}
            </span>
          </h2>
          <div className="family-mascot-scene">
            <span className="family-welcome-bubble">
              {t(
                "Salom! Oilangizni kutib olishdan xursandman!",
                "Привет! Я рад познакомиться с вашей семьёй!",
              )}{" "}
              <Heart size={14} fill="currentColor" />
            </span>
            <Mascot />
            <span className="family-scene-star" aria-hidden="true">
              ✦
            </span>
          </div>
          <div className="family-world-notes">
            <span>
              <BookOpen size={18} />
              {t("Birga o‘qiymiz", "Читаем вместе")}
            </span>
            <span>
              <Leaf size={18} />
              {t("Birga o‘samiz", "Растём вместе")}
            </span>
          </div>
        </aside>
        <div className="family-auth-content">
          {stage && (
            <ol
              className="family-auth-steps"
              aria-label={t(
                "Ro‘yxatdan o‘tish bosqichlari",
                "Шаги регистрации",
              )}
            >
              {[
                t("Ota-ona", "Родитель"),
                t("Farzand", "Ребёнок"),
                t("Tayyor", "Готово"),
              ].map((label, index) => (
                <li
                  key={index}
                  className={
                    index + 1 === stage
                      ? "current"
                      : index + 1 < stage
                        ? "done"
                        : ""
                  }
                  aria-current={index + 1 === stage ? "step" : undefined}
                >
                  <span>{index + 1}</span>
                  {label}
                </li>
              ))}
            </ol>
          )}
          <section className="family-auth-card">{children}</section>
          <p className="family-auth-footer">
            {t(
              "Libro-Kids — oilangiz bilan bilim sari",
              "Libro-Kids — к знаниям всей семьёй",
            )}
          </p>
        </div>
      </main>
    </div>
  );
}
