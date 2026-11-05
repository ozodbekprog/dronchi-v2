import type { Metadata } from "next";
import AdminCollection from "@/components/admin/AdminCollection";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin — do'kon",
};

const INITIAL = products.map((product) => ({
  id: product.id,
  title: product.title,
  price: `${product.price} so'm`,
  stock: "12 dona",
  status: "Faol",
}));

export default function AdminShopPage() {
  return (
    <div className="admin-page">
      <AdminCollection
        storageKey="dronchi-admin-shop"
        initial={INITIAL}
        titleKey="title"
        subtitleKey="price"
        columns={[
          { key: "price", label: "Narx", kind: "strong" },
          { key: "stock", label: "Ombor" },
          { key: "status", label: "Holat" },
        ]}
        searchKeys={["title"]}
        addFields={[
          { key: "title", label: "Mahsulot nomi", placeholder: "Masalan: FPV kit" },
          { key: "price", label: "Narx", placeholder: "1 200 000 so'm" },
          { key: "stock", label: "Ombor", placeholder: "10 dona" },
        ]}
        addLabel="Yangi mahsulot"
        addTitle="Yangi mahsulot qo'shish"
        statusKey="status"
        onValue="Faol"
        offValue="Nofaol"
        onLabel="Yoqish"
        offLabel="O'chirish"
      />
    </div>
  );
}
