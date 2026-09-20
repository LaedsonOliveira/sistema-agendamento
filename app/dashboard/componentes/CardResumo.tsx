// components/dashboard/CardResumo.tsx
"use client";

interface Props {
  titulo: string;
  valor: number | string;
  tipo?: "moeda" | "numero" | "texto";
  icone?: string;
  destaque?: "positivo" | "negativo" | "neutro";
}

export default function CardResumo({
  titulo,
  valor,
  tipo = "numero",
  icone,
  destaque = "neutro",
}: Props) {
  const valorFormatado =
    tipo === "moeda" && typeof valor === "number"
      ? `R$ ${valor.toFixed(2).replace(".", ",")}`
      : valor.toString();

  const corDestaque =
    destaque === "positivo"
      ? "text-green-600"
      : destaque === "negativo"
        ? "text-red-600"
        : "text-slate-950";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500 sm:text-xs">{titulo}</p>
        {icone && <span className="text-base sm:text-lg">{icone}</span>}
      </div>
      <p className={`text-lg font-bold sm:text-xl ${corDestaque}`}>{valorFormatado}</p>
    </div>
  );
}