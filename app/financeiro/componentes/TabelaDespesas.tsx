// components/financeiro/TabelaDespesas.tsx
"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Despesa } from "../types/financeiro";

interface Props {
  despesas: Despesa[];
  onExcluir: (id: string) => void;
  onNovaDespesa: () => void;  // ← NOVA PROP
}

export default function TabelaDespesas({
  despesas,
  onExcluir,
  onNovaDespesa  // ← RECEBE A FUNÇÃO
}: Props) {
  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-950">Despesas</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <span className="text-sm text-slate-500">
            Total:{" "}
            <span className="font-semibold text-red-600">
              R$ {totalDespesas.toFixed(2).replace(".", ",")}
            </span>
          </span>
          <button
            onClick={onNovaDespesa}
            className="rounded-lg bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            + Nova Despesa
          </button>
        </div>
      </div>

      {despesas.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          Nenhuma despesa cadastrada.
        </p>
      ) : (
        <div className="overflow-x-auto -mx-1 px-1">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 pr-2 font-medium text-slate-500">Data</th>
                <th className="pb-3 pr-2 font-medium text-slate-500">Descrição</th>
                <th className="pb-3 pr-2 font-medium text-slate-500">Categoria</th>
                <th className="pb-3 pr-2 font-medium text-slate-500">Valor</th>
                <th className="pb-3 font-medium text-slate-500">Ações</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="py-3 pr-2 text-slate-700">
                    {format(parseISO(d.data), "dd/MM/yyyy", { locale: ptBR })}
                  </td>
                  <td className="py-3 pr-2 font-medium text-slate-900">
                    {d.descricao}
                  </td>
                  <td className="py-3 pr-2">
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700">
                      {d.categoria}
                    </span>
                  </td>
                  <td className="py-3 pr-2 font-semibold text-red-600">
                    R$ {d.valor.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="py-3">
                    <button
                      onClick={() => onExcluir(d.id)}
                      className="rounded-lg bg-red-100 px-2 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-200"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}