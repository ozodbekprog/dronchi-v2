import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Users } from "@/components/Icons";
import PageHead from "@/components/app/PageHead";
import { EVENTS } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Tadbirlar",
};

export default function EventsPage() {
  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Tadbirlar"
          text="Treninglar, musobaqalar va workshoplar. Joyni oldindan band qiling — guruhlar kichik."
          action={<span className="page-badge">{EVENTS.length} yaqin tadbir</span>}
        />

        <div className="event-grid">
          {EVENTS.map((event) => (
            <article className="event-card" key={event.id}>
              <div className="event-cover">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 800px) 92vw, 420px"
                  style={{ objectFit: "cover" }}
                />
                <span className="app-course-badge">{event.type}</span>
              </div>
              <div className="event-body">
                <span className="event-date">
                  <Calendar size={13} /> {event.date} · {event.time}
                </span>
                <h3>{event.title}</h3>
                <p>{event.text}</p>
                <div className="event-meta">
                  <span>
                    <MapPin size={13} /> {event.place}
                  </span>
                  <span>
                    <Users size={13} /> {event.seats}
                  </span>
                </div>
                <Link href="/kabinet/zonalar#bron" className="btn btn-primary btn-sm">
                  Joy band qilish
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
