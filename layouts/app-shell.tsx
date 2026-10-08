"use client";
import Link from "@/components/app-link";
import { usePathname } from "next/navigation";
import { ChevronDown, Bell, Users, UserPlus } from "lucide-react";
import { useApp } from "@/hooks/use-app";
import { Logo, Icon } from "@/components/common";
import type { ReactNode } from "react";
const nav = [
  { href: "/home", uz: "Bosh sahifa", ru: "Главная", icon: "home" },
  { href: "/library", uz: "Kutubxona", ru: "Библиотека", icon: "book" },
  { href: "/rewards", uz: "Mukofotlar", ru: "Награды", icon: "trophy" },
  { href: "/profile", uz: "Profil", ru: "Профиль", icon: "user" },
  { href: "/settings", uz: "Sozlamalar", ru: "Настройки", icon: "settings" },
];
export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname() ?? "/";
  const { profile, preferences, parentEmail, setLanguage, t } = useApp();
  return (
    <>
      <header className="site-header">
        <Logo />
        <nav
          className="top-nav"
          aria-label={t("Asosiy navigatsiya", "Основная навигация")}
        >
          <Link
            className={path === "/home" || path === "/" ? "active" : ""}
            href="/home"
          >
            {t("Bosh sahifa", "Главная")}
          </Link>
          <Link
            className={path.startsWith("/library") ? "active" : ""}
            href="/library"
          >
            {t("Kutubxona", "Библиотека")}
          </Link>
          <Link
            className={path.startsWith("/quizzes") ? "active" : ""}
            href="/quizzes"
          >
            {t("Quizlar", "Викторины")}
          </Link>
        </nav>
        <div className="header-actions">
          <Link
            href={parentEmail ? "/account" : "/register"}
            className="header-account-entry"
            aria-label={
              parentEmail
                ? t("Oila hisobi", "Семейный аккаунт")
                : t("Ro‘yxatdan o‘tish", "Регистрация")
            }
          >
            {parentEmail ? <Users size={18} /> : <UserPlus size={18} />}
            <span>
              {parentEmail
                ? t("Oila hisobi", "Аккаунт семьи")
                : t("Ro‘yxatdan o‘tish", "Регистрация")}
            </span>
          </Link>
          <button
            className="language-pill"
            onClick={() =>
              setLanguage(preferences.language === "uz" ? "ru" : "uz")
            }
            aria-label={t("Tilni almashtirish", "Сменить язык")}
          >
            <span>{preferences.language === "uz" ? "🇺🇿" : "🇷🇺"}</span>
            {preferences.language.toUpperCase()}
            <ChevronDown size={14} />
          </button>
          <Link
            href="/settings"
            className="icon-button notification"
            aria-label={t("Bildirishnomalar", "Уведомления")}
          >
            <Bell size={21} />
          </Link>
          <Link
            className="avatar-mini"
            href="/profile"
            aria-label={profile.name}
          >
            {profile.name.charAt(0)}
          </Link>
        </div>
      </header>
      <main className="app-main">{children}</main>
      <nav className="bottom-nav" aria-label={t("Sahifalar", "Страницы")}>
        {nav.map((n) => (
          <Link
            href={n.href}
            key={n.href}
            className={
              path.startsWith(n.href) || (n.href === "/home" && path === "/")
                ? "active"
                : ""
            }
            aria-current={path.startsWith(n.href) ? "page" : undefined}
          >
            <Icon name={n.icon} size={23} />
            <span>{t(n.uz, n.ru)}</span>
          </Link>
        ))}
      </nav>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
    </>
  );
}
