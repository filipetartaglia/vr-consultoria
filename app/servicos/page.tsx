import type { Metadata } from "next";
import { Services } from "@/components/home/Services";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Organização financeira, proteção patrimonial, direcionamento de investimentos, expansão de patrimônio e estratégias de pontos e milhas.",
};

export default function ServicosPage() {
  return (
    <>
      <h1 className="sr-only">Serviços da VR Consultoria</h1>
      <div className="pt-14" />
      <Services />
      <FinalCTA />
    </>
  );
}
