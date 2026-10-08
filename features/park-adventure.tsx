"use client";
import { useEffect, useReducer, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Backpack,
  Check,
  Recycle,
  Trash2,
  Trophy,
} from "lucide-react";
import { useApp } from "@/hooks/use-app";
import {
  parkBin,
  parkCharacters,
  parkLitter,
  type ParkPoint,
} from "@/data/park-game";
import {
  deliveryRadius,
  initialParkState,
  nearestParkLitter,
  parkDistance,
  parkReducer,
  pickupRadius,
} from "@/lib/park-game";

const directions = [
  {
    id: "up",
    x: 0,
    y: -1,
    Icon: ArrowUp,
    uz: "Yuqoriga yurish",
    ru: "Идти вверх",
  },
  {
    id: "left",
    x: -1,
    y: 0,
    Icon: ArrowLeft,
    uz: "Chapga yurish",
    ru: "Идти влево",
  },
  {
    id: "down",
    x: 0,
    y: 1,
    Icon: ArrowDown,
    uz: "Pastga yurish",
    ru: "Идти вниз",
  },
  {
    id: "right",
    x: 1,
    y: 0,
    Icon: ArrowRight,
    uz: "O‘ngga yurish",
    ru: "Идти вправо",
  },
];
const keyDirections: Record<string, ParkPoint> = {
  arrowup: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  arrowdown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  arrowleft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  arrowright: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
};

