"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { articleBody, news, type NewsItem } from "@/lib/data";
import Modal from "./Modal";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./Icons";

const filters = [
  { label: "Barchasi", type: null },
  { label: "Yangiliklar", type: "News" },
  { label: "Tadbirlar", type: "Event" },
  { label: "Platforma yangilanishlari", type: "Update" },
] as const;

export default function NewsExplorer() {
  const [filterIndex, setFilterIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [reading, setReading] = useState<NewsItem | null>(null);

  const activeType = filters[filterIndex].type;
  const items = activeType ? news.filter((item) => item.type === activeType) : news;
  const feature = items[0];
  const rest = items.slice(1);

  useEffect(() => {
    setCollapsed(false);
  }, [filterIndex]);

  const featureBody = feature?.id === "kurslar-ochildi" ? articleBody : feature?.body ?? [];

  return (
    <>
      <div className="news-toolbar">
        <div className="tabs" role="tablist" aria-label="Yangiliklar filtri">
          {filters.map((item, index) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={filterIndex === index}
              className={`tab${filterIndex === index ? " is-active" : ""}`}
              onClick={() => setFilterIndex(index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="news-count">{items.length} ta maqola</span>
      </div>

      {feature && (
        <article className="article-feature">
          <div className="article-feature-head">
            <div>
              <div className="news-meta" style={{ color: "var(--primary)" }}>
                <span>{feature.type}</span>
                <span className="dot" />
                <span>{feature.date}</span>
              </div>
              <h2>{feature.title}</h2>
            </div>
            <button
              type="button"
              className="article-toggle"
              aria-expanded={!collapsed}
              aria-label={collapsed ? "Maqolani ochish" : "Maqolani yopish"}
              onClick={() => setCollapsed((value) => !value)}
            >
              <ArrowDown
                size={17}
                style={{ transform: collapsed ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s ease" }}
              />
            </button>
          </div>

          <div className="article-feature-media">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              sizes="(max-width: 760px) 100vw, 1180px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className={`article-body${collapsed ? " is-collapsed" : ""}`}>
            <div className="article-body-inner">
              <div className="article-content">
                <aside className="article-aside">
                  <b>DRONCHI akademiyasi</b>
                  <span>
                    {feature.dateUz} · {feature.read} mutolaa
                  </span>
                  {feature.tags && (
                    <div className="article-tags">
                      {feature.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  )}
                </aside>
                <div className="article-text">
                  <h3>{feature.excerpt}</h3>
                  {featureBody.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                  ))}
                  <div className="article-quote">
                    <b>Har bir parvoz xavfsizlikdan boshlanadi</b>
                    <p>
                      Barcha yo&apos;nalishlarda uskunani tekshirish, xavfsiz hududni tanlash va
                      mas&apos;uliyatli boshqarish qoidalariga alohida e&apos;tibor beriladi.
                    </p>
                  </div>
                  <p>
                    Dronlar bilan endi tanishayotgan bo&apos;lsangiz, avval &ldquo;Dron boshqaruvi
                    asoslari&rdquo; kursidan boshlashingiz mumkin. Akademiya bo&apos;limida
                    yo&apos;nalishlar bilan tanishib, qiziqishingizga mos kursni tanlang.
                  </p>
                </div>
              </div>
              <div className="article-foot">
                <Link href="/akademiya" className="link-arrow">
                  Kurslarni ko&apos;rish <ArrowRight size={14} />
                </Link>
                <span className="small">
                  {collapsed
                    ? "Maqolani ochish uchun yuqoridagi ↓ tugmasini bosing"
                    : "Maqolani yopish uchun yuqoridagi ↑ tugmasini bosing"}
                </span>
              </div>
            </div>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="article-list">
          {rest.map((item) => (
            <article className="article-row" key={item.id}>
              <div className="article-row-img">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="135px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="article-row-body">
                <div className="news-meta">
                  <span>{item.type}</span>
                  <span className="dot" />
                  <span>{item.date}</span>
                </div>
                <h3>{item.title}</h3>
              </div>
              <div className="article-row-side">
                <button
                  type="button"
                  className="link-arrow"
                  onClick={() => setReading(item)}
                  style={{ background: "none", border: 0, padding: 0 }}
                >
                  To&apos;liq o&apos;qish <ArrowUpRight size={12} />
                </button>
                <button
                  type="button"
                  className="circle-link"
                  onClick={() => setReading(item)}
                  aria-label={`${item.title} — to'liq o'qish`}
                >
                  <ArrowDown size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal
        open={Boolean(reading)}
        onClose={() => setReading(null)}
        title={reading?.title}
        titleId="article-dialog-title"
        wide
      >
        {reading && (
          <>
            <div className="news-meta" style={{ color: "var(--primary)" }}>
              <span>{reading.type}</span>
              <span className="dot" />
              <span>{reading.dateUz}</span>
              <span className="dot" />
              <span>{reading.read}</span>
            </div>
            <div className="modal-poster" style={{ position: "relative", aspectRatio: "2.2 / 1" }}>
              <Image
                src={reading.image}
                alt={reading.title}
                fill
                sizes="(max-width: 760px) 100vw, 700px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p>{reading.excerpt}</p>
            {reading.body?.map((paragraph) => <p key={paragraph.slice(0, 32)}>{paragraph}</p>)}
            <div className="modal-actions">
              <Link href="/akademiya" className="btn btn-primary" onClick={() => setReading(null)}>
                Kurslarni ko&apos;rish <ArrowUpRight size={15} />
              </Link>
              <button type="button" className="btn btn-outline" onClick={() => setReading(null)}>
                Yopish
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
