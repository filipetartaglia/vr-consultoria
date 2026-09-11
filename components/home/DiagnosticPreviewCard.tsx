export function DiagnosticPreviewCard() {
  const categories = [
    { label: "Moradia", pct: 32, color: "#0B1B33" },
    { label: "Investimentos", pct: 24, color: "#2F6E51" },
    { label: "Alimentação", pct: 18, color: "#7FA98D" },
    { label: "Dívidas", pct: 14, color: "#B8C2CE" },
    { label: "Lazer", pct: 12, color: "#D9DCE1" },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-green/25 blur-[80px] rounded-full" aria-hidden="true" />
      <div className="relative bg-white rounded-xl shadow-soft overflow-hidden rotate-[1.5deg] w-full max-w-[380px] mx-auto">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-neutral">
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="w-2.5 h-2.5 rounded-full bg-line" />
          <span className="ml-auto font-mono text-[10px] text-[#5B6472]">
            diagnóstico-vr.pdf
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-display font-medium text-sm text-navy-2">
                Diagnóstico Financeiro
              </div>
              <div className="font-mono text-[10px] text-[#5B6472]">exemplo ilustrativo</div>
            </div>
            <span className="font-mono text-[10px] px-2 py-1 rounded-full bg-green-wash text-green">
              estruturado
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {categories.map((c) => (
              <div key={c.label}>
                <div className="flex justify-between text-[11px] font-mono text-[#5B6472] mb-1">
                  <span>{c.label}</span>
                  <span>{c.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-neutral overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <svg viewBox="0 0 300 60" className="w-full h-[50px]" aria-hidden="true">
            <path
              d="M0,50 C30,45 45,30 70,32 C100,34 110,15 140,18 C170,21 180,8 210,10 C240,12 260,3 300,2"
              fill="none"
              stroke="#2F6E51"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
