"use client";

import Link from "next/link";
import useDemoSession from "@/lib/useDemoSession";
import { ArrowUpRight, CheckCircle } from "./Icons";

type CourseStartButtonProps = {
  className?: string;
  showNote?: boolean;
};

export default function CourseStartButton({
  className = "btn btn-lime",
  showNote = false,
}: CourseStartButtonProps) {
  const { session } = useDemoSession();
  const owned = Boolean(session);

  return (
    <>
      {owned && showNote && (
        <span className="course-owned-box">
          <CheckCircle size={13} /> Demo tarifi faol — qayta xarid talab qilinmaydi
        </span>
      )}
      <Link href={owned ? "/akademiya/fpv-asoslari#dastur" : "/tariflar"} className={className}>
        {owned ? "Kursni davom ettirish" : "Kursni boshlash"} <ArrowUpRight size={15} />
      </Link>
      {showNote && (
        <p className="course-info-note">
          {owned ? "Darslarni to'xtagan joyingizdan davom ettiring" : "Onlayn · O'z sur'atingizda o'rganing"}
        </p>
      )}
    </>
  );
}
