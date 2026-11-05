import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
  title: "Kabinet — asosiy",
  description:
    "DRONCHI kabineti: kurslar, kunlik maqsad, seriya, XP va haftalik reyting bir joyda.",
};

export default function KabinetPage() {
  return <Dashboard />;
}
