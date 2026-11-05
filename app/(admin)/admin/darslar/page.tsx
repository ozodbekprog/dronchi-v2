import type { Metadata } from "next";
import AdminLessons from "@/components/admin/AdminLessons";

export const metadata: Metadata = {
  title: "Admin — darslar",
};

export default function AdminLessonsPage() {
  return (
    <div className="admin-page">
      <AdminLessons />
    </div>
  );
}
