"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/#calculadora", label: "Calculadora" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/vinicius", label: "Vinicius" },
];

// Hero scroll travel = 2800px. Reveal header after the animation ends.
export function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Use a fixed threshold slightly above the hero scroll travel (2800px)
    const threshold = 2900;
    const onScroll = () => setVisible(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        "bg-white/95 backdrop-blur border-b border-line",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <div className="wrap flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo-vr.png"
            alt="VR Consultoria — Vinicius Rodrigues"
            width={52}
            height={52}
            className="object-contain"
            priority
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display font-semibold text-sm tracking-wide text-navy uppercase">
              Vinicius Rodrigues
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-navy/50 uppercase">
              Consultoria
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-9 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-navy-2 hover:text-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button href="/diagnostico">Agende seu diagnóstico</Button>
      </div>
    </header>
  );
}