export function ParkAdventure({ onFinish }: { onFinish: () => void }) {
  const { preferences, t } = useApp();
  const [state, dispatch] = useReducer(
    parkReducer,
    undefined,
    initialParkState,
  );
  const [character, setCharacter] = useState<(typeof parkCharacters)[number]>(
    parkCharacters[0],
  );
  const [walking, setWalking] = useState(false);
  const stateRef = useRef(state);
  const targetRef = useRef<ParkPoint | null>(null);
  const keysRef = useRef(new Set<string>());
  const touchRef = useRef<ParkPoint | null>(null);
  const finishRef = useRef(onFinish);
  const didFinishRef = useRef(false);
  const nearest = nearestParkLitter(state);
  const canCollect =
    !!nearest && parkDistance(nearest.position, state.position) <= pickupRadius;
  const carried = state.collected.length - state.delivered.length;
  const canDeliver =
    carried > 0 && parkDistance(parkBin, state.position) <= deliveryRadius;
  useEffect(() => {
    stateRef.current = state;
    finishRef.current = onFinish;
  }, [state, onFinish]);
  useEffect(() => {
    if (state.delivered.length === parkLitter.length && !didFinishRef.current) {
      didFinishRef.current = true;
      finishRef.current();
    }
  }, [state.delivered.length]);

  useEffect(() => {
    if (!state.started) return;
    let frame = 0;
    let previous = 0;
    let wasWalking = false;
    const clearControls = () => {
      keysRef.current.clear();
      touchRef.current = null;
      targetRef.current = null;
    };
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.target instanceof HTMLElement &&
        event.target.matches("input, textarea, select")
      )
        return;
      const key = event.key.toLowerCase();
      const direction = keyDirections[key];
      if (direction) {
        event.preventDefault();
        targetRef.current = null;
        keysRef.current.add(key);
        if (!event.repeat) {
          const p = stateRef.current.position;
          dispatch({
            type: "move",
            position: { x: p.x + direction.x * 5, y: p.y + direction.y * 5 },
          });
        }
      } else if (key === "e" || key === " ") {
        if (
          key === " " &&
          event.target instanceof HTMLElement &&
          event.target.closest("button")
        )
          return;
        event.preventDefault();
        if (!event.repeat) dispatch({ type: "collect" });
      } else if (
        key === "enter" &&
        !(
          event.target instanceof HTMLElement &&
          event.target.closest("button, a")
        )
      ) {
        event.preventDefault();
        dispatch({ type: "deliver" });
      }
    }
    const onKeyUp = (event: KeyboardEvent) =>
      keysRef.current.delete(event.key.toLowerCase());
    function tick(now: number) {
      const elapsed = previous ? Math.min((now - previous) / 1000, 0.04) : 0;
      previous = now;
      const current = stateRef.current.position;
      let vector = touchRef.current ?? { x: 0, y: 0 };
      if (!touchRef.current) {
        for (const key of keysRef.current) {
          const direction = keyDirections[key];
          if (direction)
            vector = { x: vector.x + direction.x, y: vector.y + direction.y };
        }
      }
      const target = targetRef.current;
      let moving = false;
      if (vector.x || vector.y) {
        const length = Math.hypot(vector.x, vector.y);
        dispatch({
          type: "move",
          position: {
            x: current.x + (vector.x / length) * 34 * elapsed,
            y: current.y + (vector.y / length) * 34 * elapsed,
          },
        });
        moving = true;
      } else if (target) {
        const distance = parkDistance(target, current);
        if (distance < 0.3) targetRef.current = null;
        else {
          const step = Math.min(distance, 34 * elapsed);
          dispatch({
            type: "move",
            position: {
              x: current.x + ((target.x - current.x) / distance) * step,
              y: current.y + ((target.y - current.y) / distance) * step,
            },
          });
          moving = true;
        }
      }
      if (moving !== wasWalking) {
        setWalking(moving);
        wasWalking = moving;
      }
      frame = requestAnimationFrame(tick);
    }
    const onVisibility = () => {
      if (document.hidden) {
        clearControls();
        previous = 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearControls);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearControls();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", clearControls);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [state.started]);

  function walkTo(position: ParkPoint) {
    if (!state.started) return;
    keysRef.current.clear();
    touchRef.current = null;
    targetRef.current = position;
  }
  return (
    <section
      className="park-adventure"
      aria-label={t("Bog‘ qahramonlari o‘yini", "Игра Герои парка")}
    >
      <div className="park-hud">
        <span>
          <Trash2 size={17} /> {parkLitter.length - state.collected.length}{" "}
          <span>{t("qoldi", "осталось")}</span>
        </span>
        <span className="park-bag">
          <Backpack size={17} /> {carried}
        </span>
        <span className="park-score">
          <Trophy size={17} /> {state.collected.length * 10}
        </span>
      </div>
      <div
        className={`park-board ${state.started ? "is-playing" : "is-choosing"}`}
        role="group"
        aria-label={t("Yashil bog‘ maydoni", "Зелёный парк")}
        onPointerDown={(event) => {
          if (
            !state.started ||
            (event.target instanceof Element && event.target.closest("button"))
          )
            return;
          const bounds = event.currentTarget.getBoundingClientRect();
          walkTo({
            x: ((event.clientX - bounds.left) / bounds.width) * 100,
            y: ((event.clientY - bounds.top) / bounds.height) * 100,
          });
        }}
      >
        <img
          className="park-terrain"
          src="/images/park/terrain.png"
          alt=""
          draggable={false}
        />
        <div className="park-world">
          <button
            className={`park-bin ${canDeliver ? "is-ready" : ""}`}
            style={{ left: `${parkBin.x}%`, top: `${parkBin.y}%` }}
            onClick={() => walkTo(parkBin)}
            disabled={!state.started}
            aria-label={t("Chiqindi qutisi tomon yurish", "Идти к контейнеру")}
          >
            <span
              className="park-sprite"
              style={{ backgroundPosition: "100% 100%" }}
              aria-hidden="true"
            />
            {canDeliver && (
              <span className="park-bin-ready">
                <Recycle size={18} />
              </span>
            )}
          </button>
          {parkLitter
            .filter((item) => !state.collected.includes(item.id))
            .map((item) => (
              <button
                className={`park-litter ${nearest?.id === item.id && canCollect ? "is-near" : ""}`}
                key={item.id}
                style={{
                  left: `${item.position.x}%`,
                  top: `${item.position.y}%`,
                }}
                onClick={() => walkTo(item.position)}
                disabled={!state.started}
                aria-label={`${item.title[preferences.language]} ${t("tomon yurish", "— подойти")}`}
              >
                <span aria-hidden="true">{item.emoji}</span>
              </button>
            ))}
          <span
            className={`park-player ${walking ? "is-walking" : ""}`}
            style={{
              left: `${state.position.x}%`,
              top: `${state.position.y}%`,
            }}
            role="img"
            aria-label={character.name}
          >
            <span
              className="park-sprite"
              style={{ backgroundPosition: character.position }}
            />
            {carried > 0 && (
              <span className="park-carry-count">
                <Backpack size={12} />
                {carried}
              </span>
            )}
          </span>
        </div>
        {!state.started && (
          <div className="park-start-overlay">
            <h2>{t("Qahramoningni tanla", "Выбери героя")}</h2>
            <div className="park-character-row">
              {parkCharacters.map((hero) => (
                <button
                  key={hero.id}
                  className={`park-character ${character.id === hero.id ? "is-selected" : ""}`}
                  onClick={() => setCharacter(hero)}
                  aria-pressed={character.id === hero.id}
                >
                  <span className="park-avatar">
                    <span
                      className="park-sprite"
                      style={{ backgroundPosition: hero.position }}
                      aria-hidden="true"
                    />
                  </span>
                  <strong>{hero.name}</strong>
                  {character.id === hero.id && (
                    <Check className="park-selected-check" size={17} />
                  )}
                </button>
              ))}
            </div>
            <button
              className="park-action park-start-button"
              onClick={() => dispatch({ type: "start" })}
            >
              {t("Boshlash", "Начать")}
            </button>
            <p>{t("Bog‘ni birga tozalaymiz!", "Сделаем парк чистым!")}</p>
          </div>
        )}
      </div>
      {state.started ? (
        <>
          <p
            className="park-instruction"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.collected.length === parkLitter.length
              ? t(
                  "Hammasi yig‘ildi! Endi yashil qutiga topshir.",
                  "Всё собрано! Отнеси мусор в зелёный контейнер.",
                )
              : canCollect
                ? `${nearest!.title[preferences.language]} — ${t("yig‘ishga tayyor!", "можно собрать!")}`
                : canDeliver
                  ? t(
                      "Qutiga yetib kelding. Chiqindini topshir!",
                      "Ты у контейнера. Сдай мусор!",
                    )
                  : t(
                      "Chiqindi yoki yo‘lakka bosib, o‘sha joyga yur.",
                      "Нажми на мусор или дорожку, чтобы подойти.",
                    )}
          </p>
          <div className="park-controls">
            <div
              className="park-dpad"
              aria-label={t("Yurish tugmalari", "Кнопки движения")}
            >
              {directions.map(({ id, x, y, Icon, uz, ru }) => (
                <button
                  className={`park-direction park-direction-${id}`}
                  key={id}
                  aria-label={t(uz, ru)}
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.currentTarget.setPointerCapture(event.pointerId);
                    targetRef.current = null;
                    touchRef.current = { x, y };
                    dispatch({
                      type: "move",
                      position: {
                        x: state.position.x + x * 4,
                        y: state.position.y + y * 4,
                      },
                    });
                  }}
                  onPointerUp={() => {
                    touchRef.current = null;
                  }}
                  onPointerCancel={() => {
                    touchRef.current = null;
                  }}
                  onLostPointerCapture={() => {
                    touchRef.current = null;
                  }}
                  onClick={(event) => {
                    if (event.detail === 0) {
                      targetRef.current = null;
                      dispatch({
                        type: "move",
                        position: {
                          x: state.position.x + x * 5,
                          y: state.position.y + y * 5,
                        },
                      });
                    }
                  }}
                >
                  <Icon size={23} />
                </button>
              ))}
            </div>
            <div className="park-action-group">
              <button
                className="park-action park-collect"
                onClick={() => dispatch({ type: "collect" })}
                disabled={!canCollect}
              >
                <Trash2 size={18} />
                {t("Yig‘ish", "Собрать")}
              </button>
              <button
                className="park-action park-deliver"
                onClick={() => dispatch({ type: "deliver" })}
                disabled={!canDeliver}
              >
                <Recycle size={18} />
                {t("Topshirish", "Сдать")}
                {carried > 0 && <span>{carried}</span>}
              </button>
            </div>
          </div>
          <p className="park-keyboard-help">
            {t(
              "↑ ↓ ← → yoki WASD · Space / E: yig‘ish · Enter: topshirish",
              "↑ ↓ ← → или WASD · Space / E: собрать · Enter: сдать",
            )}
          </p>
          <div className="park-delivery-progress">
            <span>{t("Qutiga topshirildi", "Сдано в контейнер")}</span>
            <strong>
              {state.delivered.length} / {parkLitter.length}
            </strong>
          </div>
        </>
      ) : (
        <p className="park-intro-instruction">
          {t(
            "12 ta chiqindini yig‘ va yashil qutiga topshir.",
            "Собери 12 предметов и отнеси их в зелёный контейнер.",
          )}
        </p>
      )}
    </section>
  );
}
