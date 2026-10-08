"use client";
import {
  useEffect,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import {
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
  UserRound,
  Users,
  LogOut,
  Pencil,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "@/components/app-link";
import { PrimaryButton } from "@/components/common";
import { FamilyAuthShell } from "@/layouts/family-auth-shell";
import { useApp } from "@/hooks/use-app";
import { navigate } from "@/lib/navigation";

function AuthField({
  id,
  label,
  Icon,
  error,
  password = false,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  Icon: LucideIcon;
  error?: string;
  password?: boolean;
}) {
  const { t } = useApp();
  const [show, setShow] = useState(false);
  return (
    <div className="family-field">
      <label htmlFor={id}>{label}</label>
      <div className={`family-input ${error ? "has-error" : ""}`}>
        <Icon size={19} aria-hidden="true" />
        <input
          {...props}
          id={id}
          type={password ? (show ? "text" : "password") : props.type}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {password && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={`${show ? t("Yashirish", "Скрыть") : t("Ko‘rsatish", "Показать")}: ${label}`}
            aria-pressed={show}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="family-field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
function DemoNotice() {
  const { t } = useApp();
  return (
    <p className="family-demo-note">
      <ShieldCheck size={17} />
      {t(
        "Demo rejim: namuna ma’lumot kiriting. Haqiqiy hisob yaratilmaydi, parollar saqlanmaydi.",
        "Демо: введите вымышленные данные. Настоящий аккаунт не создаётся, пароли не сохраняются.",
      )}
    </p>
  );
}
function validEmail(value: string) {
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) &&
    value.trim().length <= 150
  );
}

export function ParentAuthPage({ mode }: { mode: "register" | "login" }) {
  const { ready, parentName, parentEmail, setParentAccount, t } = useApp();
  const register = mode === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [parent, setParent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (ready && !register) setEmail(parentEmail);
  }, [ready, parentEmail, register]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready || submitted) return;
    const next: Record<string, string> = {};
    if (register && name.trim().length < 2)
      next.name = t(
        "Ismingizni yozing (kamida 2 belgi).",
        "Введите имя (минимум 2 символа).",
      );
    if (!validEmail(email))
      next.email = t(
        "Emailni to‘liq yozing: ism@example.com",
        "Введите полный email: name@example.com",
      );
    if (password.length < 8 || !password.trim())
      next.password = t(
        "Parol kamida 8 belgidan iborat bo‘lsin.",
        "Пароль должен содержать минимум 8 символов.",
      );
    if (register && confirm !== password)
      next.confirm = t(
        "Parollar bir xil bo‘lishi kerak.",
        "Пароли должны совпадать.",
      );
    if (register && !parent)
      next.parent = t(
        "Ota-ona yoki qonuniy vakil ekaningizni belgilang.",
        "Подтвердите, что вы родитель или законный представитель.",
      );
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      event.currentTarget
        .querySelector<HTMLInputElement>(`#auth-${first}`)
        ?.focus();
      return;
    }
    setSubmitted(true);
    setPassword("");
    setConfirm("");
    navigate(register ? "/child-setup" : "/home", () =>
      setParentAccount(
        register
          ? name.trim()
          : email.trim().toLowerCase() === parentEmail.toLowerCase()
            ? parentName
            : "",
        email.trim().toLowerCase(),
      ),
    );
  }
  return (
    <FamilyAuthShell stage={register ? 1 : undefined}>
      <span className="family-form-icon">
        {register ? <Users size={25} /> : <LogIn size={25} />}
      </span>
      <h1>
        {register
          ? t("Oilangizga xush kelibsiz!", "Добро пожаловать, семья!")
          : t("Yana ko‘rishganimizdan xursandmiz!", "Рады видеть вас снова!")}
      </h1>
      <p className="family-form-description">
        {register
          ? t(
              "Ota-ona hisobini yarating, keyin farzandingiz bilan tanishamiz.",
              "Создайте аккаунт родителя, затем познакомимся с ребёнком.",
            )
          : t(
              "Ota-ona hisobiga kirib, sarguzashtni davom ettiring.",
              "Войдите в аккаунт родителя и продолжите приключение.",
            )}
      </p>
      <nav
        className="family-auth-tabs"
        aria-label={t("Hisob turi", "Действие с аккаунтом")}
      >
        <Link
          href="/register"
          aria-current={register ? "page" : undefined}
          className={register ? "active" : ""}
        >
          {t("Ro‘yxatdan o‘tish", "Регистрация")}
        </Link>
        <Link
          href="/login"
          aria-current={!register ? "page" : undefined}
          className={!register ? "active" : ""}
        >
          {t("Kirish", "Вход")}
        </Link>
      </nav>
      <form onSubmit={submit} noValidate>
        {register && (
          <AuthField
            id="auth-name"
            label={t("Ota-ona ismi", "Имя родителя")}
            Icon={UserRound}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder={t("Masalan, Dilnoza", "Например, Дильноза")}
            maxLength={70}
            required
            error={errors.name}
          />
        )}
        <AuthField
          id="auth-email"
          label={t("Elektron pochta", "Электронная почта")}
          Icon={Mail}
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="ism@example.com"
          maxLength={150}
          required
          error={errors.email}
        />
        <AuthField
          id="auth-password"
          label={t("Parol", "Пароль")}
          Icon={LockKeyhole}
          password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={register ? "new-password" : "current-password"}
          placeholder={t("Kamida 8 belgi", "Минимум 8 символов")}
          minLength={8}
          maxLength={100}
          required
          error={errors.password}
        />
        {register ? (
          <>
            <p
              className={`family-password-hint ${password.length >= 8 ? "met" : ""}`}
            >
              <Check size={14} />
              {t(
                "Kamida 8 belgidan foydalaning",
                "Используйте минимум 8 символов",
              )}
            </p>
            <AuthField
              id="auth-confirm"
              label={t("Parolni takrorlang", "Повторите пароль")}
              Icon={LockKeyhole}
              password
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              placeholder={t("Parolni yana yozing", "Введите пароль ещё раз")}
              maxLength={100}
              required
              error={errors.confirm}
            />
            <label className="family-parent-check">
              <input
                id="auth-parent"
                type="checkbox"
                checked={parent}
                onChange={(e) => setParent(e.target.checked)}
                aria-invalid={!!errors.parent}
                aria-describedby={
                  errors.parent ? "auth-parent-error" : undefined
                }
              />
              <span>
                {t(
                  "Men bolaning ota-onasi yoki qonuniy vakiliman",
                  "Я родитель или законный представитель ребёнка",
                )}
              </span>
            </label>
            {errors.parent && (
              <p className="family-field-error" id="auth-parent-error">
                {errors.parent}
              </p>
            )}
          </>
        ) : (
          <Link href="/forgot-password" className="family-forgot-link">
            {t("Parolni unutdingizmi?", "Забыли пароль?")}
          </Link>
        )}
        <DemoNotice />
        <PrimaryButton
          className="wide"
          type="submit"
          disabled={!ready || submitted}
        >
          {submitted
            ? t("Davom etilmoqda…", "Продолжаем…")
            : register
              ? t("Hisob yaratish", "Создать аккаунт")
              : t("Hisobga kirish", "Войти в аккаунт")}
        </PrimaryButton>
        {Object.keys(errors).length > 0 && (
          <p className="family-form-error" role="alert">
            {t(
              "Belgilangan joylarni tekshirib, yana urinib ko‘ring.",
              "Проверьте выделенные поля и попробуйте ещё раз.",
            )}
          </p>
        )}
      </form>
      <p className="family-switch-link">
        {register
          ? t("Hisobingiz bormi?", "Уже есть аккаунт?")
          : t("Hali hisobingiz yo‘qmi?", "Ещё нет аккаунта?")}{" "}
        <Link href={register ? "/login" : "/register"}>
          {register
            ? t("Kirish", "Войти")
            : t("Ro‘yxatdan o‘tish", "Зарегистрироваться")}
        </Link>
      </p>
    </FamilyAuthShell>
  );
}
export function RegisterPage() {
  return <ParentAuthPage mode="register" />;
}
export function LoginPage() {
  return <ParentAuthPage mode="login" />;
}

