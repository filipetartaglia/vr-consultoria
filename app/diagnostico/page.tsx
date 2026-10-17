import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { whatsappLink, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Agende seu diagnóstico financeiro gratuito",
  description:
    "Uma conversa de cerca de 1 hora, sem custo e sem compromisso, para entender seu cenário financeiro e planejar os próximos passos.",
};

export default function DiagnosticoPage() {
  return (
    <section className="section pt-28">
      <div className="wrap grid md:grid-cols-2 gap-14 items-start">
        <div>
          <span className="eyebrow">Diagnóstico Financeiro VR</span>
          <h1 className="font-display font-medium text-3xl md:text-[38px] leading-[1.15] max-w-[480px]">
            Comece com uma conversa, não com um contrato.
          </h1>
          <p className="mt-5 max-w-[440px]">
            O diagnóstico é o primeiro passo do relacionamento com a VR:
            gratuito, sem compromisso, com cerca de 1 hora de duração.
            Serve para entender seu cenário financeiro atual — depois
            disso, Vinicius apresenta um caminho e uma proposta adequados
            ao seu caso.
          </p>

          <div className="mt-8 space-y-3 text-sm text-[#5B6472]">
            <p>Prefere conversar direto? Fale pelo WhatsApp:</p>
            <a
              id="whatsapp"
              href={whatsappLink(
                "Olá! Vim pelo site da VR Consultoria e gostaria de agendar meu diagnóstico financeiro."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-semibold text-green"
            >
              {SITE.whatsappDisplay}
            </a>
          </div>
        </div>

        <div className="bg-neutral p-8 rounded-xl shadow-card">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
