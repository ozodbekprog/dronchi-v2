import type { Metadata } from "next";
import AdminCollection from "@/components/admin/AdminCollection";
import { EVENTS } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Admin — tadbirlar",
};

const INITIAL = EVENTS.map((event) => ({
  id: event.id,
  title: event.title,
  date: event.date,
  place: event.place,
  seats: event.seats,
  status: "Ochiq",
}));

export default function AdminEventsPage() {
  return (
    <div className="admin-page">
      <AdminCollection
        storageKey="dronchi-admin-events"
        initial={INITIAL}
        titleKey="title"
        subtitleKey="place"
        columns={[
          { key: "date", label: "Sana" },
          { key: "seats", label: "Joylar" },
          { key: "status", label: "Holat" },
        ]}
        searchKeys={["title", "place"]}
        addFields={[
          { key: "title", label: "Tadbir nomi", placeholder: "Masalan: UAV trening" },
          { key: "date", label: "Sana", placeholder: "12-noyabr, 2026" },
          { key: "place", label: "Joy", placeholder: "Ko'ksoy poligoni" },
          { key: "seats", label: "Joylar", placeholder: "0 / 12 joy" },
        ]}
        addLabel="Yangi tadbir"
        addTitle="Yangi tadbir qo'shish"
        statusKey="status"
        onValue="Ochiq"
        offValue="Yopilgan"
        onLabel="Ochish"
        offLabel="Yopish"
      />
    </div>
  );
}
