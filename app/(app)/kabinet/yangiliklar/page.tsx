import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "@/components/Icons";
import PageHead from "@/components/app/PageHead";
import { news } from "@/lib/data";

export const metadata: Metadata = {
  title: "Yangiliklar",
};

export default function AppNewsPage() {
  const feature = news[0];
  const rest = news.slice(1);

  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Yangiliklar"
          text="Platforma yangiliklari, kurslar va muhim e'lonlar. Hammasi kabinet ichida."
          action={<span className="page-badge">{news.length} yangilik</span>}
        />

        <Link href={`/kabinet/yangiliklar/${feature.id}`} className="news-feature">
          <div className="news-feature-cover">
            <Image
              src={feature.image}
              alt={feature.title}
              fill
              sizes="(max-width: 900px) 92vw, 620px"
              style={{ objectFit: "cover" }}
              priority
            />
            <span className="app-course-badge">{feature.type}</span>
          </div>
          <div className="news-feature-body">
            <span className="news-date">{feature.dateUz} · {feature.read}</span>
            <h2>{feature.title}</h2>
            <p>{feature.excerpt}</p>
            <div className="news-tags">
              {feature.tags?.slice(0, 4).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <span className="dash-link">
              To&apos;liq o&apos;qish <ArrowUpRight size={14} />
            </span>
          </div>
        </Link>

        <div className="news-grid">
          {rest.map((item) => (
            <Link href={`/kabinet/yangiliklar/${item.id}`} className="news-card" key={item.id}>
              <div className="news-card-cover">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 800px) 92vw, 420px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="news-card-body">
                <span className="news-date">
                  {item.dateUz} · <Clock size={11} /> {item.read}
                </span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span className="dash-link">
                  Batafsil <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
