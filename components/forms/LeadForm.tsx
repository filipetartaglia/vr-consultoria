"use client";

import { useState, FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";
import { whatsappLink, SITE } from "@/lib/constants";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [startedTracked, setStartedTracked] = useState(false);

  function handleFocus() {
    if (!startedTracked) {
      trackEvent("form_started");
      setStartedTracked(true);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const params = new URLSearchParams(window.location.search);

    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      interest: formData.get("interest"),
      message: formData.get("message"),
      website: formData.get("website"), // honeypot
      source: "site",
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      utm_term: params.get("utm_term"),
      landing_page: window.location.pathname,
      referrer: document.referrer || null,
    };

    trackEvent("form_submitted");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(
          data.error ||
            "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp."
        );
        setStatus("error");
        return;
      }

      trackEvent("lead_created");
      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg(
        "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-wash border-l-2 border-green px-6 py-8 rounded-sm">
        <h3 className="font-display font-medium text-xl text-navy-2 mb-2">
          Recebemos seu contato!
        </h3>
        <p className="text-[#5B6472] mb-4">
          Vinicius vai te chamar no WhatsApp para combinar o melhor horário
          para o seu diagnóstico gratuito.
        </p>
        <a
          href={whatsappLink(
            "Olá Vinicius! Acabei de preencher o formulário no site da VR Consultoria."
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green text-white font-semibold text-sm px-5 py-3 rounded-sm hover:bg-green-hover transition-colors"
        >
          Ou fale agora no WhatsApp →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" onFocus={handleFocus}>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] w-px h-px opacity-0"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-navy-2 mb-1.5">
          Nome completo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none bg-white"
          placeholder="Como podemos te chamar"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-navy-2 mb-1.5">
          WhatsApp
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          minLength={10}
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none bg-white"
          placeholder="(21) 90000-0000"
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-semibold text-navy-2 mb-1.5">
          O que mais te interessa?{" "}
          <span className="font-normal text-[#5B6472]">(opcional)</span>
        </label>
        <input
          id="interest"
          name="interest"
          type="text"
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none bg-white"
          placeholder="Ex.: organizar finanças, começar a investir, milhas..."
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-navy-2 mb-1.5">
          Mensagem{" "}
          <span className="font-normal text-[#5B6472]">(opcional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none resize-none bg-white"
          placeholder="Conte um pouco do seu momento financeiro, se quiser"
        />
      </div>

      {status === "error" && (
        <div className="text-sm text-red-700 bg-red-50 px-4 py-3 rounded-sm border border-red-200" role="alert">
          <p>{errorMsg}</p>
          <a
            href={whatsappLink(
              "Olá Vinicius! Tive problema ao enviar o formulário e gostaria de agendar meu diagnóstico."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline mt-1 inline-block"
          >
            Falar pelo WhatsApp: {SITE.whatsappDisplay}
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-green text-white font-semibold text-sm py-3.5 rounded-sm hover:bg-green-hover transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Enviando..." : "Agendar meu diagnóstico gratuito"}
      </button>
    </form>
  );
}