export function ForgotPasswordPage() {
  const { t } = useApp();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validEmail(email)) {
      setError(
        t("To‘g‘ri email manzilini yozing.", "Введите корректный email."),
      );
      event.currentTarget.querySelector<HTMLInputElement>("input")?.focus();
      return;
    }
    setError("");
    setDone(true);
  }
  return (
    <FamilyAuthShell>
      <span className="family-form-icon">
        {done ? <CheckCircle2 size={28} /> : <KeyRound size={27} />}
      </span>
      <h1>
        {done
          ? t("So‘rov tayyor!", "Запрос готов!")
          : t("Parolni tiklash", "Восстановление пароля")}
      </h1>
      {done ? (
        <div className="family-reset-result" role="status">
          <p>
            {t("Email manzili:", "Email:")} <strong>{email.trim()}</strong>
          </p>
          <p>
            {t(
              "Demo rejimida email yuborilmaydi. Haqiqiy hisoblar ishga tushganda, shu manzilga tiklash havolasi yuboriladi.",
              "В демо письмо не отправляется. Когда будут доступны настоящие аккаунты, сюда придёт ссылка для восстановления.",
            )}
          </p>
          <PrimaryButton className="wide" href="/login">
            {t("Kirish sahifasiga qaytish", "Вернуться ко входу")}
          </PrimaryButton>
          <button className="text-button" onClick={() => setDone(false)}>
            {t("Boshqa email kiritish", "Ввести другой email")}
          </button>
        </div>
      ) : (
        <>
          <p className="family-form-description">
            {t(
              "Ota-ona hisobiga bog‘langan emailni kiriting.",
              "Введите email аккаунта родителя.",
            )}
          </p>
          <form onSubmit={submit} noValidate>
            <AuthField
              id="reset-email"
              label={t("Elektron pochta", "Электронная почта")}
              Icon={Mail}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="ism@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={150}
              error={error}
            />
            <DemoNotice />
            <PrimaryButton className="wide" type="submit">
              {t("Tiklash so‘rovini yuborish", "Запросить восстановление")}
            </PrimaryButton>
            {error && (
              <p role="alert" className="family-form-error">
                {error}
              </p>
            )}
          </form>
          <p className="family-switch-link">
            <Link href="/login">
              {t("Kirishga qaytish", "Вернуться ко входу")}
            </Link>
          </p>
        </>
      )}
    </FamilyAuthShell>
  );
}

