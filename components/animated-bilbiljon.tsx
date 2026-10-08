"use client";
import { useId, useState } from "react";
import { Heart, Pause, Play } from "lucide-react";
import { useApp } from "@/hooks/use-app";

// Both layers use the original artwork. Only the waving hand is clipped out
// and rotated, so the character keeps his face, clothes and book.
const artwork = "/images/storybook/bilbiljon-purple.png";
const handOutline =
  "M 1030 440 H 1309 V 765 L 1185 807 L 1080 752 L 1025 675 Z";

export function AnimatedBilbiljon() {
  const { t } = useApp();
  const id = useId().replace(/:/g, "");
  const [paused, setPaused] = useState(false);
  const [greetings, setGreetings] = useState(0);
  return (
    <div
      className={`greeting-art animated-greeting ${paused ? "is-paused" : ""}`}
    >
      <span className="speech-bubble" aria-live="polite" aria-atomic="true">
        {greetings % 2
          ? t(
              "Salom, do‘stim! Birga o‘qiymizmi?",
              "Привет, друг! Почитаем вместе?",
            )
          : t("Keling, birga o‘rganamiz!", "Давай учиться вместе!")}
        <Heart size={13} fill="currentColor" aria-hidden="true" />
      </span>
      <span className="decor-star star-one" aria-hidden="true">
        ✦
      </span>
      <span className="decor-star star-two" aria-hidden="true">
        ✦
      </span>
      <button
        className="mascot animated-mascot"
        aria-label={t(
          "Bilbiljonga salom berish",
          "Поздороваться с Билбильджоном",
        )}
        onClick={() => {
          setPaused(false);
          setGreetings(greetings + 1);
        }}
      >
        <svg
          className="bilbiljon-idle"
          viewBox="0 0 1309 1201"
          preserveAspectRatio="xMidYMax meet"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <mask
              id={`${id}-body`}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1309"
              height="1201"
            >
              <rect width="1309" height="1201" fill="white" />
              <path d={handOutline} fill="black" />
            </mask>
            <clipPath id={`${id}-hand`} clipPathUnits="userSpaceOnUse">
              <path d={handOutline} />
            </clipPath>
          </defs>
          <image
            href={artwork}
            width="1309"
            height="1201"
            mask={`url(#${id}-body)`}
          />
          <g className="bilbiljon-waving-hand" key={greetings}>
            <image
              href={artwork}
              width="1309"
              height="1201"
              clipPath={`url(#${id}-hand)`}
            />
          </g>
        </svg>
      </button>
      <button
        className="mascot-motion-toggle"
        onClick={() => setPaused(!paused)}
        aria-label={
          paused
            ? t("Bilbiljonni jonlantirish", "Оживить Билбильджона")
            : t("Bilbiljonni to‘xtatish", "Остановить Билбильджона")
        }
        title={
          paused ? t("Jonlantirish", "Продолжить") : t("To‘xtatish", "Пауза")
        }
      >
        {paused ? (
          <Play size={15} fill="currentColor" />
        ) : (
          <Pause size={15} fill="currentColor" />
        )}
      </button>
    </div>
  );
}
