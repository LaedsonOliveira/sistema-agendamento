// components/agenda/VisaoMes.tsx
"use client";

import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { Agendamento } from "../types/agenda";

interface Props {
    data: Date;
    agendamentos: Agendamento[];
    onSelecionar: (agendamento: Agendamento) => void;
}

export default function VisaoMes({ data, agendamentos, onSelecionar }: Props) {
    const inicioMes = startOfMonth(data);
    const fimMes = endOfMonth(data);
    const inicioCalendario = startOfWeek(inicioMes, { locale: ptBR });
    const fimCalendario = endOfWeek(fimMes, { locale: ptBR });

    const dias: Date[] = [];
    let diaAtual = inicioCalendario;
    while (diaAtual <= fimCalendario) {
        dias.push(diaAtual);
        diaAtual = addDays(diaAtual, 1);
    }

    const getAgendamentosDoDia = (dia: Date) => {
        return agendamentos.filter((a) => isSameDay(parseISO(a.data), dia));
    };

    const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {/* CABEÇALHO DOS DIAS */}
            <div className="grid grid-cols-7 gap-1 mb-2">
                {diasDaSemana.map((d) => (
                    <div
                        key={d}
                        className="text-center text-xs font-medium uppercase text-slate-500 py-2"
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* DIAS */}
            <div className="grid grid-cols-7 gap-1">
                {dias.map((dia) => {
                    const isMesAtual = isSameMonth(dia, data);
                    const isHoje = isSameDay(dia, new Date());
                    const ags = getAgendamentosDoDia(dia);

                    return (
                        <div
                            key={dia.toISOString()}
                            className={`min-h-[100px] rounded-lg border p-2 transition ${isMesAtual
                                    ? "border-slate-200 bg-white"
                                    : "border-slate-100 bg-slate-50"
                                } ${isHoje ? "ring-2 ring-slate-950" : ""}`}
                        >
                            <div
                                className={`mb-1 text-xs font-semibold ${isMesAtual ? "text-slate-900" : "text-slate-400"
                                    } ${isHoje ? "text-slate-950" : ""}`}
                            >
                                {format(dia, "dd")}
                            </div>
                            <div className="space-y-1">
                                {ags.slice(0, 3).map((a) => (
                                    <button
                                        key={a.id}
                                        onClick={() => onSelecionar(a)}
                                        className={`w-full truncate rounded px-1.5 py-0.5 text-left text-[10px] transition hover:opacity-80 ${a.status === "Pago"
                                                ? "bg-green-100 text-green-800"
                                                : a.status === "Pendente"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : a.status === "Cancelado"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-blue-100 text-blue-800"
                                            }`}
                                    >
                                        {a.horario} {a.clienteNome}
                                    </button>
                                ))}
                                {ags.length > 3 && (
                                    <div className="text-[10px] text-slate-500 pl-1">
                                        +{ags.length - 3} mais
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}