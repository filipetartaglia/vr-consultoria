"use client";

import { useRef, useState } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

const faqs = [
  {
    q: "O diagnóstico financeiro é realmente gratuito?",
    a: "Sim. É o primeiro passo do relacionamento com a VR: uma conversa de cerca de 1 hora, sem custo e sem compromisso, para entender seu cenário atual.",
  },
  {
    q: "Preciso ter um alto patrimônio para começar?",
    a: "Não. A consultoria é voltada para quem quer organizar e planejar sua vida financeira, independentemente do estágio em que está hoje.",
  },
  {
    q: "O que acontece depois do diagnóstico?",
    a: "Vinicius apresenta um caminho e uma proposta adequados ao seu caso, para você decidir com clareza se e como seguir.",
  },
  {
    q: "Como é feito o acompanhamento?",
    a: "O acompanhamento é contínuo, ajustado conforme sua situação e seus objetivos evoluem ao longo do tempo.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.1, y: 30 });

  return (
    <section ref={sectionRef} className="section">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Perguntas frequentes</span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px]"
          data-reveal
        >
          Antes de agendar, tire suas dúvidas.
        </h2>

        <div className="mt-10 max-w-[760px]">
          {faqs.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.q} data-reveal className="border-b border-line py-5">
                <button
                  className="w-full flex justify-between items-center text-left font-semibold text-base text-navy-2"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                >
                  {item.q}
                  <span
                    className={`font-mono text-green text-lg transition-transform duration-200 ml-4 shrink-0 ${
                      open ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height] duration-250 ease-in-out"
                  style={{ maxHeight: open ? "200px" : "0px" }}
                >
                  <p className="pt-3 text-[14.5px]">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
