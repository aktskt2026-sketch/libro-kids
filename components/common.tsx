"use client";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  Flame,
  Home,
  Leaf,
  Settings,
  Star,
  Trophy,
  UserRound,
  X,
  Rocket,
  ShoppingBag,
  Swords,
  Heart,
  Volume2,
  Mic,
  Accessibility,
  AudioLines,
  WandSparkles,
  Scan,
  UsersRound,
  Sparkles,
  Globe,
  ShieldCheck,
  Flower2,
  Compass,
  Sun,
  Moon,
  Feather,
  Lightbulb,
} from "lucide-react";
import { useApp } from "@/hooks/use-app";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { getTreeLevel } from "@/data/rewards";
import type { ReactNode } from "react";
import { WorldIllustration } from "@/components/world-illustration";
const icons = {
  book: BookOpen,
  brain: Brain,
  flame: Flame,
  home: Home,
  leaf: Leaf,
  settings: Settings,
  star: Star,
  trophy: Trophy,
  user: UserRound,
  rocket: Rocket,
  shop: ShoppingBag,
  swords: Swords,
  heart: Heart,
  volume: Volume2,
  mic: Mic,
  accessibility: Accessibility,
  audio: AudioLines,
  magic: WandSparkles,
  scan: Scan,
  users: UsersRound,
  sparkles: Sparkles,
  globe: Globe,
  shield: ShieldCheck,
  flower: Flower2,
  compass: Compass,
  sun: Sun,
  moon: Moon,
  feather: Feather,
  bulb: Lightbulb,
};
export function Icon({
  name,
  size = 24,
  ...props
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Glyph = icons[name as keyof typeof icons] ?? BookOpen;
  return <Glyph size={size} strokeWidth={2} {...props} />;
}
export function Logo() {
  return (
    <Link href="/home" className="logo" aria-label="Libro-Kids">
      <span className="logo-symbol">
        <WorldIllustration world="books" />
      </span>
      <span>
        Libro-<span className="logo-letter letter-k">K</span>
        <span className="logo-letter letter-i">i</span>
        <span className="logo-letter letter-d">d</span>
        <span className="logo-letter letter-s">s</span>
        <small>Bilim bilan o‘sing!</small>
      </span>
    </Link>
  );
}
export function Mascot({
  className = "",
  mentor = false,
}: {
  className?: string;
  mentor?: boolean;
}) {
  return (
    <img
      className={"mascot " + className}
      src={
        mentor
          ? "/images/bobojon.png"
          : "/images/storybook/bilbiljon-purple.png"
      }
      alt={mentor ? "Bobojon" : "Bilbiljon"}
    />
  );
}
export function PrimaryButton({
  children,
  href,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  const c = (
    <>
      {children}
      <ArrowRight size={19} />
    </>
  );
  return href ? (
    <Link href={href} className={"primary-button " + className}>
      {c}
    </Link>
  ) : (
    <button
      className={"primary-button " + className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {c}
    </button>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  back,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  back?: string;
}) {
  const { t } = useApp();
  return (
    <div className="page-heading">
      {back && (
        <Link className="back-link" href={back}>
          <ArrowLeft size={18} />
          {t("Orqaga", "Назад")}
        </Link>
      )}
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
export function ProgressBar({
  value,
  label,
  className = "",
}: {
  value: number;
  label: string;
  className?: string;
}) {
  return (
    <Progress
      value={value}
      aria-label={label}
      className={"learning-progress " + className}
    />
  );
}
export function Stats() {
  const { progress, t } = useApp();
  return (
    <div className="stats-row">
      {[
        {
          icon: "star",
          value: progress.points,
          label: t("Ballar", "Баллы"),
          color: "yellow",
        },
        {
          icon: "flame",
          value: progress.streak,
          label: t("Kun seriyasi", "Дней подряд"),
          color: "orange",
        },
        {
          icon: "leaf",
          value: getTreeLevel(progress.points) + 1,
          label: t("Daraja", "Уровень"),
          color: "green",
        },
      ].map((s) => (
        <div className="stat-card" key={s.icon}>
          <span className={"icon-bubble " + s.color}>
            <Icon name={s.icon} size={25} />
          </span>
          <div>
            <strong>
              {s.value}
              <span>{s.icon === "flame" ? t(" kun", " дня") : ""}</span>
            </strong>
            <small>{s.label}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
export function FriendlyModal({
  kind,
  onClose,
}: {
  kind: string | null;
  onClose: () => void;
}) {
  const { t } = useApp();
  const points = kind === "points";
  return (
    <Dialog
      open={!!kind}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="friendly-modal" showCloseButton={false}>
        <button
          className="modal-close icon-button"
          onClick={onClose}
          aria-label={t("Yopish", "Закрыть")}
        >
          <X size={22} />
        </button>
        <span className="modal-illustration">
          {points ? <Star size={52} /> : <Rocket size={52} />}
        </span>
        <span className="eyebrow">{points ? "LIBRO-KIDS" : kind}</span>
        <DialogTitle className="modal-title">
          {points
            ? t("Har bir bilim — bir yulduz!", "Каждое знание — звезда!")
            : t("Tez kunda!", "Скоро!")}
        </DialogTitle>
        <DialogDescription className="modal-description">
          {points
            ? t(
                "Kitobni oxirigacha o‘qing: +5 ball. Quizda har bir to‘g‘ri javob: +2 ball. Ballaringiz Bilim Daraxtini o‘stiradi! Bir kitob uchun ball bir marta beriladi. Takroriy quizda faqat yaxshilangan natija uchun ball olasiz.",
                "Прочитайте книгу: +5 баллов. Каждый верный ответ: +2 балла. Баллы растят Дерево знаний! За книгу баллы начисляются один раз. Повторная викторина даёт баллы только за улучшение результата.",
              )
            : t(
                "Bilbiljon jamoasi bu bo‘lim ustida ishlayapti. Tez orada siz uchun tayyor bo‘ladi!",
                "Команда Билбильджона готовит этот раздел. Совсем скоро он будет доступен!",
              )}
        </DialogDescription>
        <PrimaryButton onClick={onClose}>
          {t("Tushunarli", "Понятно")}
        </PrimaryButton>
      </DialogContent>
    </Dialog>
  );
}
