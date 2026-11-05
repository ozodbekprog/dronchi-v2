import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Award, Bell, BookOpen, Check, Flame, Globe, Shield, Star } from "@/components/Icons";
import PageHead from "@/components/app/PageHead";

export const metadata: Metadata = {
  title: "Profil",
};

const ACHIEVEMENTS = [
  { icon: <Star size={17} />, title: "Birinchi qadam", text: "Birinchi darsni yakunladingiz", done: true },
  { icon: <Flame size={17} />, title: "3 kun seriya", text: "Ketma-ket 3 kun o'qidingiz", done: true },
  { icon: <Award size={17} />, title: "100 XP", text: "100 XP to'pladingiz", done: true },
  { icon: <BookOpen size={17} />, title: "5 dars", text: "5 ta dars yakunlang", done: false },
  { icon: <Check size={17} />, title: "Test ustasi", text: "5 ta testni xatosiz o'ting", done: false },
  { icon: <Globe size={17} />, title: "Ko'p tilli", text: "2 tilda darslarni ko'ring", done: false },
];

export default function ProfilePage() {
  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Profil"
          text="Hisobingiz, natijalar va sozlamalar. Demo hisobda barcha ma'lumotlar namuna sifatida ko'rsatiladi."
          action={
            <Link href="/kirish" className="btn btn-outline btn-sm">
              Hisobdan chiqish
            </Link>
          }
        />

        <div className="profile-layout">
          <div className="dash-col">
            <section className="dash-card profile-card">
              <div className="profile-head">
                <span className="profile-avatar">AK</span>
                <div>
                  <h2>Aziz Karimov</h2>
                  <p>demo@dronchi.uz</p>
                  <span className="dash-chip dash-chip--blue">Lvl 2 · 160 XP</span>
                </div>
              </div>
              <div className="profile-stats">
                <div>
                  <strong>6</strong>
                  <span>kunlik seriya</span>
                </div>
                <div>
                  <strong>8</strong>
                  <span>dars</span>
                </div>
                <div>
                  <strong>1</strong>
                  <span>sertifikat</span>
                </div>
                <div>
                  <strong>#7</strong>
                  <span>reyting</span>
                </div>
              </div>
            </section>

            <section className="dash-card">
              <div className="dash-card-head">
                <h2>Yutuqlar</h2>
                <span className="dash-chip">3 / 6</span>
              </div>
              <div className="badge-grid" id="yutuqlar">
                {ACHIEVEMENTS.map((badge) => (
                  <div className={`badge-tile${badge.done ? " is-done" : ""}`} key={badge.title}>
                    <span>{badge.icon}</span>
                    <div>
                      <strong>{badge.title}</strong>
                      <em>{badge.text}</em>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="dash-col">
            <section className="dash-card">
              <div className="dash-card-head">
                <h2>Sozlamalar</h2>
              </div>
              <div className="settings-list">
                <div>
                  <span>
                    <Globe size={15} /> Til
                  </span>
                  <b>O&apos;zbekcha</b>
                </div>
                <div>
                  <span>
                    <Bell size={15} /> Bildirishnomalar
                  </span>
                  <b>Yoqilgan</b>
                </div>
                <div>
                  <span>
                    <Shield size={15} /> Xavfsizlik
                  </span>
                  <b>Demo hisob</b>
                </div>
              </div>
            </section>

            <section className="dash-card">
              <div className="dash-card-head">
                <h2>Tezkor havolalar</h2>
              </div>
              <div className="quick-links">
                <Link href="/kabinet/kurslarim">
                  <BookOpen size={15} /> Mening kurslarim <ArrowUpRight size={14} />
                </Link>
                <Link href="/kabinet/sertifikatlar">
                  <Award size={15} /> Sertifikatlar <ArrowUpRight size={14} />
                </Link>
                <Link href="/kabinet/reyting">
                  <Flame size={15} /> Reyting <ArrowUpRight size={14} />
                </Link>
                <Link href="/">
                  <Globe size={15} /> Asosiy sayt <ArrowUpRight size={14} />
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
