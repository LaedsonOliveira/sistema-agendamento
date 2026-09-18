"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Transacao } from "../types/Financeiro";

interface Props {
    transacoes: Transacao[];
    onMarcarComoPago: (id: string) => void;
    onEditar: (transacao: Transacao) => void;
}

export default function TabelaTransacoes({
    transacoes,
    onMarcarComoPago,
    onEditar,
}: Props) {
    const getStatusBadge = (status: string) => {
        const styles = {
            Pago: "bg-green-100 text-green-800",
            Pendente: "bg-yellow-100 text-yellow-800",
            Cancelado: "bg-red-100 text-red-800",
        };
        return styles[status as keyof typeof styles] || "bg-slate-100 text-slate-800";
    };

    const totalPago = transacoes
        .filter((t) => t.status === "Pago")
        .reduce((acc, t) => acc + t.valor, 0);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-950">
                    Transações
                </h2>
                <span className="text-sm text-slate-500">
                    {transacoes.length} transações | Total pago:{" "}
                    <span className="font-semibold text-green-600">
                        R$ {totalPago.toFixed(2).replace(".", ",")}
                    </span>
                </span>
            </div>

            {transacoes.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                    Nenhuma transação encontrada para este período.
                </p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-left">
                                <th className="pb-3 font-medium text-slate-500">Data</th>
                                <th className="pb-3 font-medium text-slate-500">Cliente</th>
                                <th className="pb-3 font-medium text-slate-500">Serviço</th>
                                <th className="pb-3 font-medium text-slate-500">Profissional</th>
                                <th className="pb-3 font-medium text-slate-500">Valor</th>
                                <th className="pb-3 font-medium text-slate-500">Status</th>
                                <th className="pb-3 font-medium text-slate-500">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacoes.map((t) => (
                                <tr
                                    key={t.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                >
                                    <td className="py-3 text-slate-700">
                                        {format(parseISO(t.data), "dd/MM/yyyy", { locale: ptBR })}
                                    </td>
                                    <td className="py-3 font-medium text-slate-900">
                                        {t.clienteNome}
                                    </td>
                                    <td className="py-3 text-slate-700">{t.servicoNome}</td>
                                    <td className="py-3 text-slate-700">{t.profissionalNome}</td>
                                    <td className="py-3 font-semibold text-slate-900">
                                        R$ {t.valor.toFixed(2).replace(".", ",")}
                                    </td>
                                    <td className="py-3">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusBadge(
                                                t.status
                                            )}`}
                                        >
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex gap-2">
                                            {t.status === "Pendente" && (
                                                <button
                                                    onClick={() => onMarcarComoPago(t.id)}
                                                    className="rounded-lg bg-green-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-green-700"
                                                >
                                                    Pagar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onEditar(t)}
                                                className="rounded-lg bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-300"
                                            >
                                                Editar
                                            </button>
                                        </div>
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