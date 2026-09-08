"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
    estabelecimento: {
        name: string;
        primaryColor: string;
    };
    profissional: { nome: string };
    servico: { nome: string; preco: number };
    data: Date;
    horario: string;
    clienteNome: string;
    cores: { primary: string; secondary: string };
    onVoltar: () => void;
}

export default function ConfirmacaoAgendamento({
    estabelecimento,
    profissional,
    servico,
    data,
    horario,
    clienteNome,
    cores,
    onVoltar,
}: Props) {
    const dataFormatada = format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });

    return (
        <div className="text-center">
            <div className="mb-4 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
                    OK
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
                Agendamento Confirmado!
            </h2>
            <p className="mt-1 text-sm text-slate-500">
                Seu agendamento foi realizado com sucesso
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-6 text-left">
                <h3 className="mb-3 text-sm font-medium text-slate-700">
                    Detalhes do Agendamento
                </h3>
                <div className="space-y-3">
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2 sm:flex-row sm:justify-between sm:gap-3">
                        <span className="text-sm text-slate-500">Cliente</span>
                        <span className="text-sm font-medium text-slate-900">{clienteNome}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2 sm:flex-row sm:justify-between sm:gap-3">
                        <span className="text-sm text-slate-500">Serviço</span>
                        <span className="text-sm font-medium text-slate-900">{servico.nome}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2 sm:flex-row sm:justify-between sm:gap-3">
                        <span className="text-sm text-slate-500">Profissional</span>
                        <span className="text-sm font-medium text-slate-900">{profissional.nome}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2 sm:flex-row sm:justify-between sm:gap-3">
                        <span className="text-sm text-slate-500">Data</span>
                        <span className="text-sm font-medium text-slate-900">{dataFormatada}</span>
                    </div>
                    <div className="flex flex-col gap-1 border-b border-slate-200 pb-2 sm:flex-row sm:justify-between sm:gap-3">
                        <span className="text-sm text-slate-500">Horário</span>
                        <span className="text-sm font-medium text-slate-900">{horario}</span>
                    </div>
                    <div className="flex flex-col gap-1 pt-2 sm:flex-row sm:justify-between sm:gap-3">
                        <span className="text-sm text-slate-500">Valor</span>
                        <span className="text-sm font-bold" style={{ color: cores.secondary }}>
                            R$ {servico.preco.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-sm text-slate-500">
                    Você receberá uma confirmação no WhatsApp
                </p>
                <p className="text-xs text-slate-400 mt-1">
                    Em breve o profissional confirmará seu horário
                </p>
                <p className="text-xs text-slate-400 mt-1">
                    {estabelecimento.name} - {estabelecimento.primaryColor}
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                    onClick={() => window.location.reload()}
                    className="flex-1 rounded-lg px-6 py-3 text-white font-medium transition hover:opacity-90"
                    style={{ backgroundColor: cores.secondary }}
                >
                    Novo Agendamento
                </button>
                <button
                    onClick={onVoltar}
                    className="flex-1 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}