export function AccountPage() {
  const { parentName, parentEmail, profile, progress, ready, logout, t } =
    useApp();
  if (!ready)
    return (
      <FamilyAuthShell>
        <p role="status">{t("Hisob tayyorlanmoqda…", "Готовим аккаунт…")}</p>
      </FamilyAuthShell>
    );
  if (!parentEmail) return <RegisterPage />;
  return (
    <FamilyAuthShell>
      <span className="family-form-icon">
        <Users size={27} />
      </span>
      <h1>{t("Oila hisobingiz", "Ваш семейный аккаунт")}</h1>
      <p className="family-form-description">
        {t(
          "Ota-ona va kichik kitobxon — bir jamoa!",
          "Родитель и маленький читатель — одна команда!",
        )}
      </p>
      <span className="family-demo-badge">
        {t("Demo hisob", "Демо-аккаунт")}
      </span>
      <div className="family-account-person">
        <span className="family-account-avatar">
          <UserRound size={25} />
        </span>
        <div>
          <strong>{parentName || t("Ota-ona", "Родитель")}</strong>
          <span>{parentEmail}</span>
        </div>
      </div>
      <div className="family-child-summary">
        <span aria-hidden="true">{profile.gender === "boy" ? "👦" : "👧"}</span>
        <div>
          <strong>{profile.name}</strong>
          <p>
            {profile.age} {t("yosh", "лет")} · {progress.points}{" "}
            {t("ball", "баллов")}
          </p>
        </div>
        <Link
          href="/child-setup?edit=1"
          aria-label={t(
            "Farzand profilini tahrirlash",
            "Изменить профиль ребёнка",
          )}
        >
          <Pencil size={18} />
        </Link>
      </div>
      <PrimaryButton href="/home" className="wide">
        {t("Sarguzashtni davom ettirish", "Продолжить приключение")}
      </PrimaryButton>
      <Link className="family-profile-link" href="/profile">
        {t("Farzandimning yutuqlari", "Достижения ребёнка")}
      </Link>
      <button
        className="family-signout"
        onClick={() => navigate("/login", logout)}
      >
        <LogOut size={17} />
        {t("Demo hisobdan chiqish", "Выйти из демо-аккаунта")}
      </button>
      <p className="family-account-note">
        {t(
          "Farzandingizning yutuqlari shu qurilmada saqlanadi.",
          "Достижения ребёнка сохраняются на этом устройстве.",
        )}
      </p>
    </FamilyAuthShell>
  );
}

export function AccountReadyPage() {
  const { profile, parentName, ready, t } = useApp();
  if (!ready)
    return (
      <FamilyAuthShell stage={3}>
        <p role="status">{t("Profil tayyorlanmoqda…", "Готовим профиль…")}</p>
      </FamilyAuthShell>
    );
  return (
    <FamilyAuthShell stage={3}>
      <div className="family-ready-confetti" aria-hidden="true">
        ✦ ✧ ✦
      </div>
      <span className="family-ready-icon">
        <Check size={32} />
      </span>
      <h1>{t("Profil tayyor!", "Профиль готов!")}</h1>
      <p className="family-form-description">
        {parentName && `${parentName}, `}
        {t(
          "yangi sarguzashtga xush kelibsiz!",
          "добро пожаловать в новое приключение!",
        )}
      </p>
      <div className="family-child-summary">
        <span aria-hidden="true">{profile.gender === "boy" ? "👦" : "👧"}</span>
        <div>
          <strong>{profile.name}</strong>
          <p>
            {profile.age} {t("yosh", "лет")}
          </p>
        </div>
        <CheckCircle2 size={24} />
      </div>
      <p className="family-ready-message">
        {t(
          "Kitoblar, quizlar va tabiat o‘yinlari seni kutmoqda!",
          "Книги, викторины и игры о природе ждут тебя!",
        )}
      </p>
      <PrimaryButton href="/home" className="wide">
        {t("Bilim olamiga kirish", "В мир знаний")}
      </PrimaryButton>
      <Link href="/child-setup" className="family-profile-link">
        {t("Profilni tekshirish", "Проверить профиль")}
      </Link>
    </FamilyAuthShell>
  );
}
