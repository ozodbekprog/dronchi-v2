"use client";

import { useState } from "react";
import Link from "next/link";
import type { Tariff } from "@/lib/data";
import { updateDemoTariff } from "@/lib/demo";
import useDemoSession from "@/lib/useDemoSession";
import { ArrowUpRight, CheckCircle } from "./Icons";

type TariffGridProps = {
  tariffs: Tariff[];
};

export default function TariffGrid({ tariffs }: TariffGridProps) {
  const { session } = useDemoSession();
  const [notice, setNotice] = useState<string | null>(null);
  const ownedTariff = session ? tariffs.find((tariff) => tariff.id === session.tariff) : null;

  const chooseTariff = (tariff: Tariff) => {
    const updated = updateDemoTariff(tariff.id);
    if (!updated) return;
    setNotice(
      `Demo rejimi: ${tariff.name} tarifi hisobingizga biriktirildi. To'lov talab qilinmaydi.`
    );
  };

  return (
    <>
      {session && ownedTariff && (
        <div className="demo-plan-banner" role="status">
          <span className="demo-plan-icon" aria-hidden="true">
            <CheckCircle size={19} />
          </span>
          <div className="demo-plan-copy">
            <span className="eyebrow">Demo hisob</span>
            <b>{ownedTariff.name} tarifi allaqachon xarid qilingan</b>
            <p>Qayta to&apos;lov talab qilinmaydi — FPV asoslari kursini to&apos;g&apos;ridan-to&apos;g&apos;ri davom ettiring.</p>
          </div>
          <Link href="/akademiya/fpv-asoslari" className="btn btn-lime">
            Kursni davom ettirish <ArrowUpRight size={15} />
          </Link>
        </div>
      )}

      {notice && (
        <p className="demo-plan-notice" role="status">
          {notice}
        </p>
      )}

      <div className="tariff-grid">
        {tariffs.map((tariff) => {
          const highlight = Boolean(tariff.highlight);
          const isOwned = session?.tariff === tariff.id;
          const base = tariff.features.slice(0, 3);
          const extra = tariff.features.slice(3);
          return (
            <article
              key={tariff.id}
              className={`tariff-card${highlight ? " is-highlight" : ""}${isOwned ? " is-owned" : ""}`}
            >
              <span className="tariff-badge">
                {isOwned ? "Sizning tarifingiz" : tariff.badge}
              </span>
              <h3>{tariff.name}</h3>
              <p className="tariff-sub">{tariff.sub}</p>
              <p className="tariff-price">
                {tariff.price} <small>so&apos;m</small>
              </p>
              <p className="tariff-per">Bir martalik to&apos;lov · 1 o&apos;quvchi uchun</p>
              {isOwned ? (
                <Link href="/akademiya/fpv-asoslari" className="btn btn-lime">
                  Kursni boshlash <ArrowUpRight size={15} />
                </Link>
              ) : session ? (
                <button
                  type="button"
                  className={`btn ${highlight ? "btn-lime" : "btn-outline"}`}
                  onClick={() => chooseTariff(tariff)}
                >
                  Shu tarifni tanlash <ArrowUpRight size={15} />
                </button>
              ) : (
                <Link
                  href={`/royxatdan-otish?tarif=${tariff.id}`}
                  className={`btn ${highlight ? "btn-lime" : "btn-primary"}`}
                >
                  Sotib olish <ArrowUpRight size={15} />
                </Link>
              )}
              {isOwned && (
                <p className="tariff-owned-note">
                  <CheckCircle size={12} /> Demo hisobda faol · to&apos;lov talab qilinmaydi
                </p>
              )}
              {session && !isOwned && (
                <p className="tariff-owned-note is-muted">
                  Demo rejimida bepul almashtirish
                </p>
              )}
              <div className="tariff-divider" />
              <p className="tariff-list-label">FPV asoslari</p>
              <ul className="tariff-list">
                {base.map((feature) => (
                  <li key={feature}>
                    <CheckCircle size={14} /> {feature}
                  </li>
                ))}
              </ul>
              <ul className="tariff-list">
                {extra.map((feature) => (
                  <li key={feature}>
                    <CheckCircle size={14} /> {feature}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </>
  );
}
