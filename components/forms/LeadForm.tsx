"use client";

import { useState, FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

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
      email: formData.get("email"),
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
          Recebemos suas informações.
        </h3>
        <p className="text-[#5B6472]">
          Vinicius vai entrar em contato pelo WhatsApp ou e-mail para
          combinar o melhor horário para o seu diagnóstico gratuito.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" onFocus={handleFocus}>
      {/* honeypot — invisível para humanos, bots costumam preencher */}
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
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none"
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
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none"
          placeholder="(21) 90000-0000"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-navy-2 mb-1.5">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none"
          placeholder="voce@email.com"
        />
      </div>

      <div>
        <label htmlFor="interest" className="block text-sm font-semibold text-navy-2 mb-1.5">
          O que mais te interessa? <span className="font-normal text-[#5B6472]">(opcional)</span>
        </label>
        <input
          id="interest"
          name="interest"
          type="text"
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none"
          placeholder="Ex.: organizar minhas finanças, começar a investir..."
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-navy-2 mb-1.5">
          Mensagem <span className="font-normal text-[#5B6472]">(opcional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full border border-line rounded-sm px-4 py-3 text-sm focus:border-navy-2 outline-none resize-none"
          placeholder="Conte um pouco do seu momento financeiro, se quiser"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {errorMsg}
        </p>
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
