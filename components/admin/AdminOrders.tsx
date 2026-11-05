"use client";

import { useEffect, useMemo, useState } from "react";
import { BarChart, Card, Clock, Search } from "@/components/Icons";

type Order = {
  id: string;
  customer: string;
  item: string;
  amount: number;
  date: string;
  status: string;
};

const STATUSES = ["Yangi", "To'lovda", "Yetkazilmoqda", "Yakunlangan"];

const INITIAL: Order[] = [
  { id: "#1042", customer: "Aziz Karimov", item: "FPV asoslari kursi", amount: 490000, date: "5-noyabr, 2026", status: "To'lovda" },
  { id: "#1041", customer: "Malika Yusupova", item: "FPV Quadcopter Kit", amount: 2450000, date: "4-noyabr, 2026", status: "Yetkazilmoqda" },
  { id: "#1040", customer: "Bekzod Tursunov", item: "Drone Racing kursi", amount: 690000, date: "3-noyabr, 2026", status: "Yangi" },
  { id: "#1039", customer: "Dilnoza Rahimova", item: "Poligon bron", amount: 120000, date: "2-noyabr, 2026", status: "Yakunlangan" },
  { id: "#1038", customer: "Sardor Aliyev", item: "Xavfsiz parvoz kursi", amount: 390000, date: "1-noyabr, 2026", status: "Yangi" },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(INITIAL);
  const [query, setQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dronchi-admin-orders");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setOrders(parsed);
      }
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("dronchi-admin-orders", JSON.stringify(orders));
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
  }, [orders, hydrated]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (order) =>
        order.customer.toLowerCase().includes(q) ||
        order.item.toLowerCase().includes(q) ||
        order.id.toLowerCase().includes(q)
    );
  }, [orders, query]);

  const revenue = orders
    .filter((order) => order.status === "Yakunlangan")
    .reduce((sum, order) => sum + order.amount, 0);
  const active = orders.filter((order) => order.status !== "Yakunlangan").length;

  return (
    <>
      <div className="page-stats">
        <div>
          <span className="app-stat-icon">
            <Card size={18} />
          </span>
          <strong>{orders.length}</strong>
          <em>jami buyurtma</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--gold">
            <Clock size={18} />
          </span>
          <strong>{active}</strong>
          <em>faol buyurtma</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--lime">
            <BarChart size={18} />
          </span>
          <strong>{revenue.toLocaleString("uz-UZ")} so&apos;m</strong>
          <em>tushum</em>
        </div>
      </div>

      <section className="dash-card admin-collection">
        <div className="admin-toolbar">
          <label className="admin-search admin-search--icon">
            <span>Buyurtma qidirish</span>
            <div>
              <Search size={14} />
              <input
                type="search"
                placeholder="Mijoz, mahsulot yoki raqam..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </label>
          <span className="dash-chip">{list.length} ta natija</span>
        </div>

        <div className="admin-order-table">
          <div className="admin-order-row admin-order-head">
            <span>Buyurtma</span>
            <span>Mijoz</span>
            <span>Mahsulot</span>
            <span>Summa</span>
            <span>Sana</span>
            <span>Holat</span>
          </div>
          {list.map((order) => (
            <div className="admin-order-row" key={order.id}>
              <span className="admin-order-id">{order.id}</span>
              <span>{order.customer}</span>
              <span>{order.item}</span>
              <span className="is-strong">{order.amount.toLocaleString("uz-UZ")} so&apos;m</span>
              <span>{order.date}</span>
              <span>
                <select
                  className="admin-select"
                  value={order.status}
                  onChange={(event) =>
                    setOrders((current) =>
                      current.map((entry) =>
                        entry.id === order.id
                          ? { ...entry, status: event.target.value }
                          : entry
                      )
                    )
                  }
                  aria-label={`${order.id} holati`}
                >
                  {STATUSES.map((status) => (
                    <option value={status} key={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          ))}
          {list.length === 0 && <p className="admin-empty">Buyurtma topilmadi.</p>}
        </div>
      </section>
    </>
  );
}
