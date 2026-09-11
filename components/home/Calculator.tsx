"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";
import { useDebounceCallback } from "@/components/hooks/use-debounce-callback";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const currency = (n: number) =>
  `R$ ${Math.round(n).toLocaleString("pt-BR")}`;

function projectionSeries(
  initial: number,
  monthly: number,
  years: number,
  annualRate: number
) {
  const monthlyRate = Math.pow(1 + annualRate / 100, 1 / 12) - 1;
  let value = initial;
  const points = [value];
  for (let m = 1; m <= years * 12; m++) {
    value = value * (1 + monthlyRate) + monthly;
    if (m % 12 === 0) points.push(value);
  }
  return points;
}

// --------------------------------------------------
// Custom styled slider field
// --------------------------------------------------
function SliderField({
  label,
  hint,
  formatted,
  min,
  max,
  step,
  value,
  onChange,
  inputPrefix = "",
  inputSuffix = "",
}: {
  label: string;
  hint?: string;
  formatted: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  inputPrefix?: string;
  inputSuffix?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const [localText, setLocalText] = useState(String(value));
  const [focused, setFocused] = useState(false);

  // Sync local text when external value changes (e.g., after debounce)
  useEffect(() => {
    if (!focused) setLocalText(String(value));
  }, [value, focused]);

  const handleTextChange = useDebounceCallback(
    useCallback(
      (raw: string) => {
        const parsed = parseFloat(raw.replace(/[^0-9.]/g, ""));
        if (!isNaN(parsed)) {
          const clamped = Math.min(max, Math.max(min, parsed));
          onChange(clamped);
        }
      },
      [min, max, onChange]
    ),
    400
  );

  return (
    <div className="mb-7">
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-[13px] font-semibold text-navy-2">
          {label}
          {hint && (
            <span className="ml-1.5 font-normal text-[#5B6472] normal-case tracking-normal">
              {hint}
            </span>
          )}
        </label>
        {/* Editable value chip */}
        <div className="flex items-center gap-0.5 text-sm font-mono text-green min-w-[100px] justify-end">
          {inputPrefix && <span className="text-[#5B6472] text-xs">{inputPrefix}</span>}
          <input
            type="text"
            inputMode="decimal"
            value={focused ? localText : formatted}
            onFocus={() => {
              setFocused(true);
              setLocalText(String(value));
            }}
            onBlur={() => {
              setFocused(false);
              const parsed = parseFloat(localText.replace(/[^0-9.]/g, ""));
              if (!isNaN(parsed)) {
                const clamped = Math.min(max, Math.max(min, parsed));
                onChange(clamped);
              }
            }}
            onChange={(e) => {
              setLocalText(e.target.value);
              handleTextChange(e.target.value);
            }}
            className="w-auto max-w-[90px] text-right bg-transparent border-none outline-none font-mono text-sm text-green focus:text-navy-2 cursor-text"
            style={{ fontVariantNumeric: "tabular-nums" }}
          />
          {inputSuffix && <span className="text-[#5B6472] text-xs">{inputSuffix}</span>}
        </div>
      </div>

      {/* Slider with filled track via inline gradient */}
      <div className="relative py-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="vr-slider"
          style={{
            background: `linear-gradient(to right, #2F6E51 0%, #2F6E51 ${pct}%, #D9DCE1 ${pct}%, #D9DCE1 100%)`,
          }}
        />
      </div>

      {/* Min / Max labels */}
      <div className="flex justify-between text-[10px] font-mono text-[#B8C2CE] mt-1 px-0.5">
        <span>{inputPrefix}{min.toLocaleString("pt-BR")}{inputSuffix}</span>
        <span>{inputPrefix}{max.toLocaleString("pt-BR")}{inputSuffix}</span>
      </div>
    </div>
  );
}

// --------------------------------------------------
// Main Calculator
// --------------------------------------------------
export function Calculator() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(1000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(14);
  const [rateLabel, setRateLabel] = useState("carregando Selic...");
  const [rateEditedManually, setRateEditedManually] = useState(false);
  const [startedTracked, setStartedTracked] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animatedOnce = useRef(false);

  // Fetch live Selic
  useEffect(() => {
    let cancelled = false;
    fetch("/api/selic")
      .then((res) => res.json())
      .then((data: { value: number; date: string; isFallback: boolean }) => {
        if (cancelled || rateEditedManually) return;
        setRate(data.value);
        setRateLabel(
          data.isFallback
            ? `ref: Selic ${data.value.toFixed(2)}% (não atualizado agora)`
            : `Selic: ${data.value.toFixed(2)}% a.a. — Banco Central, ${data.date}`
        );
      })
      .catch(() => {
        if (cancelled) return;
        setRateLabel("ref: Selic 14,00% (não foi possível atualizar)");
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const points = projectionSeries(initial, monthly, years, rate);
  const result = points[points.length - 1];

  // Draw chart
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const pad = 12;
    ctx.clearRect(0, 0, w, h);

    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;

    // Gradient fill under line
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "rgba(47,110,81,0.20)");
    grad.addColorStop(1, "rgba(47,110,81,0)");

    ctx.beginPath();
    points.forEach((p, i) => {
      const x = pad + (i / (points.length - 1)) * (w - pad * 2);
      const y = h - pad - ((p - min) / range) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    // Close for fill
    const lastX = pad + (w - pad * 2);
    const firstY = h - pad - ((points[0] - min) / range) * (h - pad * 2);
    ctx.lineTo(lastX, h - pad);
    ctx.lineTo(pad, h - pad);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    points.forEach((p, i) => {
      const x = pad + (i / (points.length - 1)) * (w - pad * 2);
      const y = h - pad - ((p - min) / range) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = "#2F6E51";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.stroke();

    // End dot
    const last = points[points.length - 1];
    const lx = pad + (w - pad * 2);
    const ly = h - pad - ((last - min) / range) * (h - pad * 2);
    ctx.beginPath();
    ctx.arc(lx, ly, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lx, ly, 5, 0, Math.PI * 2);
    ctx.strokeStyle = "#2F6E51";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [points]);

  // Scroll-triggered count-up animation for result
  useEffect(() => {
    if (!resultRef.current || !sectionRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (animatedOnce.current) return;
        animatedOnce.current = true;
        gsap.from(resultRef.current, {
          textContent: 0,
          duration: 1.5,
          ease: "power3.out",
          snap: { textContent: 1000 },
          onUpdate() {
            const el = resultRef.current;
            if (el) {
              const v = parseFloat(el.textContent?.replace(/[^0-9]/g, "") ?? "0");
              el.textContent = currency(v);
            }
          },
        });
      },
    });

    return () => trigger.kill();
  }, [result]);

  // Scroll reveal for section
  useEffect(() => {
    if (!sectionRef.current) return;
    const targets = sectionRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 40 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true,
      },
    });
    tl.to(targets, { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" });

    return () => { tl.kill(); };
  }, []);

  function handleInput(setter: (v: number) => void, value: number) {
    if (!startedTracked) {
      trackEvent("calculator_started");
      setStartedTracked(true);
    }
    setter(value);
  }

  const ratePct = ((rate - 1) / (20 - 1)) * 100;

  return (
    <section ref={sectionRef} className="bg-navy-2 section" id="calculadora">
      <div className="wrap">
        <span className="eyebrow eyebrow-on-navy" data-reveal>Ferramenta</span>
        <h2
          className="font-display font-medium text-[28px] md:text-[34px] leading-[1.15] max-w-[640px] text-white"
          data-reveal
        >
          Veja, na prática, o que o tempo e a constância podem fazer pelo seu
          patrimônio.
        </h2>

        {/* Card */}
        <div
          className="mt-12 rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] grid md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr]"
          data-reveal
        >
          {/* Left — inputs */}
          <div className="bg-white p-7 md:p-10">
            <p className="text-[13px] font-mono text-[#5B6472] mb-8 leading-relaxed">
              Ajuste os valores e veja a projeção atualizar em tempo real.
            </p>

            <SliderField
              label="Patrimônio inicial"
              formatted={currency(initial)}
              min={0}
              max={200000}
              step={1000}
              value={initial}
              inputPrefix="R$ "
              onChange={(v) => handleInput(setInitial, v)}
            />
            <SliderField
              label="Aporte mensal"
              formatted={currency(monthly)}
              min={0}
              max={20000}
              step={100}
              value={monthly}
              inputPrefix="R$ "
              onChange={(v) => handleInput(setMonthly, v)}
            />
            <SliderField
              label="Período"
              formatted={`${years} anos`}
              min={1}
              max={30}
              step={1}
              value={years}
              inputSuffix=" anos"
              onChange={(v) => handleInput(setYears, v)}
            />

            {/* Rate field — special because of the Selic label */}
            <div className="mb-2">
              <div className="flex items-baseline justify-between mb-3">
                <label className="text-[13px] font-semibold text-navy-2">
                  Rentabilidade estimada
                </label>
                <span className="font-mono text-sm text-green">{rate.toFixed(2)}%</span>
              </div>
              <div className="relative py-1">
                <input
                  type="range"
                  min={1}
                  max={20}
                  step={0.25}
                  value={rate}
                  onChange={(e) => {
                    setRateEditedManually(true);
                    setRateLabel("valor ajustado manualmente");
                    handleInput(setRate, Number(e.target.value));
                  }}
                  className="vr-slider"
                  style={{
                    background: `linear-gradient(to right, #2F6E51 0%, #2F6E51 ${ratePct}%, #D9DCE1 ${ratePct}%, #D9DCE1 100%)`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#B8C2CE] mt-1 px-0.5">
                <span>1%</span>
                <span className="text-center text-[#5B6472] text-[9px]">{rateLabel}</span>
                <span>20%</span>
              </div>
            </div>
          </div>

          {/* Right — result */}
          <div className="bg-navy text-white p-7 md:p-10 flex flex-col justify-between min-h-[340px]">
            <div>
              <div className="font-mono text-xs tracking-[0.12em] uppercase text-white/45 mb-1">
                Projeção estimada em {years} {years === 1 ? "ano" : "anos"}
              </div>
              <div
                ref={resultRef}
                className="font-display text-4xl md:text-5xl mt-2 leading-none tracking-tight"
              >
                {currency(result)}
              </div>

              {/* Breakdown chips */}
              <div className="flex flex-wrap gap-3 mt-5">
                <div className="bg-white/8 rounded-lg px-3.5 py-2 text-[11px] font-mono">
                  <div className="text-white/45 mb-0.5">Aportado total</div>
                  <div className="text-white font-semibold">
                    {currency(initial + monthly * years * 12)}
                  </div>
                </div>
                <div className="bg-white/8 rounded-lg px-3.5 py-2 text-[11px] font-mono">
                  <div className="text-white/45 mb-0.5">Juros compostos</div>
                  <div className="text-green font-semibold">
                    {currency(result - (initial + monthly * years * 12))}
                  </div>
                </div>
              </div>

              <canvas
                ref={canvasRef}
                width={560}
                height={140}
                className="w-full h-[120px] mt-6 rounded-lg"
              />
            </div>

            <div className="mt-6">
              <p className="text-sm text-white/70 mb-4 leading-relaxed">
                Quer transformar essa projeção em um planejamento real?
              </p>
              <Button href="/diagnostico" variant="primary">
                Agende seu diagnóstico gratuito
              </Button>
              <p className="text-[10px] text-white/35 mt-3 leading-relaxed">
                Simulação educativa. Não representa promessa, garantia ou
                recomendação de investimento — rentabilidades reais variam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
