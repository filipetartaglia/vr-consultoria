// components/ui/cinematic-landing-hero.tsx
"use client";

import { useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, color-mix(in srgb, rgb(var(--color-foreground)) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, rgb(var(--color-foreground)) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* -------------------------------------------------------------------
     PHYSICAL SKEUOMORPHIC MATERIALS (3D Depth)
  ---------------------------------------------------------------------- */

  .text-3d-matte {
      color: rgb(var(--color-foreground));
      text-shadow: 
          0 10px 30px color-mix(in srgb, rgb(var(--color-foreground)) 20%, transparent), 
          0 2px 4px color-mix(in srgb, rgb(var(--color-foreground)) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, rgb(var(--color-foreground)) 0%, color-mix(in srgb, rgb(var(--color-foreground)) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 10px 20px color-mix(in srgb, rgb(var(--color-foreground)) 15%, transparent)) 
          drop-shadow(0px 2px 4px color-mix(in srgb, rgb(var(--color-foreground)) 10%, transparent));
  }

  /* INSIDE THE CARD: Hardcoded Silver/White for dark background */
  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card — Navy VR palette */
  .premium-depth-card {
      background: linear-gradient(145deg, #132550 0%, #070F1E 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.15),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(47,110,81,0.07) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  /* Realistic iPhone Mockup Hardware */
  .iphone-bezel {
      background-color: #111;
      box-shadow: 
          inset 0 0 0 2px #52525B, 
          inset 0 0 0 7px #000, 
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow: 
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }
  
  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow: 
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px); 
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  /* Physical Tactile Buttons */
  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  /* Primary — Verde VR */
  .btn-modern-light {
      background: linear-gradient(180deg, #3a8762 0%, #2F6E51 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.2), 0 12px 24px -4px rgba(47,110,81,0.4), inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.15);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #47a076 0%, #3a8762 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 6px 12px -2px rgba(47,110,81,0.3), 0 20px 32px -6px rgba(47,110,81,0.5), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -3px 6px rgba(0,0,0,0.15);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #2F6E51 0%, #265C44 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.2), inset 0 3px 6px rgba(0,0,0,0.2);
  }
  /* Secondary — Navy escuro */
  .btn-modern-dark {
      background: linear-gradient(180deg, #1a2f52 0%, #0B1B33 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #243f6e 0%, #1a2f52 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #0B1B33;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function CinematicHero({
  brandName = "VR",
  tagline1 = "Clareza real",
  tagline2 = "sobre o seu dinheiro.",
  cardHeading = "Finanças com direção, não com sorte.",
  cardDescription = (
    <>
      A <span className="text-white font-semibold">VR Consultoria</span> ajuda
      você a entender para onde seu dinheiro vai, proteger o que já construiu e
      planejar o próximo passo com estratégia — não com achismo.
    </>
  ),
  metricValue = 12,
  metricLabel = "Meses de Resultado",
  ctaHeading = "Organize. Proteja. Cresça.",
  ctaDescription =
    "Seu primeiro passo é uma conversa gratuita de 1 hora. Sem compromisso, sem pressão — só clareza sobre onde você está e para onde pode ir.",
  primaryCtaLabel = "Agendar diagnóstico gratuito",
  primaryCtaHref = "/diagnostico",
  secondaryCtaLabel = "Falar no WhatsApp",
  secondaryCtaHref = "https://wa.me/5521971115365",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // High-Performance Mouse Interaction Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Complex Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: "blur(20px)",
        rotationX: -20,
      });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(
        [
          ".card-left-text",
          ".card-right-text",
          ".mockup-scroll-wrapper",
          ".floating-badge",
          ".phone-widget",
        ],
        { autoAlpha: 0 }
      );
      gsap.set(".cta-wrapper", {
        autoAlpha: 0,
        scale: 0.8,
        filter: "blur(30px)",
      });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", {
          duration: 1.8,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          rotationX: 0,
          ease: "expo.out",
        })
        .to(
          ".text-days",
          {
            duration: 1.4,
            clipPath: "inset(0 0% 0 0)",
            ease: "power4.inOut",
          },
          "-=1.0"
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1400",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(
          [".hero-text-wrapper", ".bg-grid-theme"],
          {
            scale: 1.15,
            filter: "blur(20px)",
            opacity: 0.2,
            ease: "power2.inOut",
            duration: 1.5,
          },
          0
        )
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 1.5 }, 0)
        .to(".main-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1,
        })
        .fromTo(
          ".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          {
            y: 0,
            z: 0,
            rotationX: 0,
            rotationY: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "expo.out",
            duration: 1.8,
          },
          "-=0.5"
        )
        .fromTo(
          ".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.12,
            ease: "back.out(1.2)",
            duration: 1,
          },
          "-=1.2"
        )
        .to(
          ".progress-ring",
          { strokeDashoffset: 60, duration: 1.5, ease: "power3.inOut" },
          "-=1.0"
        )
        .to(
          ".counter-val",
          {
            innerHTML: metricValue,
            snap: { innerHTML: 1 },
            duration: 1.5,
            ease: "expo.out",
          },
          "-=1.5"
        )
        .fromTo(
          ".floating-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotationZ: 0,
            ease: "back.out(1.5)",
            duration: 1.5,
            stagger: 0.2,
          },
          "-=2.0"
        )
        .fromTo(
          ".card-left-text",
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 },
          "-=1.5"
        )
        .fromTo(
          ".card-right-text",
          { x: 50, autoAlpha: 0, scale: 0.8 },
          { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 },
          "<"
        )
        .to({}, { duration: 0.8 })
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 0.5 })
        .to(
          [
            ".mockup-scroll-wrapper",
            ".floating-badge",
            ".card-left-text",
            ".card-right-text",
          ],
          {
            scale: 0.9,
            y: -40,
            z: -200,
            autoAlpha: 0,
            ease: "power3.in",
            duration: 1.2,
            stagger: 0.05,
          }
        )
        .to(
          ".main-card",
          {
            width: isMobile ? "92vw" : "85vw",
            height: isMobile ? "92vh" : "85vh",
            borderRadius: isMobile ? "32px" : "40px",
            ease: "expo.inOut",
            duration: 1.8,
          },
          "pullback"
        )
        .to(
          ".cta-wrapper",
          { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 },
          "pullback"
        )
        .to(".main-card", {
          y: -window.innerHeight - 300,
          ease: "power3.in",
          duration: 1.5,
        });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-screen h-screen overflow-hidden flex items-center justify-center bg-white text-navy antialiased",
        className
      )}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div
        className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50"
        aria-hidden="true"
      />

      {/* BACKGROUND LAYER: Hero Texts */}
      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 will-change-transform">
        <h1
          className="text-track gsap-reveal text-3d-matte font-display font-medium text-5xl md:text-7xl lg:text-[6rem] tracking-tight mb-2"
          style={{ fontFamily: "var(--font-display, serif)" }}
        >
          {tagline1}
        </h1>
        <h1
          className="text-days gsap-reveal text-silver-matte font-display font-medium text-5xl md:text-7xl lg:text-[6rem] tracking-tighter"
          style={{ fontFamily: "var(--font-display, serif)" }}
        >
          {tagline2}
        </h1>
      </div>

      {/* ── Scroll indicator — prominent & intuitive ── */}
      <div
        className="scroll-hint absolute bottom-0 left-0 right-0 z-20 pointer-events-none select-none flex flex-col items-center pb-7"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(11,27,51,0.18) 100%)",
        }}
      >
        <span
          className="text-[11px] tracking-[0.22em] uppercase font-mono mb-3"
          style={{ color: "rgba(11,27,51,0.55)", fontFamily: "var(--font-mono, monospace)" }}
        >
          role para ver
        </span>
        {/* Animated chevrons — three stacked, fading in sequence */}
        <div className="flex flex-col items-center gap-0.5">
          {[0, 1, 2].map((i) => (
            <svg
              key={i}
              width="22" height="14" viewBox="0 0 22 14"
              fill="none"
              aria-hidden="true"
              style={{
                opacity: 0.25 + i * 0.28,
                animation: `scrollChevron 1.4s ease-in-out ${i * 0.18}s infinite`,
              }}
            >
              <path d="M2 2L11 11L20 2" stroke="#0B1B33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollChevron {
          0%, 100% { transform: translateY(0); opacity: inherit; }
          50%       { transform: translateY(5px); }
        }
      `}</style>

      {/* BACKGROUND LAYER 2: CTA final */}
      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-medium mb-6 tracking-tight text-silver-matte font-display"
          style={{ fontFamily: "var(--font-display, serif)" }}
        >
          {ctaHeading}
        </h2>
        <p
          className="text-navy/60 text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed"
          style={{ fontFamily: "var(--font-body, sans-serif)" }}
        >
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Primary CTA — Verde VR */}
          <a
            href={primaryCtaHref}
            className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
          >
            <svg
              className="w-5 h-5 opacity-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span
              className="text-base font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              {primaryCtaLabel}
            </span>
          </a>

          {/* Secondary CTA — Navy VR */}
          <a
            href={secondaryCtaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
          >
            {/* WhatsApp icon */}
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span
              className="text-base font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-body, sans-serif)" }}
            >
              {secondaryCtaLabel}
            </span>
          </a>
        </div>
        <p
          className="mt-6 text-[13px] text-navy/40 font-mono"
          style={{ fontFamily: "var(--font-mono, monospace)" }}
        >
          Diagnóstico gratuito · Sem compromisso · Cerca de 1 hora
        </p>
      </div>

      {/* FOREGROUND LAYER: The Deep Navy Card */}
      <div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        style={{ perspective: "1500px" }}
      >
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          {/* RESPONSIVE GRID */}
          <div className="relative w-full h-full max-w-7xl mx-auto px-4 lg:px-12 flex flex-col justify-evenly lg:grid lg:grid-cols-3 items-center lg:gap-8 z-10 py-6 lg:py-0">

            {/* 1. TOP (Mobile) / RIGHT (Desktop): BRAND NAME */}
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full">
              <h2
                className="text-6xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter text-card-silver-matte"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                {brandName}
              </h2>
            </div>

            {/* 2. MIDDLE (Mobile) / CENTER (Desktop): IPHONE MOCKUP */}
            <div
              className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[380px] lg:h-[600px] flex items-center justify-center z-10"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.65] md:scale-85 lg:scale-100">

                {/* iPhone Bezel */}
                <div
                  ref={mockupRef}
                  className="relative w-[280px] h-[580px] rounded-[3rem] iphone-bezel flex flex-col will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Physical Hardware Buttons */}
                  <div className="absolute top-[120px] -left-[3px] w-[3px] h-[25px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[160px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[220px] -left-[3px] w-[3px] h-[45px] hardware-btn rounded-l-md z-0" aria-hidden="true" />
                  <div className="absolute top-[170px] -right-[3px] w-[3px] h-[70px] hardware-btn rounded-r-md z-0 scale-x-[-1]" aria-hidden="true" />

                  {/* Inner Screen */}
                  <div className="absolute inset-[7px] bg-[#050914] rounded-[2.5rem] overflow-hidden text-white z-10" style={{ boxShadow: "inset 0 0 15px rgba(0,0,0,1)" }}>
                    <div className="absolute inset-0 screen-glare z-40 pointer-events-none" aria-hidden="true" />

                    {/* Dynamic Island */}
                    <div className="absolute top-[5px] left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-50 flex items-center justify-end px-3" style={{ boxShadow: "inset 0 -1px 2px rgba(255,255,255,0.1)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" style={{ boxShadow: "0 0 8px rgba(34,197,94,0.8)" }} />
                    </div>

                    {/* App Interface — VR Dashboard */}
                    <div className="relative w-full h-full pt-12 px-5 pb-8 flex flex-col">

                      {/* Header */}
                      <div className="phone-widget flex justify-between items-center mb-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold mb-1">Visão Geral</span>
                          <span className="text-xl font-bold tracking-tight text-white">Patrimônio</span>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/5 text-neutral-200 flex items-center justify-center font-bold text-sm border border-white/10" style={{ boxShadow: "0 0 0 4px rgba(47,110,81,0.15)" }}>VR</div>
                      </div>

                      {/* Metric ring */}
                      <div className="phone-widget relative w-44 h-44 mx-auto flex items-center justify-center mb-6" style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.8))" }}>
                        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle
                            className="progress-ring"
                            cx="88"
                            cy="88"
                            r="64"
                            fill="none"
                            stroke="#2F6E51"
                            strokeWidth="12"
                          />
                        </svg>
                        <div className="text-center z-10 flex flex-col items-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="text-[8px] text-emerald-200/50 uppercase tracking-[0.1em] font-bold mt-0.5">{metricLabel}</span>
                        </div>
                      </div>

                      {/* Widgets */}
                      <div className="space-y-3">
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 flex items-center justify-center mr-3 border border-emerald-400/20" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}>
                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-[10px] text-neutral-400 mb-1">Investimentos</div>
                            <div className="h-2 w-20 bg-neutral-300/20 rounded-full" />
                          </div>
                          <div className="text-[10px] text-emerald-400 font-bold">+8.4%</div>
                        </div>
                        <div className="phone-widget widget-depth rounded-2xl p-3 flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/5 flex items-center justify-center mr-3 border border-blue-400/20" style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}>
                            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="text-[10px] text-neutral-400 mb-1">Fluxo de Caixa</div>
                            <div className="h-2 w-14 bg-neutral-300/20 rounded-full" />
                          </div>
                          <div className="text-[10px] text-blue-400 font-bold">OK</div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/20 rounded-full" style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }} />
                    </div>
                  </div>
                </div>

                {/* Floating Glass Badges */}
                <div className="floating-badge absolute flex top-6 lg:top-12 left-[-15px] lg:left-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 flex items-center justify-center border border-emerald-400/30" style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)" }}>
                    <span className="text-base lg:text-xl" aria-hidden="true">🎯</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Meta atingida</p>
                    <p className="text-emerald-200/50 text-[10px] lg:text-xs font-medium">Patrimônio cresceu 22%</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-20 right-[-15px] lg:right-[-80px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30" style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)" }}>
                    <span className="text-base lg:text-lg" aria-hidden="true">📊</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Diagnóstico pronto</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Plano enviado com sucesso</p>
                  </div>
                </div>

              </div>
            </div>

            {/* 3. BOTTOM (Mobile) / Left (Desktop): HEADING + DESCRIPTION */}
            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-4 lg:px-0">
              <h3
                className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-0 lg:mb-5 tracking-tight"
                style={{ fontFamily: "var(--font-display, serif)" }}
              >
                {cardHeading}
              </h3>
              <p
                className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none"
                style={{ fontFamily: "var(--font-body, sans-serif)" }}
              >
                {cardDescription}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
