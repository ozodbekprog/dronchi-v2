import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Ruler } from "@/components/Icons";
import PageHead from "@/components/app/PageHead";
import ZoneBooking from "@/components/app/ZoneBooking";
import { polygons } from "@/lib/data";

export const metadata: Metadata = {
  title: "Zonalar",
};

export default function ZonesPage() {
  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Zonalar va poligonlar"
          text="Uchish maydonini tanlang, sana va vaqtni belgilang. Bron darhol kabinetda ko'rinadi."
          action={<span className="page-badge">3 poligon</span>}
        />

        <div className="zones-layout">
          <div className="zone-list">
            {polygons.map((zone) => (
              <article className="zone-card" key={zone.id}>
                <div className="zone-cover">
                  <Image
                    src={zone.image}
                    alt={zone.name}
                    fill
                    sizes="(max-width: 800px) 92vw, 360px"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="zone-letter">{zone.letter}</span>
                </div>
                <div className="zone-body">
                  <span className="app-course-cat">{zone.type}</span>
                  <h3>{zone.name}</h3>
                  <p>
                    <MapPin size={13} /> {zone.location}
                  </p>
                  <div className="zone-meta">
                    <span>
                      <Ruler size={13} /> {zone.size}
                    </span>
                    <span>
                      <Clock size={13} /> {zone.hours}
                    </span>
                  </div>
                  <div className="zone-foot">
                    <b>{zone.price.toLocaleString("uz-UZ")} so&apos;m / soat</b>
                    <Link href="#bron" className="dash-link">
                      Bron qilish
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="zone-map">
            <Image
              src="/images/map-hero.webp"
              alt="Poligonlar xaritasi"
              fill
              sizes="(max-width: 1100px) 92vw, 520px"
              style={{ objectFit: "cover" }}
            />
            <div className="zone-map-overlay">
              <span>
                <MapPin size={14} /> Toshkent atrofi
              </span>
              <b>3 faol poligon</b>
            </div>
          </div>
        </div>

        <ZoneBooking />
      </div>
    </div>
  );
}
