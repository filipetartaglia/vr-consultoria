import type { Metadata } from "next";
import { About } from "@/components/home/About";
import { Testimonials } from "@/components/home/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça a VR Consultoria: por que existimos e para quem trabalhamos.",
};

export default function SobrePage() {
  return (
    <>
      <h1 className="sr-only">Sobre a VR Consultoria</h1>
      <div className="pt-14" />
      <About />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
