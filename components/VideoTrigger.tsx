"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "./Modal";
import { ArrowUpRight, Play } from "./Icons";

type VideoTriggerProps = {
  className?: string;
  children: ReactNode;
  label: string;
  poster?: string;
  title?: string;
};

export default function VideoTrigger({
  className = "",
  children,
  label,
  poster = "/images/fpv-video.webp",
  title = "DRONCHI — kurs bilan tanishing",
}: VideoTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)} aria-label={label}>
        {children}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title={title} titleId="video-dialog-title" wide>
        <p>
          Video taqdimot namunasi. To&apos;liq kurs videosi va interaktiv darslar platformaga keyingi
          bosqichda ulanadi.
        </p>
        <div className="modal-poster" style={{ position: "relative", aspectRatio: "16 / 9" }}>
          <Image
            src={poster}
            alt="DRONCHI kursi taqdimoti"
            fill
            sizes="(max-width: 760px) 100vw, 700px"
            style={{ objectFit: "cover" }}
          />
          <span
            className="play-btn"
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            aria-hidden="true"
          >
            <Play size={20} />
          </span>
        </div>
        <div className="modal-actions">
          <Link href="/akademiya/fpv-asoslari" className="btn btn-primary" onClick={() => setOpen(false)}>
            Kurs haqida <ArrowUpRight size={15} />
          </Link>
          <Link href="/royxatdan-otish" className="btn btn-outline" onClick={() => setOpen(false)}>
            Ro&apos;yxatdan o&apos;tish
          </Link>
        </div>
      </Modal>
    </>
  );
}
