import type { Metadata } from "next";
import AdminOrders from "@/components/admin/AdminOrders";

export const metadata: Metadata = {
  title: "Admin — buyurtmalar",
};

export default function AdminOrdersPage() {
  return (
    <div className="admin-page">
      <AdminOrders />
    </div>
  );
}
