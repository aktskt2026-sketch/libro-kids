"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronRight,
  LogOut,
  Mail,
  UserRound,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/layouts/app-shell";
import { PageHeading, Icon, FriendlyModal } from "@/components/common";
import { useApp } from "@/hooks/use-app";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { comingSoon } from "@/data/coming-soon";
export function SettingsPage() {
  const {
    profile,
    preferences,
    parentEmail,
    setLanguage,
    toggleNotifications,
    logout,
    t,
  } = useApp();
  const [modal, setModal] = useState<string | null>(null);
  const router = useRouter();
  return (
    <AppShell>
      <PageHeading
        eyebrow={t("HAMMASI O‘ZINGGA QULAY BO‘LSIN", "ПУСТЬ ВСЁ БУДЕТ УДОБНО")}
        title={t("Sozlamalar", "Настройки")}
        description={t(
          "Oilangiz uchun qulay kichik bilim olami.",
          "Уютный маленький мир знаний для вашей семьи.",
        )}
      />
      <div className="settings-grid">
        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="icon-bubble green">
              <Globe size={25} />
            </span>
            <div>
              <h2>{t("Ilova tili", "Язык приложения")}</h2>
              <p>
                {t("O‘zingizga qulay tilni tanlang", "Выберите удобный язык")}
              </p>
            </div>
          </div>
          <RadioGroup
            value={preferences.language}
            onValueChange={(v) => setLanguage(v as "uz" | "ru")}
            className="settings-languages"
            aria-label={t("Ilova tili", "Язык приложения")}
          >
            {[
              { id: "uz", name: "O‘zbekcha", emoji: "🇺🇿" },
              { id: "ru", name: "Русский", emoji: "🇷🇺" },
            ].map((l) => (
              <label
                className={
                  "settings-language " +
                  (preferences.language === l.id ? "selected" : "")
                }
                htmlFor={"setting-lang-" + l.id}
                key={l.id}
              >
                <span>{l.emoji}</span>
                <strong>{l.name}</strong>
                <RadioGroupItem value={l.id} id={"setting-lang-" + l.id} />
              </label>
            ))}
          </RadioGroup>
          <div className="notification-row">
            <span className="icon-bubble yellow">
              <Bell size={23} />
            </span>
            <label htmlFor="notifications">
              <strong>{t("Bildirishnomalar", "Уведомления")}</strong>
              <small>
                {t("Kitob o‘qish uchun eslatmalar", "Напоминания о чтении")}
              </small>
            </label>
            <Switch
              id="notifications"
              className="notification-switch"
              checked={preferences.notifications}
              onCheckedChange={toggleNotifications}
            />
          </div>
          <p className="setting-footnote">
            {t(
              "Bu tanlov shu qurilmada saqlanadi. Eslatmalar tez kunda ishga tushadi.",
              "Этот выбор сохранится на устройстве. Напоминания появятся скоро.",
            )}
          </p>
        </section>
        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="icon-bubble peach">
              <ShieldCheck size={25} />
            </span>
            <div>
              <h2>{t("Oila hisobi", "Семейный аккаунт")}</h2>
              <p>
                {t(
                  "Profil va hisobni boshqarish",
                  "Управление профилем и аккаунтом",
                )}
              </p>
            </div>
          </div>
          <Link className="setting-link" href="/account">
            <Mail size={22} />
            <div>
              <strong>{t("Ota-ona hisobi", "Аккаунт родителя")}</strong>
              <small>{parentEmail || t("Sinov hisobi", "Демо-аккаунт")}</small>
            </div>
            <ChevronRight size={19} />
          </Link>
          <Link className="setting-link" href="/child-setup?edit=1">
            <UserRound size={22} />
            <div>
              <strong>{t("Farzand profili", "Профиль ребёнка")}</strong>
              <small>
                {profile.name} · {profile.age} {t("yosh", "лет")}
              </small>
            </div>
            <ChevronRight size={19} />
          </Link>
          <Link className="setting-link" href="/welcome">
            <Icon name="sparkles" size={22} />
            <div>
              <strong>
                {t("Bilbiljon bilan tanishuv", "Знакомство с Билбильджоном")}
              </strong>
              <small>
                {t(
                  "Boshlang‘ich sahifalarni ko‘rish",
                  "Посмотреть первые экраны",
                )}
              </small>
            </div>
            <ChevronRight size={19} />
          </Link>
          <button
            className="logout-button"
            onClick={() => {
              logout();
              router.push("/welcome");
            }}
          >
            <LogOut size={19} />
            {t("Sinov hisobidan chiqish", "Выйти из демо-аккаунта")}
          </button>
        </section>
      </div>
      <section id="coming-soon" className="coming-soon-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              {t("YANGI MO‘JIZALAR YO‘LDA", "НОВЫЕ ЧУДЕСА УЖЕ В ПУТИ")}
            </span>
            <h2>
              {t(
                "Yana ko‘p sarguzashtlar kutmoqda!",
                "Впереди ещё много приключений!",
              )}
            </h2>
            <p>
              {t(
                "Bilbiljon siz uchun yangi imkoniyatlar tayyorlamoqda.",
                "Билбильджон готовит для вас новые возможности.",
              )}
            </p>
          </div>
          <Icon name="sparkles" size={27} />
        </div>
        <div className="coming-grid">
          {comingSoon.map((f) => (
            <button
              className={"coming-card " + f.color}
              key={f.uz}
              onClick={() => setModal(t(f.uz, f.ru))}
            >
              <span className="feature-icon">
                <Icon name={f.icon} size={28} />
              </span>
              <span>
                <strong>{t(f.uz, f.ru)}</strong>
                <small>
                  {preferences.language === "uz" ? f.sub : t(f.uz, f.ru)}
                </small>
              </span>
              <span className="soon-badge">{t("Tez kunda", "Скоро")}</span>
            </button>
          ))}
        </div>
      </section>
      <FriendlyModal kind={modal} onClose={() => setModal(null)} />
      <footer className="page-footer">
        Libro-Kids · {t("Bilim bilan o‘sing!", "Расти вместе со знаниями!")} ·
        v1.0
      </footer>
    </AppShell>
  );
}
