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
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500 sm:text-xs">
        {titulo}
      </p>
      <p className={`text-lg font-bold sm:text-xl ${corDestaque}`}>{valorFormatado}</p>
    </div>
  );
}