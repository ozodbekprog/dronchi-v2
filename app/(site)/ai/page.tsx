import type { Metadata } from "next";
import AiPage from "@/components/ai/AiPage";

export const metadata: Metadata = {
  title: "Fariza — AI yordamchi",
  description:
    "Fariza — DRONCHI platformasining AI yordamchisi. Dron, FPV, xavfsizlik va kurslar bo'yicha 5 tilda javob beradi.",
};

export default function AiRoute() {
  return <AiPage />;
}
