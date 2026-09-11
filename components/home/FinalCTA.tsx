"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.12, y: 28, duration: 0.8 });

  return (
    <section
      ref={sectionRef}
      className="bg-green text-white text-center py-24"
      id="diagnostico-cta"
    >
      <div className="wrap">
        <span className="eyebrow text-white/80" data-reveal>
          Próximo passo
        </span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px] mx-auto text-white"
          data-reveal
        >
          Sua vida financeira organizada começa com uma conversa de 1 hora.
        </h2>
        <p className="text-white/85 max-w-[480px] mx-auto mt-4.5" data-reveal>
          Sem compromisso. Sem pressão. Só clareza sobre onde você está e
          para onde pode ir.
        </p>
        <div className="flex justify-center mt-8" data-reveal>
          <Button href="/diagnostico" variant="primary-on-green">
            Agendar diagnóstico gratuito
          </Button>
        </div>
      </div>
    </section>
  );
}
