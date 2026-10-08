"use client";

import { useRef, useState, type ReactNode } from "react";
import { BookOpen, Film, Play, RotateCcw, Volume2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/hooks/use-app";
import type { Book, CartoonEpisode } from "@/types";

function duration(seconds: number) {
  const rounded = Math.round(seconds);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, "0")}`;
}

export function StoryMedia({
  book,
  children,
}: {
  book: Book;
  children: ReactNode;
}) {
  const { preferences, t } = useApp();
  const [tab, setTab] = useState(book.pages.length ? "read" : "watch");
  const [selected, setSelected] = useState(0);
  const episodes = book.cartoons ?? [];
  const episode = episodes[selected];
  return (
    <Tabs className="story-media" value={tab} onValueChange={setTab}>
      <TabsList
        className="story-media-tabs"
        aria-label={t("Ertak bo‘limlari", "Разделы сказки")}
      >
        <TabsTrigger value="read">
          <BookOpen size={20} />
          {t("O‘qish", "Читать")}
        </TabsTrigger>
        <TabsTrigger value="watch">
          <Film size={20} />
          {t("Multfilm", "Мультфильм")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="read">
        {children || (
          <section className="story-text-empty">
            <span className="icon-bubble lilac">
              <BookOpen size={32} />
            </span>
            <h2>
              {t(
                "Ertak matni hali qo‘shilmagan",
                "Текст сказки пока не добавлен",
              )}
            </h2>
            <p>
              {t(
                "Hozircha Maymoqvoyning multfilmini tomosha qilamiz!",
                "Пока посмотрим мультфильм о Маймоквое!",
              )}
            </p>
            <button className="primary-button" onClick={() => setTab("watch")}>
              <Play size={18} />
              {t("Multfilmni ko‘rish", "Смотреть мультфильм")}
            </button>
          </section>
        )}
      </TabsContent>
      <TabsContent value="watch">
        <div className="cartoon-layout">
          {episode && (
            <CartoonPlayer
              key={episode.id}
              episode={episode}
              storyTitle={book.title[preferences.language]}
            />
          )}
          <aside
            className="cartoon-episodes"
            aria-labelledby="episode-list-title"
          >
            <div className="cartoon-episodes-heading">
              <span className="icon-bubble lilac">
                <Film size={22} />
              </span>
              <div>
                <h2 id="episode-list-title">
                  {t("Ertak qismlari", "Серии сказки")}
                </h2>
                <p>
                  {episodes.length} {t("ta qism", "серия")}
                </p>
              </div>
            </div>
            <div className="cartoon-episode-list">
              {episodes.map((item, index) => (
                <button
                  key={item.id}
                  className="cartoon-episode"
                  aria-current={index === selected ? "true" : undefined}
                  onClick={() => setSelected(index)}
                >
                  <img src={item.poster} alt="" />
                  <span>
                    <strong>{item.title[preferences.language]}</strong>
                    <small>
                      {duration(item.durationSeconds)} ·{" "}
                      {item.language === "uz"
                        ? t("O‘zbekcha", "На узбекском")
                        : t("Ruscha", "На русском")}
                    </small>
                  </span>
                  <span className="episode-play">
                    <Play size={17} fill="currentColor" />
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function CartoonPlayer({
  episode,
  storyTitle,
}: {
  episode: CartoonEpisode;
  storyTitle: string;
}) {
  const { preferences, t } = useApp();
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [error, setError] = useState(false);
  const [playBlocked, setPlayBlocked] = useState(false);
  const title = episode.title[preferences.language];
  async function play() {
    const element = video.current;
    if (!element) return;
    if (ended) element.currentTime = 0;
    setPlayBlocked(false);
    try {
      await element.play();
    } catch {
      setPlayBlocked(true);
    }
  }
  return (
    <section className="cartoon-player" aria-label={`${storyTitle} · ${title}`}>
      <div className="cartoon-player-heading">
        <span>
          <Film size={21} />
          <strong>{title}</strong>
        </span>
        <span className="cartoon-language">
          <Volume2 size={16} />
          {episode.language === "uz"
            ? t("O‘zbekcha", "На узбекском")
            : t("Ruscha", "На русском")}
        </span>
      </div>
      <div className="cartoon-stage">
        <video
          ref={video}
          src={episode.source}
          poster={episode.poster}
          controls
          playsInline
          preload="metadata"
          tabIndex={0}
          aria-label={`${storyTitle} — ${title}`}
          onPlay={() => {
            setStarted(true);
            setEnded(false);
            setPlayBlocked(false);
          }}
          onEnded={() => setEnded(true)}
          onError={() => setError(true)}
        />
        {(!started || ended) && !error && (
          <button className="cartoon-start" onClick={play}>
            {ended ? (
              <RotateCcw size={25} />
            ) : (
              <Play size={27} fill="currentColor" />
            )}
            <span>
              {ended
                ? t("Yana tomosha qilish", "Смотреть ещё раз")
                : t("Tomosha qilish", "Смотреть")}
            </span>
          </button>
        )}
        {error && (
          <div className="cartoon-video-error" role="alert">
            <Film size={32} />
            <h3>{t("Video ochilmadi", "Видео не загрузилось")}</h3>
            <p>{t("Qayta yuklab ko‘ramiz.", "Попробуем загрузить снова.")}</p>
            <button
              className="primary-button"
              onClick={() => {
                setError(false);
                setStarted(false);
                setEnded(false);
                video.current?.load();
              }}
            >
              {t("Qayta yuklash", "Загрузить снова")}
            </button>
          </div>
        )}
      </div>
      <div className="cartoon-player-caption">
        <strong>{storyTitle}</strong>
        <span>{duration(episode.durationSeconds)}</span>
      </div>
      {playBlocked && (
        <p className="cartoon-play-notice" role="status">
          {t(
            "Videodagi boshlash tugmasini bosing.",
            "Нажмите кнопку воспроизведения на видео.",
          )}
        </p>
      )}
    </section>
  );
}
