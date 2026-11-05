import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import VideoTrigger from "./VideoTrigger";
import { ArrowUpRight, Play, Target } from "./Icons";

type HomeHeroProps = {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  primarySlot?: ReactNode;
  chipLead: string;
  chipText: string;
  meta?: string;
  metaIcon?: ReactNode;
  caption?: string;
};

export default function HomeHero({
  eyebrow,
  title,
  lead,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  primarySlot,
  chipLead,
  chipText,
  meta,
  metaIcon,
  caption = "DRONCHI / PARVOZGA TAYYORGARLIK",
}: HomeHeroProps) {
  return (
    <section className="container" style={{ paddingTop: 18 }}>
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow on-blue">{eyebrow}</span>
            <h1 className="hero-title">{title}</h1>
            <p className="hero-lead">{lead}</p>
            <div className="hero-actions">
              {primarySlot ?? (
                <Link href={primaryHref} className="btn btn-lime">
                  {primaryLabel} <ArrowUpRight size={16} />
                </Link>
              )}
              {secondaryLabel && (
                <VideoTrigger
                  className="hero-play"
                  label={secondaryLabel}
                  title="DRONCHI — kurs bilan tanishing"
                >
                  {secondaryLabel}
                  <span className="play-dot" aria-hidden="true">
                    <Play size={10} />
                  </span>
                </VideoTrigger>
              )}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-photo">
              <div className="photo">
                <Image
                  src="/images/hero-product.webp"
                  alt="Dron va boshqaruv pulti"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 560px"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="hero-photo-caption">{caption}</span>
            </div>

            <div className="hero-chip">
              <Target size={19} />
              <div>
                {chipLead}
                <b>{chipText}</b>
              </div>
            </div>

            {meta ? (
              <span className="hero-meta-chip">
                {metaIcon}
                {meta}
              </span>
            ) : (
              <Link href="/royxatdan-otish" className="hero-chip-bottom">
                <span className="round">
                  <ArrowUpRight size={15} />
                </span>
                Birinchi parvozga tayyormisiz?
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
