// Eventos previstos na V1 (ver seção 18 do contexto mestre):
// page_view, cta_diagnostico_click, whatsapp_click, form_started,
// form_submitted, calculator_started, calculator_completed, lead_created
//
// Por enquanto isso só loga no console em dev. Quando o Meta Pixel /
// GA4 forem configurados, plugar as chamadas reais aqui — mantendo
// essa única função como ponto de entrada evita espalhar fbq()/gtag()
// pelos componentes.
export function trackEvent(
  name:
    | "page_view"
    | "cta_diagnostico_click"
    | "whatsapp_click"
    | "form_started"
    | "form_submitted"
    | "calculator_started"
    | "calculator_completed"
    | "lead_created",
  payload?: Record<string, unknown>
) {
  if (process.env.NODE_ENV !== "production") {
    console.log("[analytics]", name, payload ?? {});
  }

  // TODO Fase 7: enviar para GA4 (window.gtag) e/ou Meta Pixel (window.fbq)
  // quando os IDs forem configurados em .env.local.
}
