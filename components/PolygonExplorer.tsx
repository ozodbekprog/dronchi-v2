"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  busySlots,
  dates,
  polygons,
  timeSlots,
  bookings as initialBookings,
  type Polygon,
} from "@/lib/data";
import Modal from "./Modal";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Compass,
  Info,
  MapPin,
  Shield,
  Sun,
  Wind,
} from "./Icons";

type Booking = {
  polygon: string;
  letter: string;
  code: string;
  iso: string;
  date: string;
  time: string;
  duration: string;
  total: string;
  state: string;
  stateType: string;
};

const filters = ["Barcha maydonlar", "Boshlang'ich", "FPV", "Erkin parvoz"] as const;

const weekdayFull: Record<string, string> = {
  Du: "Dushanba",
  Se: "Seshanba",
  Ch: "Chorshanba",
  Pa: "Payshanba",
  Ju: "Juma",
  Sh: "Shanba",
  Ya: "Yakshanba",
};

const formatSom = (value: number) => value.toLocaleString("en-US").replace(/,/g, " ");

const readHour = (time: string) => Number(time.slice(0, 2));

const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

export default function PolygonExplorer() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Barcha maydonlar");
  const [selected, setSelected] = useState<Polygon>(polygons[0]);
  const [dateIndex, setDateIndex] = useState(5);
  const [startIndex, setStartIndex] = useState(2);
  const [duration, setDuration] = useState(2);
  const [successOpen, setSuccessOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [details, setDetails] = useState<Booking | null>(null);
  const [historyFilter, setHistoryFilter] = useState<"Barchasi" | "Kelgusi" | "Tarix">("Barchasi");
  const [bookingList, setBookingList] = useState<Booking[]>(
    initialBookings.map((item) => ({ ...item }))
  );
  const dateStripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = dateStripRef.current;
    if (!strip || strip.scrollWidth <= strip.clientWidth) return;
    const active = strip.querySelector<HTMLElement>(".date-cell.is-active");
    if (!active) return;
    const stripBox = strip.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    strip.scrollLeft +=
      activeBox.left - stripBox.left - (strip.clientWidth - activeBox.width) / 2;
  }, [dateIndex]);

  const visiblePolygons =
    filter === "Barcha maydonlar" ? polygons : polygons.filter((item) => item.filter === filter);

  const startHour = readHour(timeSlots[startIndex]);
  const endTime = formatHour(startHour + duration);
  const total = selected.price * duration;

  const date = dates[dateIndex];

  const maxDuration = useMemo(() => {
    let limit = 1;
    for (let i = 1; i <= 4; i += 1) {
      if (startHour + i > 18) break;
      if (busySlots.includes(formatHour(startHour + i))) break;
      limit = i + 1;
    }
    return Math.min(limit, 4);
  }, [startHour]);

  const upcomingCount = bookingList.filter((item) => item.stateType === "ok").length;
  const historyCount = bookingList.length - upcomingCount;

  const historyRows = bookingList.filter((item) => {
    if (historyFilter === "Barchasi") return true;
    if (historyFilter === "Kelgusi") return item.stateType === "ok";
    return item.stateType !== "ok";
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const chooseStart = (index: number) => {
    const hour = readHour(timeSlots[index]);
    let allowed = 1;
    for (let i = 1; i <= 4; i += 1) {
      if (hour + i > 18) break;
      if (busySlots.includes(formatHour(hour + i))) break;
      allowed = i + 1;
    }
    setStartIndex(index);
    setDuration((current) => Math.min(current, Math.min(allowed, 4)));
  };

  const confirmBooking = () => {
    const code = `Bron № VP-${1043 + bookingList.length}`;
    const booking: Booking = {
      polygon: selected.name,
      letter: selected.letter,
      code,
      iso: `2026-11-${date.day.padStart(2, "0")}T${timeSlots[startIndex]}:00`,
      date: date.label,
      time: `${timeSlots[startIndex]}–${endTime}`,
      duration: `${duration} soat`,
      total: `${formatSom(total)} so'm`,
      state: "Tasdiqlangan",
      stateType: "ok",
    };
    setLastBooking(booking);
    setBookingList((items) => [booking, ...items]);
    setSuccessOpen(true);
  };

  const prepareSlot = (booking: Booking) => {
    const target = polygons.find((item) => item.name === booking.polygon);
    const match = dates.find((item) => booking.iso.includes(`-${item.day.padStart(2, "0")}T`));
    const start = timeSlots.findIndex(
      (slot) => slot === booking.iso.slice(11, 16)
    );
    if (target) setSelected(target);
    if (match) setDateIndex(dates.indexOf(match));
    if (start >= 0) setStartIndex(start);
    setHistoryFilter("Barchasi");
    window.setTimeout(() => scrollTo("bron"), 60);
  };

  const downloadCalendar = () => {
    const booking = bookingList.find((item) => item.stateType === "ok");
    if (!booking) return;
    const start = new Date(booking.iso);
    const end = new Date(start.getTime() + durationHours(booking.duration) * 3600 * 1000);
    const stamp = (value: Date) =>
      `${value.getFullYear()}${String(value.getMonth() + 1).padStart(2, "0")}${String(
        value.getDate()
      ).padStart(2, "0")}T${String(value.getHours()).padStart(2, "0")}${String(
        value.getMinutes()
      ).padStart(2, "0")}00`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//DRONCHI//Booking//UZ",
      "BEGIN:VEVENT",
      `UID:${booking.code.replace(/\s/g, "")}@dronchi.uz`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:DRONCHI — ${booking.polygon}`,
      "LOCATION:Toshkent, O'zbekiston",
      `DESCRIPTION:${booking.code}. Mashg'ulot: ${booking.date}, ${booking.time}.`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "dronchi-bron.ics";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <section className="section" id="maydonlar">
        <div className="container">
          <div className="section-head">
            <div className="section-head-copy">
              <span className="eyebrow">Mashq maydonlari</span>
              <h2>Sizga mos poligonni toping.</h2>
              <p className="lead">
                Mashg&apos;ulot turini tanlang. Har bir maydonning hududi, narxi va bo&apos;sh
                vaqtlarini solishtiring.
              </p>
            </div>
          </div>

          <div className="filter-row" style={{ marginTop: 0 }}>
            <div className="filter-left">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`tab${filter === item ? " is-active" : ""}`}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <span className="filter-right">
              <MapPin size={15} /> Toshkent viloyati
            </span>
          </div>

          <div className="polygons-grid">
            {visiblePolygons.map((polygon) => {
              const isSelected = selected.id === polygon.id;
              return (
                <article
                  key={polygon.id}
                  className={`polygon-card${isSelected ? " is-selected" : ""}`}
                >
                  <div className="polygon-map">
                    <Image
                      src={polygon.image}
                      alt={`${polygon.name} — sxematik xarita`}
                      fill
                      sizes="(max-width: 760px) 100vw, 390px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="polygon-body">
                    <div className="polygon-topline">
                      <span className="polygon-type">{polygon.type}</span>
                      {isSelected && <span className="polygon-selected">✓ Tanlangan</span>}
                    </div>
                    <h3>{polygon.name}</h3>
                    <p className="polygon-loc">{polygon.location}</p>
                    <div className="polygon-specs">
                      <span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <path d="M3 9h18M9 3v18" />
                        </svg>
                        {polygon.size}
                      </span>
                      <span>
                        <Clock size={13} /> {polygon.hours}
                      </span>
                    </div>
                    <div className="polygon-bottom">
                      <span className="polygon-price">
                        {formatSom(polygon.price)} so&apos;m
                        <small>1 soat uchun</small>
                      </span>
                      <button
                        type="button"
                        className="polygon-select"
                        onClick={() => setSelected(polygon)}
                        aria-pressed={isSelected}
                      >
                        {isSelected ? "Tanlangan" : "Tanlash"} <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="concept-note">
            <Info size={13} />
            Konsept namunalari: maydon nomlari, sxemalar, narxlar va bo&apos;sh vaqtlar namunaviy
            uchun berilgan. Haqiqiy manzil bron tasdiqlanganda ko&apos;rsatiladi.
          </p>
        </div>
      </section>

      <section className="section" id="bron" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow">Soatbay ijara</span>
          <h2 style={{ margin: "14px 0 10px" }}>Vaqtni belgilang. Parvozga tayyorlaning.</h2>
          <p className="lead">Maydon faqat tanlangan vaqt oralig&apos;ida ijaraga beriladi. Eng kam bron — 1 soat.</p>

          <div className="booking-grid">
            <div className="panel">
              <div className="panel-head">
                <h3>Bron tafsilotlari</h3>
                <span className="panel-link">{lastBooking ? "Yangi bron" : "Namunaviy bron"}</span>
              </div>

              <div className="booking-fields">
                <div className="field" style={{ marginBottom: 0 }}>
                  <label htmlFor="bron-polygon">Poligon</label>
                  <div style={{ position: "relative" }}>
                    <MapPin
                      size={15}
                      className="select-field-icon"
                      aria-hidden="true"
                    />
                    <select
                      id="bron-polygon"
                      className="select"
                      style={{ paddingLeft: 38 }}
                      value={selected.id}
                      onChange={(event) => {
                        const next = polygons.find((item) => item.id === event.target.value);
                        if (next) setSelected(next);
                      }}
                    >
                      {polygons.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.letter} · {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field" style={{ marginBottom: 0 }}>
                  <label htmlFor="bron-date">Mashg&apos;ulot sanasi</label>
                  <div style={{ position: "relative" }}>
                    <Calendar size={15} className="select-field-icon" aria-hidden="true" />
                    <select
                      id="bron-date"
                      className="select"
                      style={{ paddingLeft: 38 }}
                      value={dateIndex}
                      onChange={(event) => setDateIndex(Number(event.target.value))}
                    >
                      {dates.map((item, index) => (
                        <option key={item.day} value={index}>
                          {item.label} · {weekdayFull[item.weekday]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="date-strip" role="group" aria-label="Sana tanlash" ref={dateStripRef}>
                {dates.map((item, index) => (
                  <button
                    key={item.day}
                    type="button"
                    className={`date-cell${dateIndex === index ? " is-active" : ""}`}
                    onClick={() => setDateIndex(index)}
                    aria-pressed={dateIndex === index}
                  >
                    <span>{item.weekday}</span>
                    <b>{item.day}</b>
                  </button>
                ))}
              </div>

              <div className="time-head">
                <span style={{ fontSize: 12, color: "var(--text)", fontWeight: 800 }}>
                  Boshlanish vaqti va davomiyligi
                </span>
                <span>Har bir katak — 1 soat</span>
              </div>

              <div className="time-grid" role="group" aria-label="Boshlanish vaqti">
                {timeSlots.map((slot, index) => {
                  const isBusy = busySlots.includes(slot);
                  const isActive =
                    !isBusy &&
                    index >= startIndex &&
                    index < startIndex + duration;
                  return (
                    <button
                      key={slot}
                      type="button"
                      className={`time-cell${isActive ? " is-active" : ""}`}
                      disabled={isBusy}
                      aria-pressed={isActive}
                      onClick={() => chooseStart(index)}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <div className="time-legend">
                <span>
                  <i /> Bo&apos;sh
                </span>
                <span className="sel">
                  <i /> Tanlangan
                </span>
                <span className="busy">
                  <i /> Band
                </span>
              </div>

              <div className="duration-row">
                <div className="duration-info">
                  <span>Tanlangan vaqt</span>
                  <b>
                    {timeSlots[startIndex]} — {endTime}
                  </b>
                </div>
                <div className="stepper" aria-label="Davomiylik">
                  <button
                    type="button"
                    onClick={() => setDuration((value) => Math.max(1, value - 1))}
                    disabled={duration <= 1}
                    aria-label="Davomiylikni kamaytirish"
                  >
                    −
                  </button>
                  <b>{duration} soat</b>
                  <button
                    type="button"
                    onClick={() => setDuration((value) => Math.min(maxDuration, value + 1))}
                    disabled={duration >= maxDuration}
                    aria-label="Davomiylikni oshirish"
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="booking-note">
                <Shield size={13} />
                Narxga maydon ijarasi va xavfsizlik bo&apos;yicha qisqa yo&apos;riqnoma kiradi. Dron
                va instruktor xizmati kiritilmagan.
              </p>
            </div>

            <aside>
              <div className="panel summary-panel">
                <div className="summary-head">
                  <h3>Bron xulosasi</h3>
                  <Calendar size={17} className="muted" />
                </div>
                <p className="summary-polygon">{selected.name}</p>
                <p className="summary-date">
                  {date.label} · {timeSlots[startIndex]}–{endTime}
                </p>
                <div className="summary-lines">
                  <div className="summary-line">
                    <span>
                      {formatSom(selected.price)} so&apos;m × {duration} soat
                    </span>
                    <b>{formatSom(total)} so&apos;m</b>
                  </div>
                  <div className="summary-line">
                    <span>Xizmat haqi</span>
                    <b>0 so&apos;m</b>
                  </div>
                </div>
                <div className="summary-total">
                  <span>Jami</span>
                  <b>
                    {formatSom(total)} <small>so&apos;m</small>
                  </b>
                </div>
                <button
                  type="button"
                  className="btn btn-lime btn-wide summary-cta"
                  onClick={confirmBooking}
                >
                  Bronni tasdiqlash <ArrowUpRight size={15} />
                </button>
                <p className="summary-disclaimer">
                  Davom etish orqali ijara va bekor qilish shartlariga rozilik bildirasiz. Bu hali
                  tasdiqlangan bron emas.
                </p>
              </div>

              <div className="panel weather-panel">
                <div className="weather-head">
                  <h3>Parvoz oldidan ob-havo</h3>
                  <Sun size={22} />
                </div>
                <p className="weather-place">
                  {selected.name.split(" ")[0]} · {date.label}, {timeSlots[startIndex]}–
                  {endTime}
                </p>
                <div className="weather-main">
                  <span className="weather-temp">17°</span>
                  <div className="weather-desc">
                    <b>Ochiq osmon</b>
                    <span>His etilishi: 16°</span>
                  </div>
                </div>
                <div className="weather-stats">
                  <div>
                    <span>Shamol</span>
                    <b>3 m/s</b>
                  </div>
                  <div>
                    <span>Ko&apos;rish</span>
                    <b>5 km</b>
                  </div>
                  <div>
                    <span>Yog&apos;in</span>
                    <b>10%</b>
                  </div>
                </div>
                <p className="weather-note">
                  <Wind size={13} />
                  Namunaviy prognoz, jonli ma&apos;lumot emas. Parvozdan oldin yangilangan
                  ob-havo va dron cheklovlarini tekshiring.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" id="mening-bronlarim" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="bookings-head">
            <div>
              <span className="eyebrow">Shaxsiy reja</span>
              <h2>Mening bronlarim</h2>
              <p className="text-muted" style={{ fontSize: 14, color: "var(--muted)" }}>
                Yaqinlashayotgan mashg&apos;ulotlar va oldingi parvozlaringiz bir joyda.
              </p>
            </div>
            <button type="button" className="btn btn-outline btn-sm" onClick={downloadCalendar}>
              <Calendar size={15} /> Taqvimga qo&apos;shish
            </button>
          </div>

          <div className="bookings-filters" role="tablist" aria-label="Bronlar filtri">
            {(["Barchasi", "Kelgusi", "Tarix"] as const).map((item) => {
              const count =
                item === "Barchasi" ? bookingList.length : item === "Kelgusi" ? upcomingCount : historyCount;
              return (
                <button
                  key={item}
                  type="button"
                  className={`tab${historyFilter === item ? " is-active" : ""}`}
                  role="tab"
                  aria-selected={historyFilter === item}
                  onClick={() => setHistoryFilter(item)}
                >
                  {item} · {count}
                </button>
              );
            })}
          </div>

          <div className="bookings-table">
            <div className="bookings-row head">
              <span>Poligon</span>
              <span>Sana va vaqt</span>
              <span>Davomiylik</span>
              <span>Summa</span>
              <span>Holat</span>
              <span>Amallar</span>
            </div>
            {historyRows.map((item) => (
              <div className="bookings-row" key={item.code}>
                <div className="booking-poly">
                  <span className="letter">{item.letter}</span>
                  <div>
                    <b>{item.polygon}</b>
                    <span>{item.code}</span>
                  </div>
                </div>
                <div>
                  <b style={{ display: "block", fontSize: 11.5 }}>{item.date}</b>
                  <span style={{ color: "var(--muted)", fontSize: 10 }}>{item.time}</span>
                </div>
                <span>{item.duration}</span>
                <b>{item.total}</b>
                <span className={`booking-state ${item.state === "Tasdiqlangan" ? "" : item.stateType === "done" ? "done" : "cancel"}`}>
                  {item.state === "Tasdiqlangan" && <Check size={10} />}
                  {item.state}
                </span>
                <div className="booking-actions">
                  {item.stateType === "ok" && (
                    <button type="button" onClick={() => prepareSlot(item)}>
                      Vaqtini o&apos;zgartirish
                    </button>
                  )}
                  {item.stateType === "done" && (
                    <button type="button" onClick={() => prepareSlot(item)}>
                      Qayta bron qilish
                    </button>
                  )}
                  {item.stateType === "cancel" && (
                    <button type="button" onClick={() => setDetails(item)}>
                      Batafsil ko&apos;rish
                    </button>
                  )}
                  <button
                    type="button"
                    className="more"
                    aria-label="Batafsil ma'lumot"
                    onClick={() => setDetails(item)}
                  >
                    •••
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bookings-foot">
            <span>Namunaviy bronlar. Vaqtni o&apos;zgartirish yoki bekor qilish — boshlanishidan 12 soat oldin.</span>
            <Link href="/poligonlar#ijara-shartlari">
              Ijara shartlarini o&apos;qish <ArrowUpRight size={11} />
            </Link>
          </div>
        </div>
      </section>

      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        titleId="booking-success-title"
      >
        {lastBooking && (
          <div className="modal-success">
            <span className="success-icon">
              <Check size={26} />
            </span>
            <h3 id="booking-success-title">Bron tasdiqlandi</h3>
            <p>
              {lastBooking.polygon} · {lastBooking.date}, {lastBooking.time}.{" "}
              {lastBooking.code} raqami bilan saqlab qo&apos;ying.
            </p>
            <p>
              Jami: <b>{lastBooking.total}</b>. Bu namunaviy bron — haqiqiy to&apos;lov keyingi
              bosqichda ulanadi.
            </p>
            <div className="modal-actions" style={{ justifyContent: "center" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSuccessOpen(false);
                  window.setTimeout(() => scrollTo("mening-bronlarim"), 80);
                }}
              >
                Mening bronlarim <ArrowUpRight size={15} />
              </button>
              <button type="button" className="btn btn-outline" onClick={() => setSuccessOpen(false)}>
                Yopish
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={Boolean(details)}
        onClose={() => setDetails(null)}
        title="Bron tafsilotlari"
        titleId="booking-details-title"
      >
        {details && (
          <>
            <p className="summary-polygon">{details.polygon}</p>
            <p className="summary-date" style={{ borderBottom: 0, paddingBottom: 0 }}>
              {details.date} · {details.time} · {details.duration}
            </p>
            <div className="summary-lines">
              <div className="summary-line">
                <span>Bron raqami</span>
                <b>{details.code}</b>
              </div>
              <div className="summary-line">
                <span>Holat</span>
                <b>{details.state}</b>
              </div>
              <div className="summary-line">
                <span>Summa</span>
                <b>{details.total}</b>
              </div>
            </div>
            <p>
              Bron bo&apos;yicha savol bo&apos;lsa, yordam jamoasiga bron raqamini yuboring. Bu
              namunaviy yozuv — real tizim keyingi bosqichda ulanadi.
            </p>
            <div className="modal-actions">
              <a href="mailto:info@dronchi.uz" className="btn btn-primary">
                Yordamga yozish <ArrowUpRight size={15} />
              </a>
              <button type="button" className="btn btn-outline" onClick={() => setDetails(null)}>
                Yopish
              </button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

function durationHours(value: string) {
  const match = value.match(/\d+/);
  return match ? Number(match[0]) : 1;
}

export function PolygonHeroMap() {
  return (
    <div className="map-card">
      <Image
        src="/images/map-hero.webp"
        alt="Toshkent va atrofi xaritasi"
        width={491}
        height={200}
        priority
      />
      <span className="map-label">Toshkent va uning atrofi</span>
      <span className="map-button" aria-hidden="true">
        <Compass size={28} />
      </span>
      <div className="map-caption">
        <b>Xaritadan boshlang. Osmonda davom eting.</b>
        <span>Umumiy xarita · maydonlar quyida namunaviy belgilangan</span>
      </div>
    </div>
  );
}

export function PolygonCompass() {
  return <Compass size={28} />;
}
