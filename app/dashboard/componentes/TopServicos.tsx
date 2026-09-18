// components/dashboard/TopServicos.tsx
"use client";

import { ServicoMaisVendido } from "../types/dashboard";

interface Props {
    servicos: ServicoMaisVendido[];
}

export default function TopServicos({ servicos }: Props) {
    const maxQuantidade = Math.max(...servicos.map((s) => s.quantidade), 1);

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-950">
                Top Serviços
            </h2>

            {servicos.length === 0 ? (
                <p className="py-8 text-center text-sm text-slate-500">
                    Nenhum serviço cadastrado.
                </p>
            ) : (
                <div className="space-y-3">
                    {servicos.map((s, index) => (
                        <div key={s.nome}>
                            <div className="mb-1 flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">
                                    {index + 1}. {s.nome}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {s.quantidade}x
                                </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100">
                                <div
                                    className="h-2 rounded-full bg-slate-950 transition-all"
                                    style={{
                                        width: `${(s.quantidade / maxQuantidade) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}