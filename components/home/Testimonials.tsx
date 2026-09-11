"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

// ------------------------------------
// Data — textos reais dos clientes VR
// ------------------------------------
const featured = {
  quote:
    "A consultoria tem me ajudado a enxergar para onde meu dinheiro está indo e como mitigar situações que o levam embora sem que eu perceba. Já consigo pensar no futuro a curto, médio e longo prazo, com mais clareza — e já quitando minhas dívidas.",
  name: "Angela",
  role: "cliente VR Consultoria",
  time: "09:41",
  imageUrl: null as string | null,
};

const marqueeItems = [
  {
    quote:
      "Estamos fechados há 3 meses e, nesse tempo, já consegui alcançar objetivos importantes: aprendi sobre milhas e pontos, fiz meus primeiros investimentos, planejamos casa e veículo e até estamos mudando de banco em busca de mais benefícios.",
    name: "Cliente VR",
    time: "14:23",
    imageUrl: null as string | null,
  },
  {
    quote:
      "Muito obrigada por toda a dedicação e por acompanhar constantemente como andam as coisas. O cuidado com o acompanhamento fez toda a diferença no processo.",
    name: "Cliente VR",
    time: "18:07",
    imageUrl: null as string | null,
  },
  {
    quote:
      "Finalmente entendi para onde meu dinheiro estava indo todo mês. Parece simples, mas fez toda a diferença ter alguém para me ajudar a enxergar isso com clareza.",
    name: "Cliente VR",
    time: "11:52",
    imageUrl: null as string | null,
  },
  {
    quote:
      "Em menos de 6 meses já reorganizei minha reserva de emergência e comecei a investir de forma consciente. Algo que eu achava que era só para quem ganhava muito mais.",
    name: "Cliente VR",
    time: "20:34",
    imageUrl: null as string | null,
  },
  {
    quote:
      "O que mais me surpreendeu foi a personalização — nada de fórmula genérica. O plano foi feito para a minha realidade, com os meus objetivos.",
    name: "Cliente VR",
    time: "08:15",
    imageUrl: null as string | null,
  },
  {
    quote:
      "Comecei a usar milhas de forma estratégica e já economizei o equivalente a quase 3 meses de aportes só nisso. Nunca imaginei que pontos de cartão poderiam fazer isso.",
    name: "Cliente VR",
    time: "16:49",
    imageUrl: null as string | null,
  },
];

// Double the array so the marquee loops seamlessly
const row1 = [...marqueeItems, ...marqueeItems];
const row2 = [...marqueeItems.slice(3), ...marqueeItems.slice(0, 3), ...marqueeItems.slice(3), ...marqueeItems.slice(0, 3)];

// ------------------------------------
// WhatsApp bubble card
// ------------------------------------
function WhatsAppCard({
  quote,
  name,
  time,
  imageUrl,
}: {
  quote: string;
  name: string;
  time: string;
  imageUrl: string | null;
}) {
  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[300px] mx-2">
      {imageUrl ? (
        // When real WhatsApp screenshot is provided
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`Depoimento de ${name}`}
          className="w-full rounded-[18px] object-cover shadow-card"
        />
      ) : (
        // Synthetic WhatsApp bubble
        <div
          className="relative rounded-[18px] rounded-tl-[4px] px-4 pt-4 pb-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
          style={{ background: "#DCF8C6" }}
        >
          {/* "Tail" triangle */}
          <div
            className="absolute -left-[7px] top-0 w-0 h-0"
            style={{
              borderTop: "10px solid #DCF8C6",
              borderLeft: "8px solid transparent",
              borderRight: "0px solid transparent",
            }}
          />
          <p className="text-[13px] leading-[1.5] text-navy-2 font-body">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[11px] font-semibold text-green font-mono">
              {name}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-[#5B6472] font-mono">
              <span>{time}</span>
              {/* Double-check read icon */}
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden="true">
                <path d="M1 6L4.5 9.5L10 2" stroke="#34B7F1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 6L8.5 9.5L14 2" stroke="#34B7F1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------
// Section
// ------------------------------------
export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { stagger: 0.1 });

  return (
    <section ref={sectionRef} className="section overflow-hidden" id="depoimentos">
      {/* Header */}
      <div className="wrap mb-12">
        <span className="eyebrow" data-reveal>Depoimentos</span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px]"
          data-reveal
        >
          O que quem já passou pelo processo diz sobre o trabalho.
        </h2>
      </div>

      {/* Featured quote — Angela */}
      <div className="wrap mb-12" data-reveal>
        <div className="flex gap-5 md:gap-8 items-start bg-white rounded-2xl shadow-card p-6 md:p-8 border border-line">
          {/* Avatar */}
          <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-green-wash flex items-center justify-center font-display font-medium text-green text-xl shrink-0">
            {featured.name.charAt(0)}
          </div>
          <div>
            <p className="font-display italic text-lg md:text-xl lg:text-2xl text-navy-2 leading-[1.55]">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="text-[13px] font-semibold text-green font-mono">
                {featured.name}
              </div>
              <div className="w-1 h-1 rounded-full bg-line" />
              <div className="text-[12px] text-[#5B6472] font-mono">
                {featured.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-3" data-reveal>
        {/* Row 1 → left */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-track--left py-1">
            {row1.map((item, i) => (
              <WhatsAppCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Row 2 → right */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-track--right py-1">
            {row2.map((item, i) => (
              <WhatsAppCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="wrap mt-8" data-reveal>
        <p className="text-xs text-[#5B6472] font-mono bg-neutral px-4 py-3.5 border-l-2 border-green">
          Depoimentos reais de clientes da VR. Nomes mantidos anônimos por padrão —
          Vinicius pode confirmar os nomes e adicionar prints reais do WhatsApp a qualquer momento.
        </p>
      </div>
    </section>
  );
}
