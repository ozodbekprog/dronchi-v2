import type { Metadata } from "next";
import PageHead from "@/components/app/PageHead";
import ShopGrid from "@/components/app/ShopGrid";

export const metadata: Metadata = {
  title: "Do'kon",
};

export default function ShopPage() {
  return (
    <div className="dash app-page">
      <div className="dash-wrap">
        <PageHead
          title="Do'kon"
          text="O'quv to'plamlari, ehtiyot qismlar va aksessuarlar. Buyurtmani shu yerdan boshlang."
          action={<span className="page-badge">3 mahsulot</span>}
        />
        <ShopGrid />
      </div>
    </div>
  );
}
