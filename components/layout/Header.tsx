"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/servicos", label: "Serviços" },
  { href: "/#calculadora", label: "Calculadora" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/vinicius", label: "Vinicius" },
];

// The cinematic hero uses end: "+=7000" scroll travel.
// We reveal the header only after the user has scrolled past the hero.
const HERO_SCROLL_END = typeof window !== "undefined" ? window.innerHeight * 6.2 : 6200;

export function Header() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const threshold = window.innerHeight * 6.2;
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
      <div className="wrap flex items-center justify-between py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display font-medium text-lg text-navy transition-colors"
        >
          <span className="w-[34px] h-[34px] rounded-sm bg-navy flex items-center justify-center font-mono text-[13px] text-white">
            VR
          </span>
          {"VR Consultoria"}
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
