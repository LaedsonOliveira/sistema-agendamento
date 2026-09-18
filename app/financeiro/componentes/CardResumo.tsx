"use client";

interface Props {
  titulo: string;
  valor: number;
  tipo?: "moeda" | "numero";
  destaque?: "positivo" | "negativo" | "neutro";
}

export default function CardResumo({
  titulo,
  valor,
  tipo = "moeda",
  destaque = "neutro",
}: Props) {
  const valorFormatado =
    tipo === "moeda"
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
      <p className="text-xs font-medium text-slate-500 mb-1">{titulo}</p>
      <p className={`text-xl font-bold ${corDestaque}`}>{valorFormatado}</p>
    </div>
  );
}