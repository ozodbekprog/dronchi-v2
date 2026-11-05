import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  Card,
  Check,
  GraduationCap,
  News,
  Plus,
  Users,
} from "@/components/Icons";
import { courses } from "@/lib/data";
import { COURSE_PROGRESS } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Admin — umumiy",
};

const QUICK = [
  {
    href: "/admin/darslar#yangi-dars",
    icon: <Plus size={18} />,
    title: "Dars qo'shish",
    text: "Yangi dars qo'shing, tahrirlang yoki yashiring.",
  },
  {
    href: "/admin/kurslar",
    icon: <BookOpen size={18} />,
    title: "Kurslar",
    text: "Nom, kategoriya va nashr holatini boshqaring.",
  },
  {
    href: "/admin/foydalanuvchilar",
    icon: <Users size={18} />,
    title: "Foydalanuvchilar",
    text: "Rolni o'zgartiring yoki hisobni bloklang.",
  },
];

export default function AdminOverviewPage() {
  const published = courses.slice(0, 4);

  return (
    <div className="admin-page">
      <div className="page-stats">
        <div>
          <span className="app-stat-icon">
            <BookOpen size={18} />
          </span>
          <strong>9</strong>
          <em>kurs</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--lime">
            <GraduationCap size={18} />
          </span>
          <strong>45</strong>
          <em>dars</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--gold">
            <Users size={18} />
          </span>
          <strong>248</strong>
          <em>foydalanuvchi</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--violet">
            <Award size={18} />
          </span>
          <strong>76%</strong>
          <em>yakunlash</em>
        </div>
        <div>
          <span className="app-stat-icon">
            <Card size={18} />
          </span>
          <strong>5</strong>
          <em>buyurtma</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--lime">
            <News size={18} />
          </span>
          <strong>3</strong>
          <em>yangilik</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--gold">
            <Calendar size={18} />
          </span>
          <strong>4</strong>
          <em>tadbir</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--violet">
            <Award size={18} />
          </span>
          <strong>2</strong>
          <em>sertifikat</em>
        </div>
      </div>

      <div className="admin-overview-grid">
        <section className="dash-card">
          <div className="dash-card-head">
            <h2>Kurslar bo&apos;yicha darslar</h2>
            <Link href="/admin/kurslar" className="dash-link">
              Barchasi
            </Link>
          </div>
          <div className="admin-progress-list">
            {published.map((course) => {
              const progress = COURSE_PROGRESS[course.slug];
              return (
                <div key={course.slug}>
                  <div>
                    <strong>{course.title}</strong>
                    <span>{course.lessons}</span>
                  </div>
                  <span className="app-course-track" aria-hidden="true">
                    <span style={{ width: `${progress?.percent ?? 60}%` }} />
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="dash-card admin-changes">
          <div className="dash-card-head">
            <h2>So&apos;nggi o&apos;zgarishlar</h2>
            <span className="dash-chip">Bugun</span>
          </div>
          <div className="admin-changes-empty">
            <span>
              <Check size={16} />
            </span>
            <p>Hozircha o&apos;zgarish yo&apos;q. Kurs yoki darsni tahrirlaganingizda shu yerda ko&apos;rinadi.</p>
          </div>
        </section>
      </div>

      <div className="admin-quick">
        {QUICK.map((item) => (
          <Link href={item.href} key={item.href} className="dash-card admin-quick-card">
            <span className="app-stat-icon">{item.icon}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </div>

      <section className="dash-card">
        <div className="dash-card-head">
          <h2>Kurslar</h2>
          <Link href="/admin/kurslar" className="dash-link">
            Barchasi <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="admin-table">
          <div className="admin-row admin-head">
            <span>Nomi</span>
            <span>Kategoriya</span>
            <span>Daraja</span>
            <span>Darslar</span>
            <span>Holat</span>
          </div>
          {published.map((course) => (
            <div className="admin-row" key={course.slug}>
              <span className="admin-user">{course.title}</span>
              <span>{course.category}</span>
              <span>{course.level}</span>
              <span>{course.lessons}</span>
              <span className="admin-status is-on">Nashrda</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
