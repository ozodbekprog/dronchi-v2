import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LessonView from "@/components/app/LessonView";
import { PATH_COURSES } from "@/lib/app-data";

export function generateStaticParams() {
  return PATH_COURSES.flatMap((course) =>
    course.lessons.map((_, index) => ({
      slug: course.slug,
      lesson: String(index + 1),
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}): Promise<Metadata> {
  const { slug, lesson } = await params;
  const course = PATH_COURSES.find((item) => item.slug === slug);
  const index = Number(lesson) - 1;
  const item = course?.lessons[index];
  return { title: item ? item.title : "Dars" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson } = await params;
  const course = PATH_COURSES.find((item) => item.slug === slug);
  const index = Number(lesson) - 1;

  if (!course || !Number.isInteger(index) || index < 0 || index >= course.lessons.length) {
    notFound();
  }

  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <LessonView course={course} index={index} />
      </div>
    </div>
  );
}
