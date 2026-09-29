import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { Bridge } from "@/components/home/Bridge";
import { CinematicSection } from "@/components/home/CinematicSection";
import { Services } from "@/components/home/Services";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Calculator } from "@/components/home/Calculator";
import { Testimonials } from "@/components/home/Testimonials";
import { About } from "@/components/home/About";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero estático — visível imediatamente ao abrir o site */}
      <Hero />

      {/* 2. Problema + transição */}
      <ProblemSection />
      <Bridge />

      {/* 3. Animação cinemática no meio — experiência visual de destaque */}
      <CinematicSection />

      {/* 4. Restante do conteúdo */}
      <Services />
      <HowItWorks />
      <Calculator />
      <Testimonials />
      <About />
      <FAQ />
      <FinalCTA />
    </>
  );
}
