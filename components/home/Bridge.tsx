"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/components/hooks/use-scroll-reveal";

export function Bridge() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef, { y: 24, duration: 0.9 });

  return (
    <section ref={sectionRef} className="bg-green-wash py-16">
      <div className="wrap max-w-[760px] text-center mx-auto">
        <p
          className="font-display text-xl md:text-[26px] leading-[1.45] text-navy-2"
          data-reveal
        >
          A VR existe para transformar essa desorganização em clareza — com um
          plano estruturado para a sua realidade, não uma fórmula genérica.
        </p>
      </div>
    </section>
  );
}
