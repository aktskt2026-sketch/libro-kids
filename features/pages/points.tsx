"use client";
import Link from "@/components/app-link";
import { AppShell } from "@/layouts/app-shell";
import { Icon, Mascot, PageHeading } from "@/components/common";
import { Star, Check, Info } from "lucide-react";
import { useApp } from "@/hooks/use-app";
import { pointRules, POINT_REWARDS } from "@/data/point-rules";
import { dateKey } from "@/lib/progress";

export function PointsPage() {
  const { progress, preferences, ready, t } = useApp();
  const today = dateKey(new Date());
  return (
    <AppShell>
      <PageHeading
        back="/rewards"
        title={t("Ball mezonlari", "Правила начисления баллов")}
      />
      <div className="points-intro">
        <div className="points-mascot">
          <Mascot />
        </div>
        <p>
          {t(
            "Salom! Men Bilbiljon! Bilim olganing sari ballaring ham ko‘payadi.",
            "Привет! Я Билбильджон! Учись новому и собирай баллы.",
          )}
        </p>
        <span className="points-total">
          <Star size={21} fill="currentColor" />
          <strong>{ready ? progress.points : "…"}</strong>
          <small>{t("Mening ballarim", "Мои баллы")}</small>
        </span>
      </div>
      <div className="points-guide-grid">
        <section className="points-guide-card">
          <h2>{t("Qanday ball yig‘iladi?", "Как получать баллы?")}</h2>
          <div className="points-rules-list">
            {pointRules.map((rule) => {
              const done =
                ready &&
                (rule.id === "dailyGoal"
                  ? progress.dailyGoalDates.includes(today)
                  : rule.id === "wisdom"
                    ? progress.wisdomDates.includes(today)
                    : false);
              return (
                <Link
                  className="points-rule-row"
                  href={rule.href}
                  key={rule.id}
                >
                  <span className={`points-rule-icon ${rule.color}`}>
                    <Icon name={rule.icon} size={22} />
                  </span>
                  <div>
                    <strong>{rule.title[preferences.language]}</strong>
                    <small>
                      {rule.detail[preferences.language]}
                      {done && (
                        <span className="points-rule-done">
                          <Check size={12} />
                          {t("Bugun bajarildi", "Выполнено сегодня")}
                        </span>
                      )}
                    </small>
                  </div>
                  <span className="points-amount">
                    <Star size={12} fill="currentColor" />+
                    {POINT_REWARDS[rule.id]}
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="points-guide-note">
            <Info size={16} />
            {t(
              "Ballar ishni yakunlaganingda qo‘shiladi. Bugungi birinchi yangi kitob: +5 kitob bali va +3 kunlik bonus — jami +8!",
              "Баллы начисляются после завершения. Первая новая книга сегодня: +5 за книгу и +3 за цель — всего +8!",
            )}
          </p>
        </section>
        <div className="points-guide-side">
          <section className="points-guide-card">
            <h2>{t("Ballar nima uchun?", "Для чего нужны баллы?")}</h2>
            <div className="points-uses-list">
              <Link className="points-use-row" href="/rewards">
                <span className="points-rule-icon mint">
                  <Icon name="leaf" size={23} />
                </span>
                <div>
                  <strong>
                    {t("Bilim daraxtini o‘stir", "Расти Дерево знаний")}
                  </strong>
                  <small>
                    {t(
                      "0 balldan 180 ballgacha — 7 bosqich",
                      "7 этапов — от 0 до 180 баллов",
                    )}
                  </small>
                </div>
              </Link>
              <Link className="points-use-row" href="/rewards">
                <span className="points-rule-icon yellow">
                  <Icon name="trophy" size={22} />
                </span>
                <div>
                  <strong>
                    {t("Yangi nishonlarni och", "Открывай новые значки")}
                  </strong>
                  <small>
                    {t(
                      "O‘qish, bilim va tirishqoqlik uchun",
                      "За чтение, знания и старание",
                    )}
                  </small>
                </div>
              </Link>
              <div className="points-use-row">
                <span className="points-rule-icon pink">
                  <Icon name="shop" size={22} />
                </span>
                <div>
                  <strong>
                    {t("Do‘kondagi sovg‘alar", "Подарки в магазине")}
                  </strong>
                  <small>
                    {t(
                      "Tez kunda · hozircha xarid ochilmagan",
                      "Скоро · покупки пока недоступны",
                    )}
                  </small>
                </div>
                <span className="points-soon">{t("Tez kunda", "Скоро")}</span>
              </div>
            </div>
          </section>
          <section className="points-guide-card points-fair-play">
            <span className="points-fair-play-icon">
              <Icon name="shield" size={22} />
            </span>
            <h2>{t("Har bir mehnat qadrlanadi", "Каждое старание ценится")}</h2>
            <p>
              {t(
                "Bir kitob yoki o‘yinni qayta tugatish yangi mukofot bermaydi. Quizda oldingi eng yaxshi natijangdan oshgan ball qo‘shiladi.",
                "Повтор книги или игры не даёт новую награду. В викторине начисляется разница с прежним лучшим результатом.",
              )}
            </p>
            <p>
              {t(
                "Kunlik maqsad va odob darsi — kuniga bir martadan. Eski yutuqlaring saqlanadi; ular uchun ball qayta qo‘shilmaydi.",
                "Цель и урок доброты — по одному бонусу в день. Прежние достижения сохраняются без повторного начисления.",
              )}
            </p>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
