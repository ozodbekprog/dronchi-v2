"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, Clock } from "@/components/Icons";
import { PATH_COURSES } from "@/lib/app-data";

const STORAGE_KEY = "dronchi-admin-hidden-lessons";

export default function AdminLessons() {
  const [courseSlug, setCourseSlug] = useState(PATH_COURSES[0].slug);
  const [hidden, setHidden] = useState<string[]>([]);
  const [custom, setCustom] = useState<Record<string, { title: string; minutes: number; xp: number }[]>>({});
  const [hydrated, setHydrated] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", minutes: "10", xp: "20" });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setHidden(parsed.filter((item) => typeof item === "string"));
      }
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
    try {
      const rawCustom = localStorage.getItem("dronchi-admin-custom-lessons");
      if (rawCustom) {
        const parsedCustom = JSON.parse(rawCustom);
        if (parsedCustom && typeof parsedCustom === "object") setCustom(parsedCustom);
      }
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
    if (typeof window !== "undefined" && window.location.hash === "#yangi-dars") {
      setAddOpen(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hidden));
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
  }, [hidden, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("dronchi-admin-custom-lessons", JSON.stringify(custom));
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
  }, [custom, hydrated]);

  const course = useMemo(
    () => PATH_COURSES.find((item) => item.slug === courseSlug) ?? PATH_COURSES[0],
    [courseSlug]
  );
  const totalLessons =
    PATH_COURSES.reduce((sum, item) => sum + item.lessons.length, 0) +
    Object.values(custom).reduce((sum, list) => sum + list.length, 0);
  const customForCourse = custom[course.slug] ?? [];
  const allLessons = [
    ...course.lessons,
    ...customForCourse.map((lesson) => ({
      ...lesson,
      text: "Qo'lda qo'shilgan dars.",
      state: "locked" as const,
    })),
  ];

  const toggle = (key: string) => {
    setHidden((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  };

  return (
    <>
      <div className="page-stats">
        <div>
          <span className="app-stat-icon">
            <Clock size={18} />
          </span>
          <strong>{totalLessons}</strong>
          <em>jami dars</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--lime">
            <Check size={18} />
          </span>
          <strong>{totalLessons - hidden.length}</strong>
          <em>nashrda</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--gold">
            <ArrowUpRight size={18} />
          </span>
          <strong>{hidden.length}</strong>
          <em>yashirilgan</em>
        </div>
      </div>

      <section className="dash-card">
        <div className="dash-card-head">
          <h2>Darslar</h2>
          <div className="admin-head-actions">
            <span className="dash-chip">{course.title} · {allLessons.length} dars</span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setAddOpen((current) => !current)}
            >
              + Yangi dars
            </button>
          </div>
        </div>

        {addOpen && (
          <form
            className="admin-add-form"
            id="yangi-dars"
            onSubmit={(event) => {
              event.preventDefault();
              const title = draft.title.trim();
              if (!title) return;
              setCustom((current) => ({
                ...current,
                [course.slug]: [
                  ...(current[course.slug] ?? []),
                  {
                    title,
                    minutes: Number(draft.minutes) || 10,
                    xp: Number(draft.xp) || 20,
                  },
                ],
              }));
              setDraft({ title: "", minutes: "10", xp: "20" });
              setAddOpen(false);
            }}
          >
            <strong>Yangi dars qo&apos;shish — {course.title}</strong>
            <div className="admin-add-grid">
              <label>
                <span>Dars nomi</span>
                <input
                  value={draft.title}
                  onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
                  placeholder="Masalan: Yangi mashq"
                  required
                />
              </label>
              <label>
                <span>Daqiqa</span>
                <input
                  type="number"
                  value={draft.minutes}
                  onChange={(event) => setDraft((current) => ({ ...current, minutes: event.target.value }))}
                />
              </label>
              <label>
                <span>XP</span>
                <input
                  type="number"
                  value={draft.xp}
                  onChange={(event) => setDraft((current) => ({ ...current, xp: event.target.value }))}
                />
              </label>
            </div>
            <div className="admin-add-actions">
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setAddOpen(false)}>
                Bekor qilish
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                Saqlash
              </button>
            </div>
          </form>
        )}

        <div className="filter-row admin-course-filter">
          {PATH_COURSES.map((item) => (
            <button
              key={item.slug}
              type="button"
              className={item.slug === courseSlug ? "is-active" : undefined}
              onClick={() => setCourseSlug(item.slug)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="admin-lesson-table">
          <div className="admin-lesson-row admin-lesson-head">
            <span>#</span>
            <span>Dars nomi</span>
            <span>Davomiyligi</span>
            <span>XP</span>
            <span>Holat</span>
            <span>Amallar</span>
          </div>
          {allLessons.map((lesson, index) => {
            const key = `${course.slug}:${index}`;
            const off = hidden.includes(key);
            return (
              <div className="admin-lesson-row" key={lesson.title}>
                <span className="admin-lesson-num">{index + 1}</span>
                <span className="admin-lesson-name">
                  <strong>{lesson.title}</strong>
                  <em>{lesson.text}</em>
                </span>
                <span>{lesson.minutes} daqiqa</span>
                <span>{lesson.xp} XP</span>
                <span className={`admin-status${off ? "" : " is-on"}`}>
                  {off ? "Yashirilgan" : "Nashrda"}
                </span>
                <span className="admin-course-actions">
                  {index < course.lessons.length ? (
                    <Link
                      href={`/kabinet/oquv-yoli/${course.slug}/${index + 1}`}
                      className="dash-link"
                    >
                      Ko&apos;rish <ArrowUpRight size={12} />
                    </Link>
                  ) : (
                    <span className="dash-chip">Yangi</span>
                  )}
                  <button type="button" onClick={() => toggle(key)}>
                    {off ? "Ko'rsatish" : "Yashirish"}
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
