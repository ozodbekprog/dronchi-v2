import type { Metadata } from "next";
import CoursePath from "@/components/app/CoursePath";
import PageHead from "@/components/app/PageHead";
import { PATH_COURSES } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "O'quv yo'li",
};

export default function LearningPathPage() {
  const course = PATH_COURSES[0];

  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="O'quv yo'li"
          text="Kursingizni tanlang va darslarni ketma-ket yakunlang. Har bir dars XP, test va yangi daraja olib keladi."
          action={<span className="page-badge">3/5 dars yakunlandi</span>}
        />
        <CoursePath course={course} />
      </div>
    </div>
  );
}
