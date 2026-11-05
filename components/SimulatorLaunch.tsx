"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Close, Lock, Sparkle } from "@/components/Icons";
import useDemoSession from "@/lib/useDemoSession";

const SIM_URL = "https://parvoz-drone-sim.duckdns.org/";
const OPEN_EVENT = "dronchi-sim-open";

function Expand({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
    </svg>
  );
}

export default function SimulatorLaunch({
  children,
  className = "btn btn-lime",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
    >
      {children}
    </button>
  );
}

export function SimulatorOverlay() {
  const { session } = useDemoSession();
  const hasAccess = Boolean(session?.tariff);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const show = () => {
      setMounted(true);
      setOpen(true);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "#oyna");
      }
    };
    const sync = () => {
      if (window.location.hash === "#oyna") {
        setMounted(true);
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    sync();
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("hashchange", sync);
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("no-scroll");
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!mounted || loaded || !hasAccess) return;
    const timer = window.setTimeout(() => setLoaded(true), 8000);
    return () => window.clearTimeout(timer);
  }, [mounted, loaded, hasAccess]);

  const close = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const fullscreen = async () => {
    try {
      await frameRef.current?.requestFullscreen();
    } catch {
      /* brauzer ruxsat bermasa, ichki fullscreen tugmasi ishlatiladi */
    }
  };

  if (!mounted) return null;

  return (
    <div
      className="sim-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Parvoz Drone Simulator"
      hidden={!open}
    >
      <div className="sim-overlay-bar">
        <div className="sim-overlay-brand">
          <span className="sim-overlay-logo">
            <Sparkle size={15} />
          </span>
          <div>
            <strong>Parvoz simulyatori</strong>
            <em>
              <i /> Sayt ichida · xavfsiz oyna
            </em>
          </div>
        </div>
        <div className="sim-overlay-actions">
          {hasAccess && (
            <button type="button" className="sim-overlay-btn" onClick={fullscreen}>
              <Expand size={15} /> <span>To&apos;liq ekran</span>
            </button>
          )}
          <button
            ref={closeRef}
            type="button"
            className="sim-overlay-close"
            onClick={close}
            aria-label="Simulyatorni yopish"
          >
            <Close size={16} /> <span>Yopish</span>
          </button>
        </div>
      </div>

      <div className="sim-overlay-stage">
        {!hasAccess ? (
          <div className="sim-locked">
            <span className="sim-locked-icon">
              <Lock size={24} />
            </span>
            <span className="eyebrow">Faqat o&apos;quvchilar uchun</span>
            <h2>Simulyator kurs sotib olgan o&apos;quvchilar uchun ochiladi.</h2>
            <p>
              Parvoz trenajyoriga kirish uchun hisobingizga kiring yoki kurs tarifini
              tanlang. Kurs xarid qilingan hisobda kirish avtomatik ochiladi.
            </p>
            <div className="sim-locked-actions">
              <Link href="/kirish?next=/simulyator" className="btn btn-primary">
                Kirish
              </Link>
              <Link href="/tariflar" className="btn btn-outline">
                Tariflarni ko&apos;rish
              </Link>
            </div>
            <span className="sim-locked-note">
              <Lock size={12} /> Faqat kurs egalari uchun
            </span>
          </div>
        ) : (
          <>
            {!loaded && (
              <div className="sim-overlay-loading" role="status">
                <span>
                  <Sparkle size={22} />
                </span>
                <strong>Parvoz yuklanmoqda...</strong>
                <em>Birinchi yuklashda ~299 MB resurs olinadi; keyingi safar keshdan ochiladi.</em>
              </div>
            )}
            <iframe
              ref={frameRef}
              src={SIM_URL}
              title="Parvoz Drone Simulator"
              className="sim-overlay-frame"
              allow="fullscreen; gamepad; autoplay; hid; clipboard-write"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-presentation allow-modals"
              referrerPolicy="no-referrer"
              onLoad={() => setLoaded(true)}
            />
          </>
        )}
      </div>
    </div>
  );
}
