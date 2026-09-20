"use client";

import { StatusTransacao } from "../types/Financeiro";

interface Props {
    filtroPeriodo: string;
    setFiltroPeriodo: (periodo: string) => void;
    filtroStatus: StatusTransacao | "todos";
    setFiltroStatus: (status: StatusTransacao | "todos") => void;
}

export default function Filtros({
    filtroPeriodo,
    setFiltroPeriodo,
    filtroStatus,
    setFiltroStatus,
}: Props) {
    const periodos = [
        { valor: "hoje", label: "Hoje" },
        { valor: "7dias", label: "7 dias" },
        { valor: "30dias", label: "30 dias" },
        { valor: "mes", label: "Mês atual" },
    ];

    const statusOptions = [
        { valor: "todos", label: "Todos" },
        { valor: "Pendente", label: "Pendente" },
        { valor: "Pago", label: "Pago" },
        { valor: "Cancelado", label: "Cancelado" },
    ];

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                {/* FILTRO DE PERÍODO */}
                <div className="w-full sm:w-auto">
                    <label className="mb-2 block text-xs font-medium text-slate-500">
                        Período
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                        {periodos.map((p) => (
                            <button
                                key={p.valor}
                                onClick={() => setFiltroPeriodo(p.valor)}
                                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:px-3 sm:text-sm ${filtroPeriodo === p.valor
                                        ? "bg-slate-950 text-white"
                                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                    }`}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FILTRO DE STATUS */}
                <div className="w-full sm:w-auto sm:min-w-[170px]">
                    <label className="mb-2 block text-xs font-medium text-slate-500">
                        Status
                    </label>
                    <select
                        value={filtroStatus}
                        onChange={(e) =>
                            setFiltroStatus(e.target.value as StatusTransacao | "todos")
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                    >
                        {statusOptions.map((s) => (
                            <option key={s.valor} value={s.valor}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}