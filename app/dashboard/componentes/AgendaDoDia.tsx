// components/dashboard/AgendaDoDia.tsx
"use client";

import Link from "next/link";
import { AgendamentoHoje } from "../types/dashboard";

interface Props {
    agendamentos: AgendamentoHoje[];
}

export default function AgendaDoDia({ agendamentos }: Props) {
    const getStatusBadge = (status: string) => {
        const styles = {
            Pago: "bg-green-100 text-green-800",
            Pendente: "bg-yellow-100 text-yellow-800",
            Cancelado: "bg-red-100 text-red-800",
        };
        return styles[status as keyof typeof styles] || "bg-slate-100 text-slate-800";
    };

    // Ordena por horário
    const agendamentosOrdenados = [...agendamentos].sort((a, b) =>
        a.horario.localeCompare(b.horario)
    );

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* CABEÇALHO */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-950">
                    Agenda de Hoje
                </h2>
                <Link
                    href="/agenda"
                    className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
                >
                    Ver completa →
                </Link>
            </div>

            {/* LISTA */}
            {agendamentosOrdenados.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                    Nenhum agendamento para hoje.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-left">
                                <th className="pb-3 font-medium text-slate-500">Horário</th>
                                <th className="pb-3 font-medium text-slate-500">Cliente</th>
                                <th className="pb-3 font-medium text-slate-500">Serviço</th>
                                <th className="pb-3 font-medium text-slate-500">Profissional</th>
                                <th className="pb-3 font-medium text-slate-500">Valor</th>
                                <th className="pb-3 font-medium text-slate-500">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentosOrdenados.map((a) => (
                                <tr
                                    key={a.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                >
                                    <td className="py-3 font-medium text-slate-900">
                                        {a.horario}
                                    </td>
                                    <td className="py-3 text-slate-700">{a.clienteNome}</td>
                                    <td className="py-3 text-slate-700">{a.servicoNome}</td>
                                    <td className="py-3 text-slate-700">{a.profissionalNome}</td>
                                    <td className="py-3 font-semibold text-slate-900">
                                        R$ {a.valor.toFixed(2).replace(".", ",")}
                                    </td>
                                    <td className="py-3">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(
                                                a.status
                                            )}`}
                                        >
                                            {a.status}
                                        </span>
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