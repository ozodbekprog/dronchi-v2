import type { Metadata } from "next";
import AdminUsers from "@/components/admin/AdminUsers";

export const metadata: Metadata = {
  title: "Admin — foydalanuvchilar",
};

export default function AdminUsersPage() {
  return (
    <div className="admin-page">
      <AdminUsers />
    </div>
  );
}
