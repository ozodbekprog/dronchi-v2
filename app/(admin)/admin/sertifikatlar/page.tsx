import type { Metadata } from "next";
import AdminCollection from "@/components/admin/AdminCollection";
import { CERTIFICATES } from "@/lib/app-data";

export const metadata: Metadata = {
  title: "Admin — sertifikatlar",
};

const INITIAL = CERTIFICATES.map((certificate) => ({
  id: certificate.id,
  title: `${certificate.title} sertifikati`,
  student: "Aziz Karimov",
  code: certificate.code,
  date: certificate.date,
  status: certificate.status === "earned" ? "Berilgan" : "Jarayonda",
}));

export default function AdminCertificatesPage() {
  return (
    <div className="admin-page">
      <AdminCollection
        storageKey="dronchi-admin-certificates"
        initial={INITIAL}
        titleKey="title"
        subtitleKey="student"
        columns={[
          { key: "code", label: "Kod" },
          { key: "date", label: "Sana" },
          { key: "status", label: "Holat" },
        ]}
        searchKeys={["title", "student", "code"]}
        addFields={[
          { key: "title", label: "Kurs nomi", placeholder: "FPV asoslari sertifikati" },
          { key: "student", label: "O'quvchi", placeholder: "Ism Familiya" },
          { key: "code", label: "Sertifikat kodi", placeholder: "DRN-FPV-2026-0001" },
        ]}
        addLabel="Sertifikat berish"
        addTitle="Yangi sertifikat"
        statusKey="status"
        onValue="Berilgan"
        offValue="Jarayonda"
        onLabel="Berilgan deb belgilash"
        offLabel="Bekor qilish"
        minWidth={800}
      />
    </div>
  );
}
