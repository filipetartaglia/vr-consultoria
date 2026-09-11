"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

const steps = [
  {
    n: "01",
    title: "Diagnóstico gratuito",
    description:
      "Uma conversa de cerca de 1 hora para entender seu cenário financeiro atual, sem compromisso.",
  },
  {
    n: "02",
    title: "Plano sob medida",
    description:
      "Com base no diagnóstico, Vinicius apresenta um caminho e uma proposta adequados ao seu caso.",
  },
  {
    n: "03",
    title: "Acompanhamento",
    description:
      "Você segue com direcionamento contínuo à medida que sua situação e seus objetivos evoluem.",
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.15, y: 40 });

  return (
    <section ref={sectionRef} className="section-tight bg-neutral" id="como-funciona">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Como funciona</span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px]"
          data-reveal
        >
          Três etapas, do primeiro contato ao plano em andamento.
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {steps.map((step) => (
            <div key={step.n} data-reveal>
              <div className="font-mono text-[13px] text-green mb-3.5">{step.n}</div>
              <h3 className="font-display font-medium text-xl mb-2.5">{step.title}</h3>
              <p className="text-[14.5px]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
