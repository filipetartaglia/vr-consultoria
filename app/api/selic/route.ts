import { NextResponse } from "next/server";

// Fallback usado apenas se a API do Banco Central estiver indisponível.
// Atualizar manualmente se ficar defasado por muito tempo.
const FALLBACK_SELIC = { value: 14.0, date: "05/08/2026", isFallback: true };

const BCB_URL =
  "https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json";

export const revalidate = 3600; // recache a cada 1h

export async function GET() {
  try {
    const res = await fetch(BCB_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`BCB respondeu ${res.status}`);

    const data = (await res.json()) as { data: string; valor: string }[];
    const latest = data[0];

    if (!latest) throw new Error("Resposta da BCB sem dados");

    const value = parseFloat(latest.valor.replace(",", "."));

    if (Number.isNaN(value)) throw new Error("Valor da Selic inválido");

    return NextResponse.json({
      value,
      date: latest.data,
      isFallback: false,
    });
  } catch (error) {
    return NextResponse.json(FALLBACK_SELIC);
  }
}
