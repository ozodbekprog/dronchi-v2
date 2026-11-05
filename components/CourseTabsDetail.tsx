"use client";

import { useState } from "react";
import { BookOpen, CheckCircle, Download, Play, Layers, Monitor } from "./Icons";

type Tab = "about" | "lessons" | "materials";

const tabs: { id: Tab; label: string }[] = [
  { id: "about", label: "Kurs haqida" },
  { id: "lessons", label: "Darslar" },
  { id: "materials", label: "Foydali materiallar" },
];

const materials = [
  {
    icon: BookOpen,
    title: "Parvozoldi tekshiruvi ro'yxati",
    meta: "PDF · 2 sahifa",
  },
  {
    icon: Layers,
    title: "FPV jihozlar Lug'ati",
    meta: "PDF · 6 sahifa",
  },
  {
    icon: Monitor,
    title: "Kamera sozlamalari jadvali",
    meta: "PDF · 1 sahifa",
  },
];

export default function CourseTabsDetail() {
  const [tab, setTab] = useState<Tab>("about");
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div>
      <div className="course-tabs" role="tablist" aria-label="Kurs bo'limlari">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={`course-tab${tab === item.id ? " is-active" : ""}`}
            onClick={() => {
              setTab(item.id);
              setNotice(null);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "about" && (
        <div className="course-about-text">
          <h2 className="h3" style={{ marginBottom: 12 }}>
            Kurs haqida
          </h2>
          <p>
            FPV (First Person View) texnologiyasi orqali dronlarni shaxs nuqtai nazaridan
            boshqarishni o&apos;rganasiz. Ushbu kursda sizga FPV tizimlari, jihozlar, kamera va
            transmitterlar, boshqaruv usullari hamda amaliy mashg&apos;ulotlar bosqichma-bosqich
            tushuntiriladi.
          </p>
          <div className="course-highlight-box">
            <span className="box-icon" aria-hidden="true">
              <Play size={15} />
            </span>
            <div>
              <b>Bilimdan — mustaqil parvozgacha</b>
              <p>
                Kursni tugatgandan so&apos;ng siz FPV dronlarni mustaqil boshqara olasiz va amaliy
                uchuvingizga tayyor bo&apos;lasiz.
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === "lessons" && (
        <div className="course-about-text">
          <h2 className="h3" style={{ marginBottom: 12 }}>
            8 mavzu · 18 dars
          </h2>
          <p>
            Kurs 8 ta mavzudan iborat. Har bir mavzu qisqa darslar va amaliy topshiriqlardan
            tashkil topgan. To&apos;liq dars ro&apos;yxati quyida keltirilgan.
          </p>
          <div className="course-highlight-box">
            <span className="box-icon" aria-hidden="true">
              <Layers size={15} />
            </span>
            <div>
              <b>O&apos;z sur&apos;atingizda o&apos;rganing</b>
              <p>
                Barcha darslar yozib olingan. Kursga 6 oy davomida kirish huquqingiz bor — istalgan
                vaqtda davom ettirishingiz mumkin.
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === "materials" && (
        <div className="course-about-text">
          <h2 className="h3" style={{ marginBottom: 12 }}>
            Foydali materiallar
          </h2>
          <p>
            Kurs davomida ishlatiladigan qo&apos;shimcha materiallar. Hujjatlar kurs ochilganda
            shaxsiy kabinetda yuklab olish uchun taqdim etiladi.
          </p>
          <div className="materials-grid">
            {materials.map((item) => {
              const Icon = item.icon;
              return (
                <div className="panel" key={item.title} style={{ padding: 18 }}>
                  <span className="course-fact-icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <b style={{ display: "block", margin: "10px 0 3px", fontSize: 13 }}>
                    {item.title}
                  </b>
                  <span style={{ fontSize: 10.5, color: "var(--muted)" }}>{item.meta}</span>
                  <button
                    type="button"
                    className="link-arrow"
                    style={{ marginTop: 10, background: "none", border: 0, padding: 0 }}
                    onClick={() => setNotice(`${item.title} — kurs ochilganda yuklab olinadi.`)}
                  >
                    Yuklab olish <Download size={13} />
                  </button>
                </div>
              );
            })}
          </div>
          {notice && (
            <p className="course-note" role="status" style={{ textAlign: "left" }}>
              <CheckCircle size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
              {notice}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
