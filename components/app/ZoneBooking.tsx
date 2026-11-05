"use client";

import { useState } from "react";
import { Check, Clock, MapPin, Sparkle } from "@/components/Icons";
import { dates, polygons } from "@/lib/data";
import { ZONE_BOOKING_SLOTS } from "@/lib/app-data";

export default function ZoneBooking() {
  const [zoneId, setZoneId] = useState(polygons[0].id);
  const [date, setDate] = useState(dates[3].label);
  const [slot, setSlot] = useState("10:00");
  const [done, setDone] = useState(false);

  const zone = polygons.find((item) => item.id === zoneId) ?? polygons[0];

  return (
    <section className="dash-card zone-booking" id="bron">
      <div className="dash-card-head">
        <h2>Poligonni bron qilish</h2>
        <span className="dash-chip dash-chip--lime">
          <Sparkle size={12} /> Onlayn
        </span>
      </div>

      <div className="zone-pick">
        {polygons.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === zoneId ? "is-active" : undefined}
            onClick={() => {
              setZoneId(item.id);
              setDone(false);
            }}
          >
            <span>{item.letter}</span>
            <div>
              <strong>{item.name}</strong>
              <em>{item.type}</em>
            </div>
          </button>
        ))}
      </div>

      <div className="zone-booking-row">
        <div>
          <span className="zone-label">Sana</span>
          <div className="chip-scroll">
            {dates.map((item) => (
              <button
                key={item.label}
                type="button"
                className={item.label === date ? "is-active" : undefined}
                onClick={() => {
                  setDate(item.label);
                  setDone(false);
                }}
              >
                <b>{item.day}</b>
                <em>{item.weekday}</em>
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="zone-label">Vaqt</span>
          <div className="chip-scroll time-slots">
            {ZONE_BOOKING_SLOTS.map((item) => (
              <button
                key={item}
                type="button"
                className={item === slot ? "is-active" : undefined}
                onClick={() => {
                  setSlot(item);
                  setDone(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="zone-summary">
        <div>
          <span>
            <MapPin size={14} /> {zone.name}
          </span>
          <span>
            <Clock size={14} /> {date} · {slot}
          </span>
        </div>
        <b>{zone.price.toLocaleString("uz-UZ")} so&apos;m / soat</b>
      </div>

      {done ? (
        <div className="zone-success" role="status">
          <span>
            <Check size={16} />
          </span>
          <div>
            <strong>Bron qabul qilindi</strong>
            <p>
              {zone.name} · {date}, {slot}. Tasdiqlash xabari Telegram orqali yuboriladi.
            </p>
          </div>
          <button type="button" onClick={() => setDone(false)}>
            Bekor qilish
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-primary btn-wide" onClick={() => setDone(true)}>
          Bron qilish
        </button>
      )}
    </section>
  );
}
