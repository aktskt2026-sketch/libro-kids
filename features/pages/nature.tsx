"use client";
import { ArrowRight, Check, Leaf, Recycle, Star } from "lucide-react";
import Link from "@/components/app-link";
import { PageHeading, Mascot } from "@/components/common";
import {
  StoryIllustration,
  WorldIllustration,
} from "@/components/world-illustration";
import { natureGames, wasteBins } from "@/data/nature-games";
import { useApp } from "@/hooks/use-app";
import { AppShell } from "@/layouts/app-shell";

export function NaturePage() {
  const { preferences, progress, t } = useApp();
  return (
    <AppShell>
      <PageHeading
        back="/home"
        eyebrow={t(
          "KICHIK QAHRAMON, YASHIL SAYYORA",
          "МАЛЕНЬКИЙ ГЕРОЙ, ЗЕЛЁНАЯ ПЛАНЕТА",
        )}
        title={t("Tabiatni tozala", "Береги природу")}
        description={t(
          "Tabiatni asrashni birga o‘rganamiz. Qaysi o‘yindan boshlaymiz?",
          "Будем учиться заботиться о природе. С какой игры начнём?",
        )}
      />
      <section className="nature-hero">
        <div>
          <span className="nature-label">
            <Leaf size={17} />{" "}
            {t("TABIATNING KICHIK DO‘STI", "МАЛЕНЬКИЙ ДРУГ ПРИРОДЫ")}
          </span>
          <h2>
            {t("Toza tabiat —", "Чистая природа —")}
            <br />
            <span>{t("baxtli sayyora!", "счастливая планета!")}</span>
          </h2>
          <p>
            {t(
              "Chiqindini sarala, bog‘ni tozala va har bir yaxshi ishing bilan Bilim Daraxtingni o‘stir.",
              "Сортируй отходы, убирай парк и помогай своему Дереву знаний расти.",
            )}
          </p>
          <span className="nature-reward">
            <Star size={18} />{" "}
            {t(
              "Har bir yangi o‘yin uchun +5 ball",
              "+5 баллов за каждую новую игру",
            )}
          </span>
        </div>
        <img
          src="/images/storybook/nature-world.png"
          alt={t(
            "Yashil bog‘, Yer sayyorasi va saralash qutilari",
            "Зелёный парк, планета Земля и контейнеры для сортировки",
          )}
        />
      </section>
      <div className="section-heading nature-section-heading">
        <div>
          <h2>
            {t(
              "O‘yin tanla, tabiatga yordam ber",
              "Выбери игру и помоги природе",
            )}
          </h2>
          <p>
            {t(
              "Shoshilmasdan o‘yna. Birga o‘rganamiz!",
              "Играй без спешки. Будем учиться вместе!",
            )}
          </p>
        </div>
        <span className="nature-game-count">2 {t("ta o‘yin", "игры")}</span>
      </div>
      <div className="nature-game-grid">
        {natureGames.map((game) => {
          const completed = progress.completedGames.includes(game.id);
          return (
            <article className={`nature-game-card ${game.color}`} key={game.id}>
              <div className="nature-card-meta">
                <span>
                  <Leaf size={15} /> {t("TABIAT O‘YINI", "ИГРА О ПРИРОДЕ")}
                </span>
                {completed ? (
                  <span className="nature-done">
                    <Check size={15} />
                    {t("Bajarildi", "Пройдено")}
                  </span>
                ) : (
                  <span>
                    <Star size={15} /> +5 {t("ball", "баллов")}
                  </span>
                )}
              </div>
              <div
                className={`nature-card-art nature-card-art-${game.id}`}
                aria-hidden="true"
              >
                {game.id === "sort" ? (
                  <div className="mini-bin-row">
                    {wasteBins.map((bin) => (
                      <span className={`mini-bin ${bin.id}`} key={bin.id}>
                        {bin.emoji}
                        <Recycle size={23} />
                      </span>
                    ))}
                  </div>
                ) : (
                  <StoryIllustration bookId="little-garden" />
                )}
                <span className="nature-art-star">✦</span>
              </div>
              <h2>{game.title[preferences.language]}</h2>
              <p>{game.description[preferences.language]}</p>
              <Link className="primary-button" href={`/nature/${game.id}`}>
                {completed
                  ? t("Yana o‘ynash", "Играть ещё")
                  : t("O‘ynashni boshlash", "Начать игру")}
                <ArrowRight size={18} />
              </Link>
            </article>
          );
        })}
      </div>
      <section className="nature-mascot-note">
        <Mascot />
        <div>
          <h3>{t("Sen tabiatning do‘stisan!", "Ты друг природы!")}</h3>
          <p>
            {t(
              "O‘yinda o‘rgangan yaxshi odatingni hayotda ham sinab ko‘r. Kattalar bilan birga tabiatni asra.",
              "Попробуй добрые привычки из игры в жизни. Заботься о природе вместе со взрослыми.",
            )}
          </p>
        </div>
        <WorldIllustration world="nature" />
      </section>
    </AppShell>
  );
}
