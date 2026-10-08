"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import { OnboardingShell } from "@/layouts/onboarding-shell";
import { Mascot, PrimaryButton } from "@/components/common";
import { useApp } from "@/hooks/use-app";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const router = useRouter();
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
            setLanguage(selected);
            router.push("/account");
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
export function AccountPage() {
  const { setEmail, t } = useApp();
  const [mode, setMode] = useState("register");
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  function submit(e: FormEvent) {
    e.preventDefault();
    setEmail(email.trim());
    setPassword("");
    router.push(mode === "login" ? "/home" : "/child-setup");
  }
  return (
    <OnboardingShell step={3} back="/language">
      <div className="helper-bubble">
        {t(
          "Bu sizning hisobingiz — farzandingizning profili va yutuqlarini boshqarish uchun.",
          "Это ваш аккаунт — для управления профилем и достижениями ребёнка.",
        )}
      </div>
      <section className="onboard-card account-card">
        <span className="icon-bubble green">
          <ShieldCheck size={28} />
        </span>
        <h1>{t("Ota-ona hisobi", "Аккаунт родителя")}</h1>
        <p>
          {t(
            "Farzandingizning bilim olamiga ilk qadam",
            "Первый шаг в мир знаний вашего ребёнка",
          )}
        </p>
        <Tabs value={mode} onValueChange={setMode}>
          <TabsList className="account-tabs">
            <TabsTrigger value="register">
              {t("Ro‘yxatdan o‘tish", "Регистрация")}
            </TabsTrigger>
            <TabsTrigger value="login">{t("Kirish", "Вход")}</TabsTrigger>
          </TabsList>
        </Tabs>
        <form onSubmit={submit}>
          <label className="field-label" htmlFor="email">
            Email
          </label>
          <div className="input-wrap">
            <Mail size={19} />
            <input
              id="email"
              type="email"
              placeholder="siz@example.com"
              required
              value={email}
              onChange={(e) => setLocalEmail(e.target.value)}
              autoComplete="email"
              maxLength={150}
            />
          </div>
          <label className="field-label" htmlFor="password">
            {t("Parol", "Пароль")}
          </label>
          <div className="input-wrap">
            <LockKeyhole size={19} />
            <input
              id="password"
              type={show ? "text" : "password"}
              placeholder={t("Kamida 6 ta belgi", "Минимум 6 символов")}
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={
                show
                  ? t("Parolni yashirish", "Скрыть пароль")
                  : t("Parolni ko‘rsatish", "Показать пароль")
              }
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="demo-notice">
            {t(
              "Sinov rejimi: namuna email va paroldan foydalaning. Haqiqiy hisob yaratilmaydi.",
              "Демо: используйте вымышленные email и пароль. Настоящий аккаунт не создаётся.",
            )}
          </div>
          <PrimaryButton className="wide" type="submit">
            {mode === "register"
              ? t("Ro‘yxatdan o‘tish", "Зарегистрироваться")
              : t("Kirish", "Войти")}
          </PrimaryButton>
        </form>
        <button
          className="text-button"
          onClick={() => setMode(mode === "register" ? "login" : "register")}
        >
          {mode === "register"
            ? t("Hisobingiz bormi? Kirish", "Уже есть аккаунт? Войти")
            : t("Yangi hisob yaratish", "Создать аккаунт")}
        </button>
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
  const router = useRouter();
  const search = useSearchParams();
  const edit = search?.get("edit") === "1";
  useEffect(() => {
    if (ready && edit) {
      setName(profile.name);
      setAge(profile.age);
      setGender(profile.gender);
    }
  }, [ready, edit, profile]);
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    updateProfile({ name: name.trim(), age, gender });
    router.push(edit ? "/profile" : "/home");
  }
  return (
    <OnboardingShell step={4} back={edit ? "/settings" : "/account"}>
      <div className="child-helper">
        <Mascot />
        <div className="helper-bubble">
          {t(
            "Men bilan tanishaylik! Ismingiz nima?",
            "Давай познакомимся! Как тебя зовут?",
          )}
        </div>
      </div>
      <section className="onboard-card child-card">
        <h1>
          {edit
            ? t("Profilni tahrirlash", "Изменить профиль")
            : t("Kichik kitobxon profili", "Профиль маленького читателя")}
        </h1>
        <p>
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
          <PrimaryButton className="wide" type="submit" disabled={!name.trim()}>
            {edit ? t("Saqlash", "Сохранить") : t("Davom etish", "Продолжить")}
          </PrimaryButton>
        </form>
      </section>
    </OnboardingShell>
  );
}
