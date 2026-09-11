"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

const problems = [
  "Eu ganho bem, mas não sei exatamente para onde meu dinheiro vai todo mês.",
  "Tenho vontade de investir, mas não sei por onde começar nem em quem confiar.",
  "Tomo decisões financeiras no impulso, sem um plano de verdade.",
  "Sinto que estou construindo patrimônio sem proteção nenhuma.",
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.13, y: 36 });

  return (
    <section ref={sectionRef} className="section">
      <div className="wrap">
        <span className="eyebrow" data-reveal>O problema</span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px]"
          data-reveal
        >
          Se alguma dessas frases soa familiar, você não está sozinho.
        </h2>

        <div className="mt-12 max-w-[760px]">
          {problems.map((problem, i) => (
            <div
              key={problem}
              data-reveal
              className="grid grid-cols-[52px_1fr] gap-0 py-6 border-t border-line last:border-b"
            >
              <div className="font-mono text-xs text-green pt-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="font-display italic text-lg md:text-xl text-navy-2 leading-[1.45] max-w-[600px]">
                &ldquo;{problem}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
