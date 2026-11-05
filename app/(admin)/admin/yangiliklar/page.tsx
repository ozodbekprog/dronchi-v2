import type { Metadata } from "next";
import AdminCollection from "@/components/admin/AdminCollection";
import { news } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin — yangiliklar",
};

const INITIAL = news.map((item) => ({
  id: item.id,
  title: item.title,
  excerpt: item.excerpt,
  category: item.type,
  date: item.dateUz,
  status: "Nashrda",
}));

export default function AdminNewsPage() {
  return (
    <div className="admin-page">
      <AdminCollection
        storageKey="dronchi-admin-news"
        initial={INITIAL}
        titleKey="title"
        subtitleKey="excerpt"
        columns={[
          { key: "category", label: "Kategoriya" },
          { key: "date", label: "Sana" },
          { key: "status", label: "Holat" },
        ]}
        searchKeys={["title", "category"]}
        addFields={[
          { key: "title", label: "Sarlavha", placeholder: "Yangilik sarlavhasi" },
          { key: "category", label: "Kategoriya", placeholder: "News / Event / Update" },
          { key: "excerpt", label: "Qisqa matn", placeholder: "Qisqa tavsif" },
        ]}
        addLabel="Yangi yangilik"
        addTitle="Yangi yangilik qo'shish"
        statusKey="status"
        onValue="Nashrda"
        offValue="Qoralama"
        onLabel="Nashr qilish"
        offLabel="Qoralamaga"
      />
    </div>
  );
}
