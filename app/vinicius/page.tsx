import type { Metadata } from "next";
import Image from "next/image";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Vinicius Rodrigues",
  description:
    "Conheça Vinicius Rodrigues, fundador da VR Consultoria — especialista em finanças pessoais, organização patrimonial e planejamento financeiro.",
};

export default function ViniciusPage() {
  return (
    <>
      <section className="section pt-28">
        <div className="wrap grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-16 items-start">
          {/* Foto */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral shadow-card">
              <Image
                src="/vinicius.png"
                alt="Vinicius Rodrigues — fundador da VR Consultoria"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white border border-line rounded-xl px-4 py-3 shadow-card">
              <div className="font-display font-medium text-navy-2 text-sm">Vinicius Rodrigues</div>
              <div className="font-mono text-[11px] text-green tracking-wide mt-0.5">Fundador · VR Consultoria</div>
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-5 pt-2">
            <span className="eyebrow">Fundador</span>
            <h1 className="font-display font-medium text-3xl md:text-[38px] leading-[1.15]">
              Vinicius Rodrigues
            </h1>
            <p className="text-[15.5px] leading-relaxed">
              Fundador e especialista da VR Consultoria, formado em Ciências
              Contábeis. À frente da consultoria, é responsável por conduzir
              o diagnóstico financeiro de cada cliente e desenhar o plano de
              organização, proteção e crescimento de patrimônio mais adequado
              para cada caso.
            </p>
            <p className="text-[15.5px] leading-relaxed">
              A VR nasceu da convicção de que educação financeira prática —
              aquela que muda de verdade a relação das pessoas com o dinheiro
              — precisa ser personalizada. Nada de fórmula genérica: cada
              cliente tem uma realidade, objetivos e desafios diferentes.
            </p>

            {/* Placeholder para credenciais */}
            <div className="mt-2 px-5 py-4 bg-neutral border-l-2 border-green text-[13.5px] text-[#5B6472] font-mono rounded-r-sm">
              Certificações e trajetória a confirmar com Vinicius.
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 gap-4 mt-2 pt-6 border-t border-line">
              <div>
                <div className="font-display font-medium text-2xl text-navy-2">100%</div>
                <div className="text-[13px] text-[#5B6472] mt-0.5">personalizado para cada cliente</div>
              </div>
              <div>
                <div className="font-display font-medium text-2xl text-navy-2">1h</div>
                <div className="text-[13px] text-[#5B6472] mt-0.5">diagnóstico gratuito e sem compromisso</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
