// components/dashboard/GraficoAgendamentos.tsx
"use client";

import { useState } from "react";
import { DadosGrafico } from "../types/dashboard";

interface Props {
    dados: DadosGrafico[];
    periodo?: string;
}

export default function GraficoAgendamentos({ dados }: Props) {
    const [periodoGrafico, setPeriodoGrafico] = useState("7dias");

    const maxQuantidade = Math.max(...dados.map((d) => d.quantidade), 1);

    const periodos = [
        { valor: "7dias", label: "7 dias" },
        { valor: "30dias", label: "30 dias" },
        { valor: "mes", label: "Mês" },
    ];

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* CABEÇALHO */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-950">
                    Agendamentos
                </h2>
                <div className="flex gap-1">
                    {periodos.map((p) => (
                        <button
                            key={p.valor}
                            onClick={() => setPeriodoGrafico(p.valor)}
                            className={`rounded-lg px-2 py-1 text-xs font-medium transition ${periodoGrafico === p.valor
                                    ? "bg-slate-950 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* GRÁFICO DE BARRAS */}
            <div className="flex items-end justify-between gap-2 h-40">
                {dados.map((d) => {
                    const altura = (d.quantidade / maxQuantidade) * 100;
                    return (
                        <div key={d.dia} className="flex flex-col items-center flex-1">
                            <span className="mb-1 text-xs font-medium text-slate-600">
                                {d.quantidade}
                            </span>
                            <div
                                className="w-full rounded-t-lg bg-slate-950 transition-all hover:bg-slate-700"
                                style={{ height: `${altura}%`, minHeight: "4px" }}
                                title={`${d.dia}: ${d.quantidade} agendamentos`}
                            />
                            <span className="mt-2 text-xs text-slate-500">{d.dia}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}