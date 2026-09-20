// components/agenda/FiltrosAgenda.tsx
"use client";

import { Profissional, StatusAgendamento } from "../types/agenda";

interface Props {
    profissionais: Profissional[];
    filtroProfissional: string;
    setFiltroProfissional: (id: string) => void;
    filtroStatus: StatusAgendamento | "todos";
    setFiltroStatus: (status: StatusAgendamento | "todos") => void;
}

export default function FiltrosAgenda({
    profissionais,
    filtroProfissional,
    setFiltroProfissional,
    filtroStatus,
    setFiltroStatus,
}: Props) {
    return (
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {/* FILTRO PROFISSIONAL */}
            <div className="flex w-full flex-col gap-1 sm:w-auto sm:flex-row sm:items-center">
                <label className="text-xs font-medium text-slate-500">
                    Profissional:
                </label>
                <select
                    value={filtroProfissional}
                    onChange={(e) => setFiltroProfissional(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200 sm:w-auto"
                >
                    <option value="todos">Todos</option>
                    {profissionais.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.nome}
                        </option>
                    ))}
                </select>
            </div>

            {/* FILTRO STATUS */}
            <div className="flex w-full flex-col gap-1 sm:w-auto sm:flex-row sm:items-center">
                <label className="text-xs font-medium text-slate-500">Status:</label>
                <select
                    value={filtroStatus}
                    onChange={(e) =>
                        setFiltroStatus(e.target.value as StatusAgendamento | "todos")
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200 sm:w-auto"
                >
                    <option value="todos">Todos</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Pago">Pago</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Finalizado">Finalizado</option>
                </select>
            </div>
        </div>
    );
}