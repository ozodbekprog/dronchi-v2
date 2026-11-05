import type { Metadata } from "next";
import AdminCollection from "@/components/admin/AdminCollection";

export const metadata: Metadata = {
  title: "Admin — bildirishnomalar",
};

const INITIAL = [
  {
    id: "n1",
    title: "Yangi kurs: Drone Mapping",
    audience: "Barcha o'quvchilar",
    date: "19-sentabr, 2026",
    status: "Yuborilgan",
  },
  {
    id: "n2",
    title: "Racing Cup — ro'yxatdan o'tish",
    audience: "Reyting: top 20",
    date: "16-noyabr, 2026",
    status: "Yuborilgan",
  },
  {
    id: "n3",
    title: "Haftalik natijalar",
    audience: "Faol o'quvchilar",
    date: "5-noyabr, 2026",
    status: "Qoralama",
  },
];

export default function AdminNotificationsPage() {
  return (
    <div className="admin-page">
      <AdminCollection
        storageKey="dronchi-admin-notifications"
        initial={INITIAL}
        titleKey="title"
        subtitleKey="audience"
        columns={[
          { key: "audience", label: "Kimga" },
          { key: "date", label: "Sana" },
          { key: "status", label: "Holat" },
        ]}
        searchKeys={["title", "audience"]}
        addFields={[
          { key: "title", label: "Sarlavha", placeholder: "Bildirishnoma sarlavhasi" },
          { key: "audience", label: "Kimga", placeholder: "Barcha o'quvchilar" },
        ]}
        addLabel="Yangi xabar"
        addTitle="Bildirishnoma yaratish"
        statusKey="status"
        onValue="Yuborilgan"
        offValue="Qoralama"
        onLabel="Yuborish"
        offLabel="Qoralamaga"
        minWidth={720}
      />
    </div>
  );
}
