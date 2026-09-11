"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LeadStatusForm({
  leadId,
  currentStatus,
  currentNotes,
  statusOptions,
}: {
  leadId: string;
  currentStatus: string;
  currentNotes: string;
  statusOptions: readonly string[];
}) {
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function handleSave() {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("leads").update({ status, notes }).eq("id", leadId);
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-navy-2 mb-1.5">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border border-line rounded-sm px-3 py-2.5 text-sm"
        >
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {s.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-2 mb-1.5">
          Observações
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          className="w-full border border-line rounded-sm px-3 py-2.5 text-sm resize-none"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-green text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-green-hover disabled:opacity-60"
      >
        {saving ? "Salvando..." : "Salvar alterações"}
      </button>
    </div>
  );
}
