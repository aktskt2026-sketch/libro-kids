"use client";
import { AppShell } from "@/layouts/app-shell";
import { PageHeading, PrimaryButton, Mascot } from "@/components/common";
import { useApp } from "@/hooks/use-app";
export default function NotFound() {
  const { t } = useApp();
  return (
    <AppShell>
      <section className="empty-state">
        <Mascot className="not-found-mascot" />
        <PageHeading
          title={t("Bu sahifa adashib qolibdi!", "Эта страница потерялась!")}
          description={t(
            "Bilbiljon seni bosh sahifaga qaytaradi.",
            "Билбильджон вернёт тебя на главную.",
          )}
        />
        <PrimaryButton href="/home">
          {t("Bosh sahifaga", "На главную")}
        </PrimaryButton>
      </section>
    </AppShell>
  );
}
