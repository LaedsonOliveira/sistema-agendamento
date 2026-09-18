"use client";

import { StatusTransacao } from "../types/Financeiro";

interface Props {
    filtroPeriodo: string;
    setFiltroPeriodo: (periodo: string) => void;
    filtroStatus: StatusTransacao | "todos";
    setFiltroStatus: (status: StatusTransacao | "todos") => void;
    onNovaDespesa: () => void;
}

export default function Filtros({
    filtroPeriodo,
    setFiltroPeriodo,
    filtroStatus,
    setFiltroStatus,
    onNovaDespesa,
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
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
                {/* FILTRO DE PERÍODO */}
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        Período
                    </label>
                    <div className="flex gap-1">
                        {periodos.map((p) => (
                            <button
                                key={p.valor}
                                onClick={() => setFiltroPeriodo(p.valor)}
                                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${filtroPeriodo === p.valor
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
                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                        Status
                    </label>
                    <select
                        value={filtroStatus}
                        onChange={(e) =>
                            setFiltroStatus(e.target.value as StatusTransacao | "todos")
                        }
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
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