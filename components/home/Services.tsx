"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

const services = [
  {
    title: "Organização Financeira",
    description:
      "Entenda seu fluxo financeiro real e tome decisões com base em dados, não em achismo.",
  },
  {
    title: "Proteção Patrimonial",
    description:
      "Estratégias para preservar o que você já construiu diante de imprevistos e riscos.",
  },
  {
    title: "Direcionamento de Investimentos",
    description:
      "Orientação estratégica para colocar seu dinheiro para trabalhar de forma consciente.",
  },
  {
    title: "Expansão de Patrimônio",
    description:
      "Planejamento de médio e longo prazo para o crescimento sustentável do seu patrimônio.",
  },
  {
    title: "Pontos e Milhas",
    description:
      "Uso estratégico de pontos e milhas como ferramenta real de otimização financeira.",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.1, y: 32 });

  return (
    <section ref={sectionRef} className="section" id="servicos">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Serviços</span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px]"
          data-reveal
        >
          Cinco frentes de trabalho, um único objetivo: clareza sobre o seu
          dinheiro.
        </h2>

        <div className="mt-12">
          {services.map((service, i) => (
            <div
              key={service.title}
              data-reveal
              className="grid grid-cols-[60px_1fr] py-7 border-t border-line last:border-b items-baseline"
            >
              <div className="font-mono text-[13px] text-green">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="grid md:grid-cols-[1fr_1.4fr] gap-4 md:gap-8 items-baseline">
                <h3 className="font-display font-medium text-xl md:text-[23px]">
                  {service.title}
                </h3>
                <p className="text-[15px] max-w-[420px]">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
