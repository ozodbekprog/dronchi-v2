"use client";

import { useState } from "react";
import { Download } from "@/components/Icons";

export default function CertificateActions({
  status,
  code,
}: {
  status: "earned" | "progress";
  code: string;
}) {
  const [note, setNote] = useState<string | null>(null);

  if (status === "progress") {
    return (
      <button type="button" className="btn btn-outline btn-sm" disabled>
        Kurs tugagach ochiladi
      </button>
    );
  }

  return (
    <div className="cert-actions">
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={() => setNote(`${code} — PDF tayyorlanmoqda. Tez orada yuklab olasiz.`)}
      >
        <Download size={14} /> Yuklab olish
      </button>
      {note && (
        <span className="cert-note" role="status">
          {note}
        </span>
      )}
    </div>
  );
}
