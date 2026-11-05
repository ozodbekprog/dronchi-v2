import type { Metadata } from "next";
import AuthPage from "@/components/AuthPage";

export const metadata: Metadata = {
  title: "Ro'yxatdan o'tish",
  description:
    "DRONCHI akademiyasida ro'yxatdan o'ting: FPV asoslari kursi, amaliy poligon mashqlari va sertifikat.",
};

const plans: Record<string, string> = {
  mustaqil: "Mustaqil",
  "qollab-quvvatlash": "Qo'llab-quvvatlash",
  mentor: "Mentor bilan",
};

export default async function RoyxatPage({
  searchParams,
}: {
  searchParams: Promise<{ tarif?: string; next?: string }>;
}) {
  const { tarif, next } = await searchParams;
  const plan = tarif ? plans[tarif] : undefined;

  return <AuthPage mode="register" plan={plan} next={next} />;
}
