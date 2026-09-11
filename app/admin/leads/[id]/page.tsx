import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { LEAD_STATUS } from "@/lib/constants";
import { LeadStatusForm } from "./LeadStatusForm";

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const { data: lead } = await supabase
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!lead) return notFound();

  return (
    <div>
      <h1 className="font-display font-medium text-2xl mb-6">{lead.name}</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-line rounded-sm p-6 space-y-3 text-sm">
          <Row label="WhatsApp" value={lead.phone} />
          <Row label="E-mail" value={lead.email} />
          <Row label="Interesse" value={lead.interest || "—"} />
          <Row label="Mensagem" value={lead.message || "—"} />
          <Row label="Origem" value={lead.source || "—"} />
          <Row
            label="UTM"
            value={
              [lead.utm_source, lead.utm_medium, lead.utm_campaign]
                .filter(Boolean)
                .join(" / ") || "—"
            }
          />
          <Row
            label="Recebido em"
            value={new Date(lead.created_at).toLocaleString("pt-BR")}
          />
        </div>

        <div className="bg-white border border-line rounded-sm p-6">
          <LeadStatusForm
            leadId={lead.id}
            currentStatus={lead.status}
            currentNotes={lead.notes || ""}
            statusOptions={LEAD_STATUS}
          />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line py-2 last:border-0">
      <span className="text-[#5B6472]">{label}</span>
      <span className="text-navy-2 text-right">{value}</span>
    </div>
  );
}
