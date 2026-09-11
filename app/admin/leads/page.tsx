import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const supabase = createClient();
  let query = supabase
    .from("leads")
    .select("id, name, phone, email, source, interest, status, created_at")
    .order("created_at", { ascending: false });

  if (searchParams.status) {
    query = query.eq("status", searchParams.status);
  }

  const { data: leads } = await query;

  return (
    <div className="wrap py-10">
      <h1 className="font-display font-medium text-2xl mb-6">Leads</h1>

      <div className="overflow-x-auto bg-white border border-line rounded-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="px-4 py-3 font-mono text-xs text-[#5B6472]">Nome</th>
              <th className="px-4 py-3 font-mono text-xs text-[#5B6472]">WhatsApp</th>
              <th className="px-4 py-3 font-mono text-xs text-[#5B6472]">E-mail</th>
              <th className="px-4 py-3 font-mono text-xs text-[#5B6472]">Origem</th>
              <th className="px-4 py-3 font-mono text-xs text-[#5B6472]">Status</th>
              <th className="px-4 py-3 font-mono text-xs text-[#5B6472]">Data</th>
            </tr>
          </thead>
          <tbody>
            {(leads ?? []).map((lead) => (
              <tr key={lead.id} className="border-b border-line last:border-0 hover:bg-neutral">
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-navy-2 hover:text-green">
                    {lead.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{lead.phone}</td>
                <td className="px-4 py-3">{lead.email}</td>
                <td className="px-4 py-3 capitalize">{lead.source}</td>
                <td className="px-4 py-3 font-mono text-xs">{lead.status}</td>
                <td className="px-4 py-3 text-[#5B6472] text-xs">
                  {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                </td>
              </tr>
            ))}
            {(!leads || leads.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[#5B6472]">
                  Nenhum lead encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
