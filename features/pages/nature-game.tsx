"use client";
import { useState } from "react";
import { Check, Leaf, Recycle, RotateCcw, Star } from "lucide-react";
import Link from "@/components/app-link";
import { PageHeading, PrimaryButton, ProgressBar } from "@/components/common";
import {
  gardenLitter,
  natureGames,
  sortingItems,
  wasteBins,
  type WasteCategory,
} from "@/data/nature-games";
import { useApp } from "@/hooks/use-app";
import { AppShell } from "@/layouts/app-shell";

function SortingGame({ onFinish }: { onFinish: () => void }) {
  const { preferences, t } = useApp();
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<WasteCategory | null>(null);
  const [answer, setAnswer] = useState<"correct" | "retry" | null>(null);
  const item = sortingItems[index];
  const correctBin = wasteBins.find((bin) => bin.id === item.category)!;
  const sorted = index + (answer === "correct" ? 1 : 0);
  function choose(category: WasteCategory) {
    if (answer === "correct") return;
    setPicked(category);
    setAnswer(category === item.category ? "correct" : "retry");
  }
  function next() {
    if (answer !== "correct") return;
    if (index === sortingItems.length - 1) return onFinish();
    setIndex(index + 1);
    setPicked(null);
    setAnswer(null);
  }
  return (
    <section className="nature-play-card">
      <div className="nature-play-top">
        <span>
          <Recycle size={19} />
          {t("SARALASH SARGUZASHTI", "ПРИКЛЮЧЕНИЕ С СОРТИРОВКОЙ")}
        </span>
        <strong>
          {sorted}/{sortingItems.length} {t("saralandi", "готово")}
        </strong>
      </div>
      <ProgressBar
        value={(sorted / sortingItems.length) * 100}
        label={t("Saralash jarayoni", "Прогресс сортировки")}
      />
      <div className={`sorting-item ${answer === "correct" ? "sorted" : ""}`}>
        <span className="sorting-item-number">
          {index + 1} / {sortingItems.length}
        </span>
        <span className="sorting-item-emoji" aria-hidden="true">
          {item.emoji}
        </span>
        <h2>{item.title[preferences.language]}</h2>
        <p>{t("Qaysi qutiga joylaymiz?", "В какой контейнер положим?")}</p>
        {answer === "correct" && (
          <span className="sorting-check">
            <Check size={25} />
          </span>
        )}
      </div>
      <div
        className="waste-bin-row"
        aria-label={t("Saralash qutilari", "Контейнеры для сортировки")}
      >
        {wasteBins.map((bin) => (
          <button
            key={bin.id}
            className={`waste-bin ${bin.id} ${picked === bin.id ? (answer === "correct" ? "chosen" : "try-again") : ""}`}
            onClick={() => choose(bin.id)}
            disabled={answer === "correct"}
            aria-label={bin.title[preferences.language]}
            aria-pressed={picked === bin.id}
          >
            <span className="waste-bin-lid" />
            <span className="waste-bin-symbol" aria-hidden="true">
              {bin.emoji}
            </span>
            <strong>{bin.title[preferences.language]}</strong>
            <small>{bin.hint[preferences.language]}</small>
          </button>
        ))}
      </div>
      <div
        className={`nature-feedback ${answer ?? "waiting"}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {answer === "correct" ? (
          <>
            <Check size={20} />
            <span>
              {t(
                "Barakalla! To‘g‘ri qutini topding!",
                "Молодец! Ты нашёл правильный контейнер!",
              )}
            </span>
          </>
        ) : answer === "retry" ? (
          <>
            <Leaf size={20} />
            <span>
              {t(
                "Birga o‘rganamiz! Shu qutini sinab ko‘r:",
                "Учимся вместе! Попробуй этот контейнер:",
              )}{" "}
              <strong>{correctBin.title[preferences.language]}</strong>.
            </span>
          </>
        ) : (
          <>
            <Leaf size={20} />
            <span>
              {t(
                "Chiqindining nomiga qarab, pastdagi qutilardan birini tanla.",
                "Посмотри на название предмета и выбери контейнер внизу.",
              )}
            </span>
          </>
        )}
      </div>
      <PrimaryButton
        className="nature-next"
        onClick={next}
        disabled={answer !== "correct"}
      >
        {index === sortingItems.length - 1
          ? t("O‘yinni yakunlash", "Завершить игру")
          : t("Keyingi chiqindi", "Следующий предмет")}
      </PrimaryButton>
    </section>
  );
}

function GardenGame({ onFinish }: { onFinish: () => void }) {
  const { preferences, t } = useApp();
  const [collected, setCollected] = useState<string[]>([]);
  function collect(id: string) {
    if (collected.includes(id)) return;
    const next = [...collected, id];
    setCollected(next);
    if (next.length === gardenLitter.length) onFinish();
  }
  return (
    <section className="nature-play-card garden-play-card">
      <div className="nature-play-top">
        <span>
          <Leaf size={19} />
          {t("BOG‘NING KICHIK QAHRAMONI", "МАЛЕНЬКИЙ ГЕРОЙ ПАРКА")}
        </span>
        <strong>
          {collected.length}/{gardenLitter.length} {t("yig‘ildi", "собрано")}
        </strong>
      </div>
      <ProgressBar
        value={(collected.length / gardenLitter.length) * 100}
        label={t("Bog‘ni tozalash jarayoni", "Прогресс уборки парка")}
      />
      <div className="garden-instructions">
        <strong>
          {t(
            "Bog‘dagi 8 ta chiqindini top!",
            "Найди 8 предметов мусора в парке!",
          )}
        </strong>
        <p>
          {t(
            "Chiqindining ustiga bosib yig‘. Gullar va kapalaklarni asraymiz.",
            "Нажимай на мусор, чтобы собрать его. Цветы и бабочек бережём.",
          )}
        </p>
      </div>
      <div
        className="garden-board"
        aria-label={t(
          "Chiqindilarni yig‘ish maydoni",
          "Площадка для уборки мусора",
        )}
      >
        <div className="garden-scenery" aria-hidden="true">
          <span className="garden-sun">☀️</span>
          <span className="garden-cloud">☁️</span>
          <span className="garden-tree garden-tree-one">🌳</span>
          <span className="garden-tree garden-tree-two">🌳</span>
          <span className="garden-pond" />
          <span className="garden-flowers">🌼 🌷 🌼</span>
          <span className="garden-butterfly">🦋</span>
        </div>
        {gardenLitter.map((item) => {
          const found = collected.includes(item.id);
          return (
            <button
              key={item.id}
              className={`garden-litter ${found ? "is-collected" : ""}`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onClick={() => collect(item.id)}
              disabled={found}
              aria-label={`${item.title[preferences.language]} — ${found ? t("yig‘ildi", "собрано") : t("yig‘ish", "собрать")}`}
            >
              <span aria-hidden="true">
                {found ? <Check size={23} /> : item.emoji}
              </span>
            </button>
          );
        })}
      </div>
      <div
        className="nature-feedback correct garden-feedback"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <Leaf size={20} />
        <span>
          {collected.length
            ? `${t("Ajoyib!", "Отлично!")} ${collected.length}/${gardenLitter.length} ${t("ta chiqindi yig‘ildi.", "предметов собрано.")}`
            : t(
                "Keling, bog‘imizni yana chiroyli qilamiz!",
                "Давай сделаем наш парк красивым!",
              )}
        </span>
      </div>
    </section>
  );
}

export function NatureGamePage({ gameId }: { gameId: string }) {
  const { preferences, progress, completeGame, ready, t } = useApp();
  const game = natureGames.find((game) => game.id === gameId);
  const [finished, setFinished] = useState(false);
  const [earned, setEarned] = useState(0);
  const [round, setRound] = useState(0);
  function finish() {
    if (!game || finished || !ready) return;
    setEarned(progress.completedGames.includes(game.id) ? 0 : game.reward);
    completeGame(game.id, game.reward);
    setFinished(true);
  }
  function restart() {
    setFinished(false);
    setEarned(0);
    setRound(round + 1);
  }
  if (!game)
    return (
      <AppShell>
        <PageHeading
          title={t("O‘yin topilmadi", "Игра не найдена")}
          back="/nature"
        />
      </AppShell>
    );
  return (
    <AppShell>
      <PageHeading
        back="/nature"
        eyebrow={t("TABIATNI TOZALA", "БЕРЕГИ ПРИРОДУ")}
        title={game.title[preferences.language]}
        description={game.description[preferences.language]}
      />
      {!ready ? (
        <p role="status">{t("O‘yin tayyorlanmoqda…", "Готовим игру…")}</p>
      ) : finished ? (
        <section className="nature-result">
          <span className="nature-result-confetti" aria-hidden="true">
            ✦ ✧ ✦
          </span>
          <img src="/images/storybook/nature-world.png" alt="" />
          <span className="nature-result-label">
            <Check size={18} /> {t("VAZIFA BAJARILDI", "ЗАДАНИЕ ВЫПОЛНЕНО")}
          </span>
          <h2>{t("Barakalla, tabiat do‘sti!", "Молодец, друг природы!")}</h2>
          <p>
            {game.id === "sort"
              ? t(
                  "6 ta chiqindini to‘g‘ri saralading. Yer sayyoramiz senga rahmat aytadi!",
                  "Ты правильно рассортировал 6 предметов. Наша планета говорит тебе спасибо!",
                )
              : t(
                  "Bog‘dagi 8 ta chiqindini yig‘ding. Endi bu yer gullar va kapalaklar uchun yanada chiroyli!",
                  "Ты собрал 8 предметов мусора. Теперь парк стал ещё красивее для цветов и бабочек!",
                )}
          </p>
          <span className="nature-earned">
            <Star size={23} />
            {earned
              ? `+${earned} ${t("ball", "баллов")}`
              : t("Yana bir yaxshi ish!", "Ещё одно доброе дело!")}
          </span>
          <small>
            {earned
              ? t(
                  "Ballaring Bilim Daraxtingga qo‘shildi.",
                  "Баллы добавлены к твоему Дереву знаний.",
                )
              : t(
                  "Bu o‘yin uchun ball avval olingan. Yana mashq qilish juda foydali!",
                  "Баллы за эту игру уже получены. Играть снова — отличная тренировка!",
                )}
          </small>
          <div className="nature-result-actions">
            <PrimaryButton href="/nature">
              {t("Boshqa o‘yinlar", "Другие игры")}
            </PrimaryButton>
            <button className="nature-replay" onClick={restart}>
              <RotateCcw size={18} />
              {t("Yana o‘ynash", "Играть ещё")}
            </button>
          </div>
          <Link href="/rewards" className="text-button">
            {t("Daraxtimni ko‘rish", "Моё дерево")}
          </Link>
        </section>
      ) : game.id === "sort" ? (
        <SortingGame key={round} onFinish={finish} />
      ) : (
        <GardenGame key={round} onFinish={finish} />
      )}
      <p className="nature-gentle-note">
        <Leaf size={16} />
        {t(
          "Kichik yaxshi ishlar bilan dunyoni chiroyli qilamiz.",
          "Маленькими добрыми делами делаем мир красивее.",
        )}
      </p>
    </AppShell>
  );
}
