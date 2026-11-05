import type { Metadata } from "next";
import AdminCollection from "@/components/admin/AdminCollection";
import { PATH_COURSES } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Admin — testlar",
};

const INITIAL = PATH_COURSES.map((course) => ({
  id: `test-${course.slug}`,
  title: `${course.title} — yakuniy test`,
  course: course.title,
  questions: course.lessons.length,
  status: "Faol",
}));

export default function AdminTestsPage() {
  return (
    <div className="admin-page">
      <AdminCollection
        storageKey="dronchi-admin-tests"
        initial={INITIAL}
        titleKey="title"
        subtitleKey="course"
        columns={[
          { key: "course", label: "Kurs" },
          { key: "questions", label: "Savollar", kind: "strong" },
          { key: "status", label: "Holat" },
        ]}
        searchKeys={["title", "course"]}
        addFields={[
          { key: "title", label: "Test nomi", placeholder: "Masalan: FPV yakuniy test" },
          { key: "course", label: "Kurs", placeholder: "Kurs nomi" },
          { key: "questions", label: "Savollar soni", type: "number", placeholder: "10" },
        ]}
        addLabel="Yangi test"
        addTitle="Yangi test qo'shish"
        statusKey="status"
        onValue="Faol"
        offValue="O'chirilgan"
        onLabel="Yoqish"
        offLabel="O'chirish"
      />
    </div>
  );
}
