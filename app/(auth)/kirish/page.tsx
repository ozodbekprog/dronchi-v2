import type { Metadata } from "next";
import AuthPage from "@/components/AuthPage";

export const metadata: Metadata = {
  title: "Kirish",
  description: "DRONCHI hisobingizga kiring va o'quv jarayonini davom ettiring.",
};

export default async function KirishPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  return <AuthPage mode="login" next={next} />;
}
