import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/types/lead";
import { createServiceClient } from "@/lib/supabase/service";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const parsed = leadFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { website, ...lead } = parsed.data;

  // honeypot: campo invisível que só um bot preencheria
  if (website && website.length > 0) {
    // finge sucesso para não dar sinal ao bot, mas não grava nada
    return NextResponse.json({ ok: true });
  }

  try {
    const supabase = createServiceClient();

    const { error } = await supabase.from("leads").insert({
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      interest: lead.interest || null,
      message: lead.message || null,
      source: lead.source || "site",
      utm_source: lead.utm_source || null,
      utm_medium: lead.utm_medium || null,
      utm_campaign: lead.utm_campaign || null,
      utm_content: lead.utm_content || null,
      utm_term: lead.utm_term || null,
      landing_page: lead.landing_page || null,
      referrer: lead.referrer || null,
    });

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao gravar lead:", error);
    return NextResponse.json(
      {
        error:
          "Não foi possível enviar seu diagnóstico agora. Tente novamente ou fale pelo WhatsApp.",
      },
      { status: 503 }
    );
  }
}
