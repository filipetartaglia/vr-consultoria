import type { Metadata } from "next";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Vinicius Rodrigues",
  description: "Fundador e especialista da VR Consultoria.",
};

export default function ViniciusPage() {
  return (
    <>
      <section className="section">
        <div className="wrap grid md:grid-cols-[0.85fr_1.15fr] gap-14 items-start">
          <div className="aspect-[4/5] bg-navy rounded flex items-center justify-center text-white/35 font-mono text-[13px] text-center p-5">
            [ Foto de Vinicius Rodrigues — a confirmar ]
          </div>
          <div>
            <span className="eyebrow">Fundador</span>
            <h1 className="font-display font-medium text-3xl md:text-[38px] leading-[1.15] mb-5">
              Vinicius Rodrigues
            </h1>
            <p className="mb-4">
              Fundador e especialista da VR Consultoria, formado em Ciências
              Contábeis. À frente da consultoria, é responsável por conduzir
              o diagnóstico financeiro de cada cliente e desenhar o plano de
              organização, proteção e crescimento de patrimônio mais
              adequado para cada caso.
            </p>
            <div className="mt-6 px-5 py-4.5 bg-neutral border-l-2 border-green text-[13.5px] text-[#5B6472] font-mono">
              [ CONFIRMAR COM VINICIUS: certificações, tempo de atuação,
              trajetória profissional e demais credenciais a incluir nesta
              página ]
            </div>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
