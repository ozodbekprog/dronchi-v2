import type { Metadata } from "next";
import { Flame, Sparkle } from "@/components/Icons";
import PageHead from "@/components/app/PageHead";
import { RATING } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Reyting",
};

export default function RatingPage() {
  const top = RATING.slice(0, 3);
  const you = RATING.find((row) => row.you);
  const yourRank = RATING.findIndex((row) => row.you) + 1;

  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Haftalik reyting"
          text="XP to'plang, seriyani saqlang va haftalik jadvalda yuqoriga ko'tariling. Har dushanba hisob yangilanadi."
          action={
            <span className="page-badge">
              <Flame size={13} /> 6 kunlik seriya
            </span>
          }
        />

        <div className="rating-podium">
          {top.map((user, index) => (
            <article className={`podium-card place-${index + 1}`} key={user.name}>
              <span className="podium-place">{index + 1}</span>
              <span className="podium-avatar">{user.initials}</span>
              <strong>{user.name}</strong>
              <em>Lvl {user.level} · {user.streak} kun</em>
              <b>{user.xp} XP</b>
            </article>
          ))}
        </div>

        <div className="rating-layout">
          <section className="dash-card rating-card">
            <div className="dash-card-head">
              <h2>Umumiy jadval</h2>
              <span className="dash-chip">Bu hafta</span>
            </div>
            <ol className="rating-table">
              {RATING.map((user, index) => (
                <li className={user.you ? "is-you" : undefined} key={user.name}>
                  <span className="rating-rank">{index + 1}</span>
                  <span className="rating-avatar">{user.initials}</span>
                  <span className="rating-name">
                    {user.name}
                    {user.you && <em>siz</em>}
                  </span>
                  <span className="rating-level">Lvl {user.level}</span>
                  <span className="rating-streak">
                    <Flame size={12} /> {user.streak}
                  </span>
                  <b>{user.xp} XP</b>
                </li>
              ))}
            </ol>
          </section>

          <aside className="dash-col">
            <section className="dash-ai">
              <div>
                <span className="dash-ai-badge">
                  <Sparkle size={13} /> Sizning o&apos;rningiz
                </span>
                <h2>#{yourRank} — {you?.xp ?? 160} XP</h2>
                <p>
                  Keyingi o&apos;ringa chiqish uchun yana{' '}
                  {(RATING[yourRank - 2]?.xp ?? 0) - (you?.xp ?? 0)} XP kerak.
                </p>
              </div>
            </section>

            <section className="dash-card">
              <div className="dash-card-head">
                <h2>Qanday ko&apos;tarilish mumkin?</h2>
              </div>
              <ul className="tips-list">
                <li>
                  <span>01</span> Har kuni bitta dars — seriya va bonus XP.
                </li>
                <li>
                  <span>02</span> Testlarni birinchi urinishda yakunlang.
                </li>
                <li>
                  <span>03</span> Amaliy topshiriqlarni bajaring.
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
