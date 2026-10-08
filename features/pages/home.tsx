"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Heart, Sparkles } from "lucide-react";
import { AppShell } from "@/layouts/app-shell";
import { useApp } from "@/hooks/use-app";
import {
  FriendlyModal,
  Icon,
  Mascot,
  PrimaryButton,
  ProgressBar,
  Stats,
} from "@/components/common";
import { wisdomItems } from "@/data/wisdom";
import { getTreeLevel, treeLevels } from "@/data/rewards";
export function HomePage() {
  const { profile, progress, preferences, t } = useApp();
  const [modal, setModal] = useState<string | null>(null);
  const [understood, setUnderstood] = useState(false);
  const level = getTreeLevel(progress.points),
    next = treeLevels[level + 1],
    wisdom = wisdomItems[0];
  const features = [
    {
      title: t("Kitoblarim", "Мои книги"),
      desc: t("Har bir kitob — yangi olam", "Каждая книга — новый мир"),
      icon: "book",
      color: "blue",
      href: "/library",
      tag: t("O‘qishni boshlaymiz", "Начнём читать"),
    },
    {
      title: t("Quizlar", "Викторины"),
      desc: t("Bilimingni sinab ko‘r!", "Проверь свои знания!"),
      icon: "brain",
      color: "peach",
      href: "/quizzes",
      tag: t("O‘yna va o‘rgan", "Играй и учись"),
    },
    {
      title: t("Bilim Daraxti", "Дерево знаний"),
      desc: t("Bilim bilan birga o‘sadi", "Растёт вместе со знаниями"),
      icon: "leaf",
      color: "mint",
      href: "/rewards",
      tag: t("Yutuqlaring shu yerda", "Твои достижения здесь"),
    },
    {
      title: t("Koinotni tozala", "Уборка в космосе"),
      desc: t(
        "Kichik qahramon, katta vazifa",
        "Маленький герой, большая миссия",
      ),
      icon: "rocket",
      color: "lilac",
      soon: true,
    },
    {
      title: "Zakovat Battles",
      desc: t("Do‘stlaring bilan bellash", "Соревнуйся с друзьями"),
      icon: "swords",
      color: "pink",
      soon: true,
    },
    {
      title: t("Do‘kon", "Магазин"),
      desc: t("Yulduzlaringni quvonchga aylantir", "Преврати звёзды в радость"),
      icon: "shop",
      color: "yellow",
      soon: true,
    },
  ];
  return (
    <AppShell>
      <div className="home-intro">
        <span className="eyebrow">
          <span className="tiny-sun">☀</span>
          {t("BUGUN YANGI BILIMLAR KUNI", "СЕГОДНЯ ДЕНЬ НОВЫХ ЗНАНИЙ")}
        </span>
        <span className="home-date">
          {t("Kichik qadamlar, katta orzular", "Маленькие шаги, большие мечты")}
          <Sparkles size={15} />
        </span>
      </div>
      <section className="greeting-card">
        <div className="greeting-copy">
          <span className="greeting-kicker">
            {t("Kitob do‘sting bilan birga", "Вместе с книжным другом")}
          </span>
          <h1>
            {t("Salom,", "Привет,")} {profile.name}!{" "}
            <span className="wave">👋</span>
          </h1>
          <p>
            {t(
              "Men Bilbiljon — sizning kitob do‘stingizman. Keling, birga o‘qiymiz, o‘ynaymiz va yulduzlar yig‘amiz!",
              "Я Билбильджон — твой книжный друг. Давай читать, играть и собирать звёзды вместе!",
            )}
          </p>
          <PrimaryButton href="/library">
            {t("Bugun nima o‘qiymiz?", "Что почитаем сегодня?")}
          </PrimaryButton>
        </div>
        <div className="greeting-art">
          <span className="speech-bubble">
            {t("Seni ko‘rib xursandman!", "Рад тебя видеть!")}
            <Heart size={13} fill="currentColor" />
          </span>
          <span className="decor-star star-one">✦</span>
          <span className="decor-star star-two">✦</span>
          <Mascot />
        </div>
      </section>
      <Stats />
      <div className="home-columns">
        <div className="activities">
          <div className="section-heading">
            <div>
              <h2>
                {t("Bugun nimalarni kashf etamiz?", "Что откроем сегодня?")}
              </h2>
              <p>
                {t(
                  "O‘zingga yoqqan sarguzashtni tanla",
                  "Выбери приключение по душе",
                )}
              </p>
            </div>
            <Sparkles size={23} />
          </div>
          <div className="feature-grid">
            {features.map((f) => {
              const body = (
                <>
                  <div className="feature-top">
                    <span className={"feature-icon " + f.color}>
                      <Icon name={f.icon} size={33} />
                    </span>
                    {f.soon ? (
                      <span className="soon-badge">
                        {t("Tez kunda", "Скоро")}
                      </span>
                    ) : (
                      <ArrowRight size={18} />
                    )}
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  {f.tag && <span className="feature-caption">{f.tag}</span>}
                </>
              );
              return f.href ? (
                <Link
                  href={f.href}
                  className={"feature-card " + f.color}
                  key={f.title}
                >
                  {body}
                </Link>
              ) : (
                <button
                  onClick={() => setModal(f.title)}
                  className={"feature-card " + f.color}
                  key={f.title}
                >
                  {body}
                </button>
              );
            })}
          </div>
          <button className="points-info" onClick={() => setModal("points")}>
            <span className="icon-bubble yellow">
              <Icon name="star" size={24} />
            </span>
            <span>
              <strong>
                {t(
                  "Har bir harakating — bir yulduz!",
                  "Каждый шаг — новая звезда!",
                )}
              </strong>
              <small>
                {t(
                  "Ballar haqida · Qanday ball yig‘iladi?",
                  "О баллах · Как собирать баллы?",
                )}
              </small>
            </span>
            <ArrowRight size={20} />
          </button>
        </div>
        <aside className="home-aside">
          <section className="wisdom-card">
            <div className="wisdom-header">
              <span className="mentor-avatar">
                <Mascot mentor />
              </span>
              <div>
                <span className="eyebrow">
                  {t("BUGUNGI ODOB DARSI", "УРОК ДОБРОТЫ")}
                </span>
                <h3>Bobojon</h3>
              </div>
              <span className="wisdom-sparkle">✧</span>
            </div>
            <div className="wisdom-label">
              {t("Bugungi hikmat", "Мудрость дня")}
            </div>
            <h3 className="wisdom-title">
              {wisdom.title[preferences.language]}
            </h3>
            <p>{wisdom.text[preferences.language]}</p>
            <button
              className={"wisdom-button " + (understood ? "understood" : "")}
              onClick={() => setUnderstood(!understood)}
            >
              {understood ? <Check size={18} /> : <Heart size={18} />}{" "}
              {understood
                ? t("Barakalla, bilimdon!", "Молодец, знаток!")
                : t("Tushundim, rahmat!", "Понял, спасибо!")}
            </button>
          </section>
          <section className="tree-preview">
            <div className="tree-preview-copy">
              <span className="eyebrow">
                {t("BILIMING O‘SMOQDA", "ТВОИ ЗНАНИЯ РАСТУТ")}
              </span>
              <h3>
                {t("Kichik ko‘chat,", "Маленький росток,")}
                <br />
                {t("katta kelajak!", "большое будущее!")}
              </h3>
            </div>
            <img
              src="/images/knowledge-tree.png"
              alt={t("Bilim daraxti", "Дерево знаний")}
            />
            <div className="tree-preview-footer">
              <div>
                <strong>
                  {t(treeLevels[level].name, treeLevels[level].ru)}
                </strong>
                <span>
                  {next
                    ? progress.points +
                      " / " +
                      next.points +
                      " " +
                      t("ball", "баллов")
                    : t("Eng yuqori daraja", "Высший уровень")}
                </span>
              </div>
              <ProgressBar
                value={
                  next
                    ? ((progress.points - treeLevels[level].points) /
                        (next.points - treeLevels[level].points)) *
                      100
                    : 100
                }
                label={t("Keyingi daraja", "Следующий уровень")}
              />
              <Link href="/rewards">
                {t("Daraxtimni ko‘rish", "Моё дерево")}
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </aside>
      </div>
      <section className="coming-banner">
        <span className="icon-bubble lilac">
          <Icon name="volume" size={28} />
        </span>
        <div>
          <h3>
            {t("Bilbiljonning ovozli olami", "Голосовой мир Билбильджона")}
          </h3>
          <p>
            {t(
              "Ertaklar eshitamiz, suhbatlashamiz va yana ko‘p narsalar!",
              "Будем слушать сказки, общаться и открывать новое!",
            )}
          </p>
        </div>
        <Link href="/settings#coming-soon">
          {t("Tez kunda", "Скоро")}
          <ArrowRight size={16} />
        </Link>
      </section>
      <footer className="page-footer">
        <Icon name="heart" size={14} />
        {t(
          "Kichik kitobxonlar uchun mehr bilan yaratilgan",
          "Создано с любовью для маленьких читателей",
        )}
      </footer>
      <FriendlyModal kind={modal} onClose={() => setModal(null)} />
    </AppShell>
  );
}
