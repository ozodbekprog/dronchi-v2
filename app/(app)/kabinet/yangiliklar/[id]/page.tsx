import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "@/components/Icons";
import PageHead from "@/components/app/PageHead";
import { news } from "@/lib/data";

export function generateStaticParams() {
  return news.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = news.find((entry) => entry.id === id);
  return { title: item?.title ?? "Yangilik" };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = news.find((entry) => entry.id === id);
  if (!item) notFound();

  const paragraphs = item.body ?? [item.excerpt];

  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <Link href="/kabinet/yangiliklar" className="back-link">
          <ChevronLeft size={14} /> Yangiliklarga qaytish
        </Link>

        <article className="news-detail">
          <PageHead title={item.title} text={`${item.dateUz} · ${item.read}`} eyebrow={item.type} />

          <div className="news-detail-cover">
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 900px) 92vw, 900px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className="news-detail-body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
            {item.tags && (
              <div className="news-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
