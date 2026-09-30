import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/types/lead";
import { SITE } from "@/lib/constants";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { website, ...lead } = parsed.data;

  // Honeypot — silently reject bots
  if (website && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Log the lead server-side (always works regardless of Supabase config)
  const waText = [
    `*Novo lead — VR Consultoria*`,
    `Nome: ${lead.name}`,
    `WhatsApp: ${lead.phone}`,
    lead.interest ? `Interesse: ${lead.interest}` : "",
    lead.message ? `Mensagem: ${lead.message}` : "",
    lead.landing_page ? `Página: ${lead.landing_page}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  console.info("[VR Lead]", {
    name: lead.name,
    phone: lead.phone,
    interest: lead.interest,
    wa_link: `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(waText)}`,
  });

  // Try to save to Supabase only if configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      const { createServiceClient } = await import("@/lib/supabase/service");
      const supabase = createServiceClient();

      await supabase.from("leads").insert({
        name: lead.name,
        phone: lead.phone,
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
    } catch (err) {
      // Log but don't block the response
      console.error("[VR Lead] Supabase error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
