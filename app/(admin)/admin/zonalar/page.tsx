import type { Metadata } from "next";
import AdminCollection from "@/components/admin/AdminCollection";
import { polygons } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin — zonalar",
};

const INITIAL = polygons.map((zone) => ({
  id: zone.id,
  title: zone.name,
  type: zone.type,
  size: zone.size,
  price: `${zone.price.toLocaleString("uz-UZ")} so'm`,
  status: "Faol",
}));

export default function AdminZonesPage() {
  return (
    <div className="admin-page">
      <AdminCollection
        storageKey="dronchi-admin-zones"
        initial={INITIAL}
        titleKey="title"
        subtitleKey="type"
        columns={[
          { key: "size", label: "O'lcham" },
          { key: "price", label: "Narx", kind: "strong" },
          { key: "status", label: "Holat" },
        ]}
        searchKeys={["title", "type"]}
        addFields={[
          { key: "title", label: "Zona nomi", placeholder: "Masalan: Yangi poligon" },
          { key: "type", label: "Turi", placeholder: "FPV va to'siqlar" },
          { key: "size", label: "O'lcham", placeholder: "80 × 100 m" },
          { key: "price", label: "Narx", placeholder: "150 000 so'm" },
        ]}
        addLabel="Yangi zona"
        addTitle="Yangi poligon qo'shish"
        statusKey="status"
        onValue="Faol"
        offValue="Yopilgan"
        onLabel="Ochish"
        offLabel="Yopish"
      />
    </div>
  );
}
