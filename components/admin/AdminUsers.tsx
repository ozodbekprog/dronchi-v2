"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, GraduationCap, Search, Shield, Users } from "@/components/Icons";

const STORAGE_KEY = "dronchi-admin-blocked-users";

const USERS = [
  { id: "u1", name: "Aziz Karimov", email: "aziz@dronchi.uz", role: "O'quvchi", course: "FPV asoslari", active: "5-noyabr, 2026" },
  { id: "u2", name: "Malika Yusupova", email: "malika@dronchi.uz", role: "O'quvchi", course: "Drone Racing", active: "5-noyabr, 2026" },
  { id: "u3", name: "Bekzod Tursunov", email: "bekzod@dronchi.uz", role: "O'quvchi", course: "Dron boshqaruvi", active: "4-noyabr, 2026" },
  { id: "u4", name: "Dilnoza Rahimova", email: "dilnoza@dronchi.uz", role: "O'quvchi", course: "Drone Mapping", active: "4-noyabr, 2026" },
  { id: "u5", name: "Sardor Aliyev", email: "sardor@dronchi.uz", role: "O'quvchi", course: "Xavfsiz parvoz", active: "3-noyabr, 2026" },
  { id: "u6", name: "Nigora Salimova", email: "nigora@dronchi.uz", role: "Instruktor", course: "Drone Mapping", active: "3-noyabr, 2026" },
  { id: "u7", name: "Rustam Ergashev", email: "rustam@dronchi.uz", role: "O'quvchi", course: "Kamera sozlamalari", active: "2-noyabr, 2026" },
  { id: "u8", name: "Javohir Qodirov", email: "javohir@dronchi.uz", role: "Instruktor", course: "Drone Racing", active: "1-noyabr, 2026" },
];

export default function AdminUsers() {
  const [query, setQuery] = useState("");
  const [blocked, setBlocked] = useState<string[]>(["u8"]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setBlocked(parsed.filter((item) => typeof item === "string"));
      }
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blocked));
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
  }, [blocked, hydrated]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return USERS;
    return USERS.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.course.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (id: string) => {
    setBlocked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <>
      <div className="page-stats">
        <div>
          <span className="app-stat-icon">
            <Users size={18} />
          </span>
          <strong>248</strong>
          <em>jami foydalanuvchi</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--gold">
            <GraduationCap size={18} />
          </span>
          <strong>6</strong>
          <em>instruktor</em>
        </div>
        <div>
          <span className="app-stat-icon app-stat-icon--violet">
            <Shield size={18} />
          </span>
          <strong>{blocked.length}</strong>
          <em>bloklangan</em>
        </div>
      </div>

      <section className="dash-card">
        <div className="admin-toolbar">
          <label className="admin-search admin-search--icon">
            <span>Foydalanuvchi qidirish</span>
            <div>
              <Search size={14} />
              <input
                type="search"
                placeholder="Ism, email yoki kurs..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          </label>
          <span className="dash-chip">{list.length} ta natija</span>
        </div>

        <div className="admin-user-table">
          <div className="admin-user-row admin-user-head">
            <span>Foydalanuvchi</span>
            <span>Rol</span>
            <span>Kurs</span>
            <span>Oxirgi faollik</span>
            <span>Holat</span>
            <span>Amallar</span>
          </div>
          {list.map((user) => {
            const off = blocked.includes(user.id);
            return (
              <div className="admin-user-row" key={user.id}>
                <span className="admin-user">
                  <i>{user.name.slice(0, 1)}</i>
                  <div>
                    <strong>{user.name}</strong>
                    <em>{user.email}</em>
                  </div>
                </span>
                <span>{user.role}</span>
                <span>{user.course}</span>
                <span>{user.active}</span>
                <span className={`admin-status${off ? "" : " is-on"}`}>
                  {off ? "Bloklangan" : "Faol"}
                </span>
                <span className="admin-course-actions">
                  <button type="button" onClick={() => toggle(user.id)}>
                    {off ? "Blokdan chiqarish" : "Bloklash"}
                  </button>
                </span>
              </div>
            );
          })}
          {list.length === 0 && <p className="admin-empty">Foydalanuvchi topilmadi.</p>}
        </div>
      </section>
    </>
  );
}
