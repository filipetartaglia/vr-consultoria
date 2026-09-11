"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollRevealOptions {
  /** y offset to start from (default 48) */
  y?: number;
  /** stagger between children in seconds (default 0.12) */
  stagger?: number;
  /** animation duration in seconds (default 0.75) */
  duration?: number;
  /** ScrollTrigger start position (default "top 88%") */
  start?: string;
  /** GSAP ease (default "power3.out") */
  ease?: string;
  /** delay before animation starts (default 0) */
  delay?: number;
}

/**
 * Animates children of the container ref into view when they enter the viewport.
 * Children must have the `data-reveal` attribute to be animated.
 * If no children have `data-reveal`, the container itself is animated.
 */
export function useScrollReveal<T extends HTMLElement>(
  containerRef: React.RefObject<T | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 48,
    stagger = 0.12,
    duration = 0.75,
    start = "top 88%",
    ease = "power3.out",
    delay = 0,
  } = options;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>("[data-reveal]");
    const elements: HTMLElement[] = targets.length > 0 ? Array.from(targets) : [container];

    gsap.set(elements, { opacity: 0, y, willChange: "transform, opacity" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      },
    });

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration,
      ease,
      delay,
      stagger,
      clearProps: "willChange",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [containerRef, y, stagger, duration, start, ease, delay]);
}
