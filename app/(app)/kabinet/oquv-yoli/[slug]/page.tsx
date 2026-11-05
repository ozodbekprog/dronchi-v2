import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CoursePath from "@/components/app/CoursePath";
import PageHead from "@/components/app/PageHead";
import { PATH_COURSES } from "@/lib/app-data";

export function generateStaticParams() {
  return PATH_COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = PATH_COURSES.find((item) => item.slug === slug);
  return { title: course ? `O'quv yo'li — ${course.title}` : "O'quv yo'li" };
}

export default async function CoursePathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = PATH_COURSES.find((item) => item.slug === slug);
  if (!course) notFound();

  const done = course.lessons.filter((lesson) => lesson.state === "done").length;

  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title={course.title}
          text={`${course.category} · ${course.level} · ${course.duration}. Darslarni ketma-ket yakunlang.`}
          action={
            <span className="page-badge">
              {done}/{course.lessons.length} dars yakunlandi
            </span>
          }
        />
        <CoursePath course={course} />
      </div>
    </div>
  );
}
