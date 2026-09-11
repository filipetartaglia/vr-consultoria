export const SITE = {
  name: "VR Consultoria",
  founder: "Vinicius Rodrigues",
  whatsappNumber: "5521971115365",
  whatsappDisplay: "+55 21 97111-5365",
  email: "viniciusrodrigues.wealthplanner@gmail.com",
  // TODO: preencher quando o domínio for registrado
  url: "https://vrconsultoria.com.br",
  description:
    "Consultoria financeira para quem quer organizar, proteger e planejar o crescimento do próprio patrimônio.",
};

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const LEAD_STATUS = [
  "novo",
  "contatado",
  "diagnostico_agendado",
  "diagnostico_realizado",
  "proposta",
  "cliente",
  "perdido",
] as const;

export const LEAD_SOURCES = [
  "instagram",
  "google",
  "site",
  "indicacao",
  "linktree",
  "campanha",
  "direto",
  "outro",
] as const;
