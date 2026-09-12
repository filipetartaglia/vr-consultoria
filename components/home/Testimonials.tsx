"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

// ------------------------------------
// Depoimentos reais — prints de WhatsApp
// ------------------------------------

const featured = {
  name: "Angela",
  role: "cliente VR Consultoria",
  quote:
    "A consultoria tem me ajudado a enxergar para onde meu dinheiro está indo e também como mitigar situações que o levam embora, sem que eu perceba. Além disso, agora consigo pensar no futuro a curto, médio e longo prazo, tendo mais clareza da minha situação e também já quitando minhas dívidas. Com toda certeza, indico ter um consultor financeiro. É um investimento com retorno até mesmo inicial!",
  imageUrl: "/depoimento-angela.png",
};

const marqueeItems = [
  {
    name: "Cliente VR",
    quote:
      "Vinícius, vim deixar meu feedback sobre o seu trabalho, irmão. Estamos fechados há 3 meses e, nesse tempo, graças ao seu direcionamento e ao meu compromisso, já consegui alcançar objetivos importantes. Aprendi sobre milhas e pontos, fiz meus primeiros investimentos na XP, planejamos questões como casa e veículos e até já estamos mudando de banco em busca de mais benefícios. Seu trabalho tem sido fundamental na minha evolução financeira. Gratidão demais, recomendo de olhos fechados!",
    time: "06:13",
    imageUrl: "/depoimento-cliente2.png",
  },
  {
    name: "Cliente VR",
    quote:
      "Muito, muito, muito obrigada por toda dedicação e também por procurar saber como andam as coisas! Obrigada por acompanhar constantemente! Que Ele te recompense em dobro e supra todas as suas necessidades de modo que você nem esperava!",
    time: "17:53",
    imageUrl: "/depoimento-cliente3.png",
  },
  {
    name: "Angela",
    quote:
      "Com toda certeza, indico ter um consultor financeiro. É um investimento com retorno até mesmo inicial!",
    time: "11:51",
    imageUrl: "/depoimento-angela.png",
  },
  {
    name: "Cliente VR",
    quote:
      "Aprendi sobre milhas e pontos, fiz meus primeiros investimentos na XP, planejamos questões como casa e veículos e até já estamos mudando de banco em busca de mais benefícios.",
    time: "06:13",
    imageUrl: "/depoimento-cliente2.png",
  },
  {
    name: "Cliente VR",
    quote:
      "Obrigada por acompanhar constantemente! Que Ele te recompense em dobro e supra todas as suas necessidades de modo que você nem esperava!",
    time: "17:53",
    imageUrl: "/depoimento-cliente3.png",
  },
];

// Double for seamless loop
const row1 = [...marqueeItems, ...marqueeItems];
const row2 = [...marqueeItems.slice(2), ...marqueeItems.slice(0, 2), ...marqueeItems.slice(2), ...marqueeItems.slice(0, 2)];

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
  imageUrl?: string | null;
}) {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] mx-2">
      {imageUrl ? (
        // Print real do WhatsApp
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`Depoimento de ${name}`}
          className="w-full rounded-[16px] object-cover shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
        />
      ) : (
        // Fallback — bolha sintética
        <div
          className="relative rounded-[18px] rounded-tl-[4px] px-4 pt-4 pb-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
          style={{ background: "#DCF8C6" }}
        >
          <div
            className="absolute -left-[7px] top-0 w-0 h-0"
            style={{
              borderTop: "10px solid #DCF8C6",
              borderLeft: "8px solid transparent",
            }}
          />
          <p className="text-[13px] leading-[1.5] text-navy-2">&ldquo;{quote}&rdquo;</p>
          <div className="flex items-center justify-between mt-2.5">
            <span className="text-[11px] font-semibold text-green font-mono">{name}</span>
            <div className="flex items-center gap-1 text-[10px] text-[#5B6472] font-mono">
              <span>{time}</span>
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

      {/* Featured — Angela com print real */}
      <div className="wrap mb-12" data-reveal>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start bg-white rounded-2xl shadow-card p-6 md:p-8 border border-line">
          {/* Print do WhatsApp */}
          <div className="w-full md:w-[340px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={featured.imageUrl!}
              alt={`Conversa de ${featured.name} com Vinicius`}
              className="w-full rounded-xl object-cover shadow-sm"
            />
          </div>
          {/* Quote resumida + dados */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-wash flex items-center justify-center font-display font-medium text-green text-lg shrink-0">
                {featured.name.charAt(0)}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-green font-mono">{featured.name}</div>
                <div className="text-[11px] text-[#5B6472] font-mono">{featured.role}</div>
              </div>
            </div>
            <p className="font-display italic text-lg md:text-xl text-navy-2 leading-[1.55]">
              &ldquo;{featured.quote}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Marquee com prints reais */}
      <div className="space-y-3" data-reveal>
        {/* Row 1 → esquerda */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-track--left py-1">
            {row1.map((item, i) => (
              <WhatsAppCard key={i} {...item} />
            ))}
          </div>
        </div>

        {/* Row 2 → direita */}
        <div className="overflow-hidden">
          <div className="marquee-track marquee-track--right py-1">
            {row2.map((item, i) => (
              <WhatsAppCard key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
