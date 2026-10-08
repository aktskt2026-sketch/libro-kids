"use client";
import { dateKey } from "@/lib/progress";
import Link from "@/components/app-link";
import { POINT_REWARDS } from "@/data/point-rules";
import { AppShell } from "@/layouts/app-shell";
import {
  PageHeading,
  Icon,
  PrimaryButton,
  ProgressBar,
} from "@/components/common";
import { useApp } from "@/hooks/use-app";
import { achievements, getTreeLevel, treeLevels } from "@/data/rewards";
import { Check, LockKeyhole, Star } from "lucide-react";
export function RewardsPage() {
  const { profile, progress, t } = useApp();
  const level = getTreeLevel(progress.points),
    current = treeLevels[level],
    next = treeLevels[level + 1],
    pct = next
      ? ((progress.points - current.points) / (next.points - current.points)) *
        100
      : 100;
  const readToday = progress.readingDates.includes(dateKey(new Date()));
  return (
    <AppShell>
      <PageHeading
        eyebrow={t("HAR KUNI BIR QADAM OLDINGA", "КАЖДЫЙ ДЕНЬ ШАГ ВПЕРЁД")}
        title={t("Mening Bilim Daraxtim", "Моё Дерево знаний")}
        description={t(
          "O‘qigan har bir kitobing va javobing bilan daraxting ham o‘sadi.",
          "Твоё дерево растёт с каждой прочитанной книгой и верным ответом.",
        )}
      />
      <Link className="points-guide-link" href="/points">
        <span className="points-guide-link-icon">
          <Star size={22} />
        </span>
        <div>
          <strong>{t("Ball mezonlari", "Правила начисления баллов")}</strong>
          <small>
            {t(
              "Qanday ball yig‘iladi va ular nima uchun kerak?",
              "Как получать баллы и для чего они нужны?",
            )}
          </small>
        </div>
        <span className="points-guide-link-label">
          {t("Mezonlarni ko‘rish", "Посмотреть правила")}
        </span>
      </Link>
      <section className="rewards-hero">
        <div className="rewards-tree">
          <span className="tree-owner">
            {profile.name}
            {t("ning daraxti", " · дерево знаний")}
          </span>
          <img
            src="/images/knowledge-tree.png"
            alt={t("Yashil bilim daraxti", "Зелёное дерево знаний")}
          />
          <span className="tree-level-label">
            {current.icon} {t(current.name, current.ru)}
          </span>
        </div>
        <div className="rewards-summary">
          <span className="eyebrow">
            {t("SEN BILIM BILAN O‘SYAPSAN", "ТЫ РАСТЁШЬ ВМЕСТЕ СО ЗНАНИЯМИ")}
          </span>
          <h2>
            {next
              ? t("Katta daraxtga oz qoldi!", "Скоро вырастет большое дерево!")
              : t("Bilim daraxting gulladi!", "Твоё дерево знаний расцвело!")}
          </h2>
          <p>
            {next
              ? t(
                  "Har bir kichik harakat — katta kelajakka bir qadam. Davom et, sen ajoyib o‘rganyapsan!",
                  "Каждый маленький шаг приближает большое будущее. Продолжай, ты отлично учишься!",
                )
              : t(
                  "Eng yuqori darajaga yetding. Yangi kitoblar bilan bilim olishni davom ettir!",
                  "Ты достиг высшего уровня. Продолжай узнавать новое с книгами!",
                )}
          </p>
          <div className="growth-label">
            <strong>
              {t(current.name, current.ru)}
              <span>
                {" "}
                · {level + 1} {t("daraja", "уровень")}
              </span>
            </strong>
            <span>
              <Star size={16} />
              {progress.points}
              {next ? " / " + next.points : ""}
            </span>
          </div>
          <ProgressBar
            value={pct}
            label={t("Bilim daraxti o‘sishi", "Рост дерева знаний")}
          />
          <div className="next-level-note">
            {next
              ? t("Keyingi bosqich: ", "Следующий этап: ") +
                t(next.name, next.ru) +
                " · " +
                (next.points - progress.points) +
                " " +
                t("ball qoldi", "баллов осталось")
              : t("Barcha bosqichlar ochilgan", "Все этапы открыты")}
          </div>
          <PrimaryButton href="/library">
            {t("Daraxtimni o‘stiraman!", "Буду растить дерево!")}
          </PrimaryButton>
        </div>
      </section>
      <section
        className="growth-roadmap"
        aria-label={t("Daraxt bosqichlari", "Этапы роста дерева")}
      >
        {treeLevels.map((l, i) => (
          <div
            key={l.name}
            className={
              "growth-stage " +
              (i === level ? "current" : i < level ? "complete" : "")
            }
          >
            <span className="stage-icon">
              {l.icon}
              {i < level && <Check size={12} />}
            </span>
            <strong>{t(l.name, l.ru)}</strong>
            <small>
              {l.points} {t("ball", "баллов")}
            </small>
            {i === level && (
              <span className="stage-here">
                {t("Sen shu yerdasan", "Ты здесь")}
              </span>
            )}
          </div>
        ))}
      </section>
      <section className="daily-goal">
        <span className="icon-bubble yellow">
          <Icon name="sun" size={31} />
        </span>
        <div>
          <h3>{t("Bugungi kichik maqsad", "Маленькая цель на сегодня")}</h3>
          <p>
            {readToday
              ? t(
                  "Bugun kitob o‘qiding. Barakalla!",
                  "Сегодня ты прочитал книгу. Молодец!",
                )
              : t(
                  "Bugun bitta kitobni oxirigacha o‘qiymiz.",
                  "Сегодня прочитаем одну книгу до конца.",
                )}
          </p>
          <small className="daily-goal-reward">
            +{POINT_REWARDS.dailyGoal}{" "}
            {t("ball · kuniga bir marta", "балла · раз в день")}
          </small>
        </div>
        <span className="daily-goal-count">
          {readToday ? <Check size={20} /> : "0 / 1"}
        </span>
        {!readToday && (
          <PrimaryButton href="/library">
            {t("Kitob tanlash", "Выбрать книгу")}
          </PrimaryButton>
        )}
      </section>
      <div className="section-heading">
        <div>
          <h2>
            {t(
              "Kichik yutuqlar, katta quvonch",
              "Маленькие успехи, большая радость",
            )}
          </h2>
          <p>
            {t(
              "Har bir nishon — sening mehnating belgisi",
              "Каждый значок — награда за старания",
            )}
          </p>
        </div>
        <Icon name="trophy" size={25} />
      </div>
      <div className="achievement-grid">
        {achievements.map((a) => {
          const value =
            a.kind === "books"
              ? progress.completedBooks.length
              : a.kind === "streak"
                ? progress.streak
                : a.kind === "quizzes"
                  ? Object.keys(progress.quizScores).length
                  : progress.points;
          const unlocked = value >= a.goal;
          return (
            <article
              className={"achievement-card " + (unlocked ? "unlocked" : "")}
              key={a.id}
            >
              <span
                className={"achievement-symbol " + (unlocked ? "yellow" : "")}
              >
                <Icon name={a.icon} size={34} />
              </span>
              <h3>{t(a.title, a.ru)}</h3>
              <p>{t(a.description, a.ruDescription)}</p>
              <span className="achievement-status">
                {unlocked ? (
                  <>
                    <Check size={14} />
                    {t("Qo‘lga kiritildi", "Получено")}
                  </>
                ) : (
                  <>
                    <LockKeyhole size={13} />
                    {Math.min(value, a.goal)} / {a.goal}
                  </>
                )}
              </span>
            </article>
          );
        })}
      </div>
    </AppShell>
  );
}
