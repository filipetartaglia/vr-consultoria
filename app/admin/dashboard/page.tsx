import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const { data: leads } = await supabase
    .from("leads")
    .select("id, name, source, status, created_at")
    .order("created_at", { ascending: false });

  const total = leads?.length ?? 0;
  const recent = leads?.slice(0, 5) ?? [];

  const bySource = (leads ?? []).reduce<Record<string, number>>((acc, l) => {
    const key = l.source || "outro";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const diagnosticos = (leads ?? []).filter(
    (l) => l.status === "diagnostico_agendado" || l.status === "diagnostico_realizado"
  ).length;

  return (
    <div className="wrap py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display font-medium text-2xl">Dashboard</h1>
        <Link href="/admin/leads" className="text-sm font-semibold text-green">
          Ver todos os leads →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Card label="Total de leads" value={total} />
        <Card label="Diagnósticos" value={diagnosticos} />
        <Card label="Origens ativas" value={Object.keys(bySource).length} />
        <Card label="Últimos 5" value={recent.length} />
      </div>

      <div className="bg-white border border-line rounded-sm p-6 mb-8">
        <h2 className="font-display text-lg mb-4">Leads por origem</h2>
        <div className="space-y-2">
          {Object.entries(bySource).map(([source, count]) => (
            <div key={source} className="flex justify-between text-sm border-b border-line py-2">
              <span className="capitalize">{source}</span>
              <span className="font-mono text-green">{count}</span>
            </div>
          ))}
          {Object.keys(bySource).length === 0 && (
            <p className="text-sm text-[#5B6472]">Nenhum lead ainda.</p>
          )}
        </div>
      </div>

      <div className="bg-white border border-line rounded-sm p-6">
        <h2 className="font-display text-lg mb-4">Leads recentes</h2>
        <div className="space-y-2">
          {recent.map((lead) => (
            <Link
              key={lead.id}
              href={`/admin/leads/${lead.id}`}
              className="flex justify-between text-sm border-b border-line py-2.5 hover:text-green"
            >
              <span>{lead.name}</span>
              <span className="text-[#5B6472] font-mono text-xs">{lead.status}</span>
            </Link>
          ))}
          {recent.length === 0 && (
            <p className="text-sm text-[#5B6472]">Nenhum lead ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-line rounded-sm p-5">
      <div className="text-xs font-mono text-[#5B6472] mb-1">{label}</div>
      <div className="font-display text-2xl text-navy-2">{value}</div>
    </div>
  );
}
