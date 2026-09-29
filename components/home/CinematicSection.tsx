"use client";

import { CinematicHero } from "@/components/ui/cinematic-landing-hero";

/**
 * CinematicSection — a animação GSAP com scroll-pin no meio da página.
 * Aparece entre Bridge e Services como uma experiência visual de destaque.
 */
export function CinematicSection() {
  return (
    <CinematicHero
      tagline1="Organize."
      tagline2="Proteja. Cresça."
      cardHeading="Finanças com direção, não com sorte."
      ctaHeading="Um plano para a sua realidade."
      ctaDescription="Diagnóstico gratuito, sem compromisso. Uma hora para entender onde você está e para onde pode ir."
      primaryCtaLabel="Agendar diagnóstico gratuito"
      primaryCtaHref="/diagnostico"
      secondaryCtaLabel="Falar no WhatsApp"
      secondaryCtaHref="https://wa.me/5521971115365"
    />
  );
}
