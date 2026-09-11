"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.15, y: 40 });

  return (
    <section ref={sectionRef} className="section-tight bg-neutral" id="sobre">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Sobre a VR</span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px]"
          data-reveal
        >
          Fundada para trazer direção a quem toma decisões financeiras
          sozinho.
        </h2>

        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-14 items-start mt-12">
          <div
            data-reveal
            className="aspect-[4/5] bg-navy rounded flex items-center justify-center text-white/35 font-mono text-[13px] text-center p-5"
          >
            [ Foto de Vinicius Rodrigues — a confirmar ]
          </div>
          <div data-reveal>
            <p className="mb-4">
              A VR Consultoria nasceu para ajudar pessoas que ganham bem, mas
              não têm um plano claro para o próprio dinheiro — pessoas que
              tomam decisões financeiras sem direção, sem proteção e sem
              estratégia de longo prazo.
            </p>
            <p className="mb-4">
              À frente da consultoria está{" "}
              <strong className="text-navy-2">Vinicius Rodrigues</strong>,
              fundador e especialista da VR, formado em Ciências Contábeis.
            </p>
            <div className="mt-6 px-5 py-4.5 bg-white border-l-2 border-green text-[13.5px] text-[#5B6472] font-mono">
              [ CONFIRMAR COM VINICIUS: certificações, tempo de atuação e
              demais credenciais a incluir nesta seção ]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
