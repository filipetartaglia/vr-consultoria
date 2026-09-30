"use client";

import Image from "next/image";
import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.15, y: 40 });

  return (
    <section ref={sectionRef} className="section bg-white" id="sobre">
      <div className="wrap">
        <span className="eyebrow" data-reveal>Sobre</span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px]"
          data-reveal
        >
          Quem está por trás da VR Consultoria.
        </h2>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 items-start mt-12">
          {/* Foto do Vinicius */}
          <div data-reveal className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral shadow-card">
              <Image
                src="/vinicius.png"
                alt="Vinicius Rodrigues — fundador da VR Consultoria"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            {/* Badge de nome */}
            <div className="absolute -bottom-4 -right-4 bg-white border border-line rounded-xl px-4 py-3 shadow-card">
              <div className="font-display font-medium text-navy-2 text-sm">Vinicius Rodrigues</div>
              <div className="font-mono text-[11px] text-green tracking-wide mt-0.5">Fundador · VR Consultoria</div>
            </div>
          </div>

          {/* Texto */}
          <div data-reveal className="flex flex-col gap-5 pt-2">
            <p className="text-[15.5px] leading-relaxed">
              A VR Consultoria nasceu para ajudar pessoas que ganham bem, mas
              não têm um plano claro para o próprio dinheiro — pessoas que
              tomam decisões financeiras sem direção, sem proteção e sem
              estratégia de longo prazo.
            </p>
            <p className="text-[15.5px] leading-relaxed">
              À frente está{" "}
              <strong className="text-navy-2">Vinicius Rodrigues</strong>,
              formado em Ciências Contábeis e apaixonado por educação
              financeira prática — o tipo que muda de verdade a relação das
              pessoas com o dinheiro.
            </p>
            <p className="text-[15.5px] leading-relaxed">
              O trabalho da VR é personalizado: nada de fórmula genérica. Cada
              cliente tem uma realidade, objetivos e desafios diferentes — e o
              plano precisa refletir isso.
            </p>

            {/* Métricas rápidas */}
            <div className="grid grid-cols-2 gap-4 mt-2 pt-6 border-t border-line">
              <div>
                <div className="font-display font-medium text-2xl text-navy-2">+3 meses</div>
                <div className="text-[13px] text-[#5B6472] mt-0.5">resultado médio percebido pelos clientes</div>
              </div>
              <div>
                <div className="font-display font-medium text-2xl text-navy-2">100%</div>
                <div className="text-[13px] text-[#5B6472] mt-0.5">personalizado para sua realidade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
