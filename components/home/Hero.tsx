"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Entrance animation — just a simple fade-up for the text elements, no scroll needed
  useEffect(() => {
    if (!ref.current) return;
    const els = ref.current.querySelectorAll<HTMLElement>("[data-hero]");
    gsap.set(els, { opacity: 0, y: 28 });
    gsap.to(els, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.2,
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center bg-navy text-white px-6 overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(47,110,81,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div data-hero className="mb-10">
          <Image
            src="/logo-vr.png"
            alt="VR Consultoria — Vinicius Rodrigues"
            width={90}
            height={90}
            className="object-contain brightness-0 invert mx-auto"
            priority
          />
        </div>

        {/* Eyebrow */}
        <span
          data-hero
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-green mb-5"
        >
          Consultoria Financeira Pessoal
        </span>

        {/* Headline */}
        <h1
          data-hero
          className="font-display font-medium text-[42px] sm:text-6xl md:text-[72px] leading-[1.08] tracking-tight mb-6"
        >
          Clareza real
          <br />
          <span className="text-white/55">sobre o seu dinheiro.</span>
        </h1>

        {/* Subline */}
        <p
          data-hero
          className="text-white/65 text-lg md:text-xl max-w-[520px] leading-relaxed mb-10"
        >
          A VR ajuda você a entender para onde seu dinheiro vai, proteger o
          que já construiu e planejar o próximo passo — com estratégia, não
          com achismo.
        </p>

        {/* CTAs */}
        <div data-hero className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/diagnostico"
            className="inline-flex items-center gap-2 bg-green text-white font-semibold text-sm px-7 py-4 rounded-sm hover:bg-green-hover transition-all hover:-translate-y-px"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Agendar diagnóstico gratuito
          </Link>
          <a
            href="https://wa.me/5521971115365"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/25 text-white font-semibold text-sm px-7 py-4 rounded-sm hover:bg-white/8 transition-all hover:-translate-y-px"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.563 4.14 1.545 5.874L.057 23.5l5.797-1.521A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.853 0-3.607-.5-5.12-1.376l-.367-.217-3.438.901.918-3.352-.239-.386A9.937 9.937 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>

        {/* Scroll hint — simples, pequeno, abaixo dos CTAs */}
        <div data-hero className="mt-16 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white">
            role para explorar
          </span>
          <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true" className="animate-bounce">
            <path d="M2 2L10 10L18 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
