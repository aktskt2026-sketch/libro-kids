"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { navigate } from "@/lib/navigation";
import Link from "@/components/app-link";
import { UserRound } from "lucide-react";
import { OnboardingShell } from "@/layouts/onboarding-shell";
import { Mascot, PrimaryButton } from "@/components/common";
import { useApp } from "@/hooks/use-app";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FamilyAuthShell } from "@/layouts/family-auth-shell";
import type { ChildProfile, Language } from "@/types";
export function WelcomePage() {
  const { t } = useApp();
  return (
    <OnboardingShell step={1}>
      <section className="welcome-screen">
        <div className="welcome-brand">
          <span className="eyebrow">
            {t("KITOBLAR VA MO‘JIZALAR OLAMI", "МИР КНИГ И ЧУДЕС")}
          </span>
          <h1>
            Libro<span>-Kids</span>
          </h1>
          <p>{t("Bilim bilan o‘sing!", "Расти вместе со знаниями!")}</p>
        </div>
        <div className="welcome-art">
          <div className="welcome-speech">
            👋{" "}
            {t(
              "Assalomu alaykum, mening ismim Bilbiljon.",
              "Привет! Меня зовут Билбильджон.",
            )}
            <small>
              {t(
                "Birga yangi olamlarni kashf etamiz!",
                "Будем открывать новые миры вместе!",
              )}
            </small>
          </div>
          <span className="welcome-star ws-one">✦</span>
          <span className="welcome-star ws-two">✧</span>
          <Mascot />
        </div>
        <PrimaryButton href="/language" className="wide">
          {t("Boshlash", "Начать")}
        </PrimaryButton>
        <span className="welcome-note">
          {t(
            "Har bir sahifa — yangi sarguzasht",
            "Каждая страница — новое приключение",
          )}
        </span>
      </section>
    </OnboardingShell>
  );
}
export function LanguagePage() {
  const { preferences, setLanguage, t, ready } = useApp();
  const [selected, setSelected] = useState<Language>(preferences.language);
  useEffect(() => {
    if (ready) setSelected(preferences.language);
  }, [ready, preferences.language]);
  return (
    <OnboardingShell step={2} back="/welcome">
      <section className="onboard-card language-card">
        <span className="onboard-emoji">🌍</span>
        <h1>Tilni tanlang</h1>
        <p>Выберите язык</p>
        <RadioGroup
          value={selected}
          onValueChange={(v) => setSelected(v as Language)}
          aria-label="Til / Язык"
          className="language-options"
        >
          {[
            {
              id: "uz",
              code: "UZ",
              name: "O‘zbekcha",
              sub: "Salom, kitob do‘stim!",
              flag: "🇺🇿",
            },
            {
              id: "ru",
              code: "RU",
              name: "Русский",
              sub: "Привет, книжный друг!",
              flag: "🇷🇺",
            },
          ].map((l) => (
            <label
              className={
                "language-option " + (selected === l.id ? "selected" : "")
              }
              htmlFor={"lang-" + l.id}
              key={l.id}
            >
              <span className="language-code">{l.code}</span>
              <span>
                <strong>{l.name}</strong>
                <small>{l.sub}</small>
              </span>
              <RadioGroupItem id={"lang-" + l.id} value={l.id} />
            </label>
          ))}
        </RadioGroup>
        <PrimaryButton
          className="wide"
          onClick={() => {
            navigate("/register", () => setLanguage(selected));
          }}
        >
          {selected === "uz" ? "Davom etish" : "Продолжить"}
        </PrimaryButton>
        <div className="onboard-hint">
          {t(
            "Tilni keyin sozlamalarda o‘zgartirish mumkin",
            "Язык можно изменить позже в настройках",
          )}
        </div>
      </section>
    </OnboardingShell>
  );
}
export function ChildSetupPage() {
  const { profile, updateProfile, t, ready } = useApp();
  const [name, setName] = useState(
    profile.name === "Azizbek" ? "" : profile.name,
  );
  const [age, setAge] = useState(profile.age);
  const [gender, setGender] = useState<ChildProfile["gender"]>(profile.gender);
  const search = useSearchParams();
  const edit = search?.get("edit") === "1";
  const initialized = useRef(false);
  useEffect(() => {
    if (ready && !initialized.current) {
      initialized.current = true;
      setName(edit || profile.name !== "Azizbek" ? profile.name : "");
      setAge(profile.age);
      setGender(profile.gender);
    }
  }, [ready, edit, profile]);
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    navigate(edit ? "/profile" : "/account/ready", () =>
      updateProfile({ name: name.trim(), age, gender }),
    );
  }
  return (
    <FamilyAuthShell stage={edit ? undefined : 2}>
      <span className="family-form-icon">
        <UserRound size={26} />
      </span>
      <div className="family-child-form">
        <h1>
          {edit
            ? t("Profilni tahrirlash", "Изменить профиль")
            : t("Kichik kitobxon profili", "Профиль маленького читателя")}
        </h1>
        <p className="family-form-description">
          {t(
            "Sarguzashtimiz sen bilan boshlanadi!",
            "Наше приключение начинается с тебя!",
          )}
        </p>
        <form onSubmit={submit}>
          <label className="field-label" htmlFor="child-name">
            {t("Ismingiz", "Имя")}
          </label>
          <input
            className="text-input"
            id="child-name"
            placeholder={t("Ismingizni yozing", "Напишите имя")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={24}
            autoComplete="given-name"
          />
          <span className="field-label">{t("Yosh tanlash", "Возраст")}</span>
          <RadioGroup
            value={age}
            onValueChange={setAge}
            className="choice-row"
            aria-label={t("Yosh", "Возраст")}
          >
            {["3–6", "6–9"].map((v) => (
              <label
                htmlFor={"age-" + v}
                key={v}
                className={"choice-card " + (age === v ? "selected" : "")}
              >
                <RadioGroupItem id={"age-" + v} value={v} />
                <span>
                  {v} {t("yosh", "лет")}
                </span>
              </label>
            ))}
          </RadioGroup>
          <span className="field-label">{t("Jins tanlash", "Пол")}</span>
          <RadioGroup
            value={gender}
            onValueChange={(v) => setGender(v as ChildProfile["gender"])}
            className="choice-row"
            aria-label={t("Jins", "Пол")}
          >
            {[
              { v: "boy", label: t("O‘g‘il bola", "Мальчик"), emoji: "👦" },
              { v: "girl", label: t("Qiz bola", "Девочка"), emoji: "👧" },
            ].map((g) => (
              <label
                htmlFor={"gender-" + g.v}
                key={g.v}
                className={"choice-card " + (gender === g.v ? "selected" : "")}
              >
                <RadioGroupItem id={"gender-" + g.v} value={g.v} />
                <span>
                  {g.emoji} {g.label}
                </span>
              </label>
            ))}
          </RadioGroup>
          <PrimaryButton
            className="wide"
            type="submit"
            disabled={!ready || !name.trim()}
          >
            {edit ? t("Saqlash", "Сохранить") : t("Davom etish", "Продолжить")}
          </PrimaryButton>
        </form>
      </div>
      <Link
        href={edit ? "/settings" : "/register"}
        className="family-profile-link"
      >
        {t("Orqaga qaytish", "Назад")}
      </Link>
    </FamilyAuthShell>
  );
}
