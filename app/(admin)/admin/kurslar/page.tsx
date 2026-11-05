import type { Metadata } from "next";
import AdminCourses from "@/components/app/AdminCourses";

export const metadata: Metadata = {
  title: "Admin — kurslar",
};

export default function AdminCoursesPage() {
  return (
    <div className="admin-page">
      <AdminCourses />
    </div>
  );
}
