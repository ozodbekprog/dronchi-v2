import AdminShell from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Asosiy mazmunga o&apos;tish
      </a>
      <AdminShell>{children}</AdminShell>
    </>
  );
}
