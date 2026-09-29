import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { Bridge } from "@/components/home/Bridge";
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
      <Hero />

      {/* Respiro entre o hero cinemático e o conteúdo */}
      <div className="h-24 md:h-32 bg-white" aria-hidden="true" />

      <ProblemSection />
      <Bridge />
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
