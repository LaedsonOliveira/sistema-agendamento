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
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-slate-500">{titulo}</p>
        {icone && <span className="text-lg">{icone}</span>}
      </div>
      <p className={`text-xl font-bold ${corDestaque}`}>{valorFormatado}</p>
    </div>
  );
}