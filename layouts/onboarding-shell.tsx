"use client";
import Link from "@/components/app-link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/common";
import { useApp } from "@/hooks/use-app";
import type { ReactNode } from "react";
export function OnboardingShell({
  children,
  step,
  back,
}: {
  children: ReactNode;
  step: number;
  back?: string;
}) {
  const { t } = useApp();
  return (
    <div className="onboarding">
      <header className="onboarding-header">
        <Logo />
        <Link href="/home" className="demo-link">
          {t("Ilovani ko‘rish", "Посмотреть приложение")}
        </Link>
      </header>
      <main className="onboarding-main">
        {back && (
          <Link
            className="onboarding-back icon-button"
            href={back}
            aria-label={t("Orqaga", "Назад")}
          >
            <ArrowLeft size={21} />
          </Link>
        )}
        {children}
        <div
          className="step-dots"
          aria-label={t("Bosqich", "Шаг") + " " + step + " / 4"}
        >
          {[1, 2, 3, 4].map((s) => (
            <span
              className={s === step ? "active" : s < step ? "done" : ""}
              key={s}
            />
          ))}
        </div>
      </main>
      <footer className="onboarding-footer">
        <ShieldCheck size={17} />
        {t(
          "Mehr, bilim va xavfsiz sarguzashtlar",
          "Доброта, знания и безопасные приключения",
        )}
      </footer>
    </div>
  );
}
