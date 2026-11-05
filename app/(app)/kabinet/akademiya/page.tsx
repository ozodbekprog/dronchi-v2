import type { Metadata } from "next";
import AcademyGrid from "@/components/app/AcademyGrid";
import PageHead from "@/components/app/PageHead";

export const metadata: Metadata = {
  title: "Akademiya",
};

export default function AcademyPage() {
  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Akademiya"
          text="To'qqiz yo'nalish, amaliy darslar va testlar. O'zingizga mos kursni tanlab, o'quv yo'lini boshlang."
          action={<span className="page-badge">9 kurs · 4 tilda</span>}
        />
        <AcademyGrid />
      </div>
    </div>
  );
}
