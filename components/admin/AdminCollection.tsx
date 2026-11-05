"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Check, Plus, Search } from "@/components/Icons";

export type AdminItem = {
  id: string;
  [key: string]: string | number;
};

type Column = {
  key: string;
  label: string;
  kind?: "status" | "strong" | "muted";
};

type AddField = {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number";
};

export default function AdminCollection({
  storageKey,
  initial,
  titleKey,
  subtitleKey,
  columns,
  searchKeys,
  addFields,
  addLabel,
  addTitle = "Yangi yozuv",
  statusKey,
  onValue = "Faol",
  offValue = "O'chirilgan",
  onLabel = "Yoqish",
  offLabel = "O'chirish",
  emptyText = "Yozuv topilmadi.",
  minWidth = 760,
}: {
  storageKey: string;
  initial: AdminItem[];
  titleKey: string;
  subtitleKey?: string;
  columns: Column[];
  searchKeys: string[];
  addFields?: AddField[];
  addLabel?: string;
  addTitle?: string;
  statusKey?: string;
  onValue?: string;
  offValue?: string;
  onLabel?: string;
  offLabel?: string;
  emptyText?: string;
  minWidth?: number;
}) {
  const [items, setItems] = useState<AdminItem[]>(initial);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      /* localStorage mavjud bo'lmasa ham ishlaydi */
    }
  }, [items, hydrated, storageKey]);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      searchKeys.some((key) => String(item[key] ?? "").toLowerCase().includes(q))
    );
  }, [items, query, searchKeys]);

  const toggleStatus = (item: AdminItem) => {
    if (!statusKey) return;
    const next = item[statusKey] === onValue ? offValue : onValue;
    setItems((current) =>
      current.map((entry) => (entry.id === item.id ? { ...entry, [statusKey]: next } : entry))
    );
    setNote(`${item[titleKey]} — ${next.toLowerCase()}.`);
  };

  const remove = (item: AdminItem) => {
    setItems((current) => current.filter((entry) => entry.id !== item.id));
    setNote(`${item[titleKey]} o'chirildi.`);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const title = form[titleKey]?.trim();
    if (!title) return;
    const item: AdminItem = { id: `custom-${Date.now()}`, ...form };
    addFields?.forEach((field) => {
      if (!item[field.key]) {
        item[field.key] = field.type === "number" ? 0 : "—";
      }
    });
    if (statusKey) item[statusKey] = onValue;
    item[titleKey] = title;
    setItems((current) => [item, ...current]);
    setForm({});
    setOpen(false);
    setNote(`${title} qo'shildi.`);
  };

  const grid = `1.6fr repeat(${columns.length}, minmax(80px, 0.8fr)) 1fr`;

  return (
    <section className="dash-card admin-collection">
      <div className="admin-toolbar">
        <label className="admin-search admin-search--icon">
          <span>Qidirish</span>
          <div>
            <Search size={14} />
            <input
              type="search"
              placeholder="Nomi bo'yicha..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </label>
        {addFields && (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setOpen((current) => !current)}
          >
            <Plus size={14} /> {addLabel ?? "Yangi qo'shish"}
          </button>
        )}
      </div>

      {note && (
        <p className="admin-note" role="status">
          {note}
        </p>
      )}

      {open && addFields && (
        <form className="admin-add-form" onSubmit={submit}>
          <strong>{addTitle}</strong>
          <div className="admin-add-grid">
            {addFields.map((field) => (
              <label key={field.key}>
                <span>{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  value={form[field.key] ?? ""}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, [field.key]: event.target.value }))
                  }
                  required={field.key === titleKey}
                />
              </label>
            ))}
          </div>
          <div className="admin-add-actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={() => setOpen(false)}>
              Bekor qilish
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              <Check size={14} /> Saqlash
            </button>
          </div>
        </form>
      )}

      <div className="admin-collection-table">
        <div
          className="admin-collection-row admin-collection-head"
          style={{ gridTemplateColumns: grid, minWidth }}
        >
          <span>Nomi</span>
          {columns.map((column) => (
            <span key={column.key}>{column.label}</span>
          ))}
          <span>Amallar</span>
        </div>

        {list.map((item) => (
          <div
            className="admin-collection-row"
            style={{ gridTemplateColumns: grid, minWidth }}
            key={item.id}
          >
            <span className="admin-collection-title">
              <strong>{item[titleKey]}</strong>
              {subtitleKey && <em>{item[subtitleKey]}</em>}
            </span>
            {columns.map((column) => {
              const value = item[column.key];
              if (column.key === statusKey) {
                const on = value === onValue;
                return (
                  <span key={column.key} className={`admin-status${on ? " is-on" : ""}`}>
                    {value ?? "—"}
                  </span>
                );
              }
              return (
                <span key={column.key} className={column.kind === "strong" ? "is-strong" : undefined}>
                  {value === "" || value === undefined ? "—" : value}
                </span>
              );
            })}
            <span className="admin-course-actions">
              {statusKey && (
                <button type="button" onClick={() => toggleStatus(item)}>
                  {item[statusKey] === onValue ? offLabel : onLabel}
                </button>
              )}
              <button type="button" className="is-danger" onClick={() => remove(item)}>
                Yo&apos;q qilish
              </button>
            </span>
          </div>
        ))}

        {list.length === 0 && <p className="admin-empty">{emptyText}</p>}
      </div>
    </section>
  );
}
