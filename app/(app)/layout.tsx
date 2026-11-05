import AppShell from "@/components/AppShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Asosiy mazmunga o&apos;tish
      </a>
      <AppShell>
        <main id="main">{children}</main>
      </AppShell>
    </>
  );
}
