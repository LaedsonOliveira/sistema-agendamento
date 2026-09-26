## app/agenda/componentes/BotaoEncaixe.tsx

```tsx
// components/agenda/BotaoEncaixe.tsx
"use client";

import Icone from "@/app/componentes/Icones";

interface Props {
  onClick: () => void;
}

export default function BotaoEncaixe({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
    >
      <Icone tipo="encaixe" className="h-4 w-4" />
      Encaixe
    </button>
  );
}
```

## app/agenda/componentes/FiltrosAgenda.tsx

```tsx
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
```

## app/agenda/componentes/ModalDetalhes.tsx

```tsx
// components/agenda/ModalDetalhes.tsx
"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import Icone from "@/app/componentes/Icones";
import { Agendamento, StatusAgendamento } from "../types/agenda";

interface Props {
    agendamento: Agendamento;
    onFechar: () => void;
    onAlterarStatus: (id: string, status: StatusAgendamento) => void;
    onExcluir: (id: string) => void;
}

export default function ModalDetalhes({
    agendamento,
    onFechar,
    onAlterarStatus,
    onExcluir,
}: Props) {
    const statusOptions: StatusAgendamento[] = [
        "Pendente",
        "Pago",
        "Cancelado",
        "Finalizado",
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                {/* CABEÇALHO */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-950">
                        Detalhes do Agendamento
                    </h2>
                    <button
                        onClick={onFechar}
                        className="text-slate-400 transition hover:text-slate-700"
                    >
                        <Icone tipo="fechar" className="h-5 w-5" />
                    </button>
                </div>

                {/* INFORMAÇÕES */}
                <div className="space-y-3 rounded-lg bg-slate-50 p-4">
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Cliente</span>
                        <span className="text-sm font-medium text-slate-900">
                            {agendamento.clienteNome}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Telefone</span>
                        <span className="text-sm font-medium text-slate-900">
                            {agendamento.clienteFone}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Serviço</span>
                        <span className="text-sm font-medium text-slate-900">
                            {agendamento.servicoNome}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Profissional</span>
                        <span className="text-sm font-medium text-slate-900">
                            {agendamento.profissionalNome}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Data</span>
                        <span className="text-sm font-medium text-slate-900">
                            {format(parseISO(agendamento.data), "dd/MM/yyyy", {
                                locale: ptBR,
                            })}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Horário</span>
                        <span className="text-sm font-medium text-slate-900">
                            {agendamento.horario}
                        </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-sm text-slate-500">Valor</span>
                        <span className="text-sm font-bold text-slate-900">
                            R$ {agendamento.valor.toFixed(2).replace(".", ",")}
                        </span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-slate-500">Status</span>
                        <select
                            value={agendamento.status}
                            onChange={(e) =>
                                onAlterarStatus(
                                    agendamento.id,
                                    e.target.value as StatusAgendamento
                                )
                            }
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                        >
                            {statusOptions.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* AÇÕES */}
                <div className="mt-4 flex gap-3">
                    <button
                        onClick={onFechar}
                        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={() => onExcluir(agendamento.id)}
                        className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}
```

## app/agenda/componentes/ModalEncaixe.tsx

```tsx
// components/agenda/ModalEncaixe.tsx
"use client";

import { useMemo, useState } from "react";
import Icone from "@/app/componentes/Icones";
import { Agendamento, HorarioFuncionamento, Profissional, Servico } from "../types/agenda";
import { calcularHorarioEncaixe, ResultadoEncaixe } from "../lib/agenda";

interface EncaixeCriado {
    clienteNome: string;
    clienteFone: string;
    servicoNome: string;
    servicoId: string;
    profissionalId: string;
    profissionalNome: string;
    data: string;
    horario: string;
    duracao: number;
    valor: number;
    status: "Pendente";
}

interface Props {
    agendamentos: Agendamento[];
    profissionais: Profissional[];
    servicos: Servico[];
    horariosFuncionamento: HorarioFuncionamento[];
    onFechar: () => void;
    onCriar: (encaixe: EncaixeCriado) => void;
}

export default function ModalEncaixe({
    agendamentos,
    profissionais,
    servicos,
    horariosFuncionamento,
    onFechar,
    onCriar,
}: Props) {
    const [clienteNome, setClienteNome] = useState("");
    const [clienteFone, setClienteFone] = useState("");
    const [servicoId, setServicoId] = useState("");
    const [profissionalId, setProfissionalId] = useState("");
    const [erro, setErro] = useState("");

    const servicoSelecionado = servicos.find((s) => s.id === servicoId);

    const resultado = useMemo<ResultadoEncaixe | null>(() => {
        if (servicoSelecionado && profissionalId) {
            return calcularHorarioEncaixe(
                agendamentos,
                servicoSelecionado,
                profissionalId,
                horariosFuncionamento
            );
        }
        return null;
    }, [agendamentos, horariosFuncionamento, profissionalId, servicoSelecionado]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");

        if (!clienteNome.trim()) {
            setErro("Informe o nome do cliente");
            return;
        }
        if (!servicoSelecionado) {
            setErro("Selecione um serviço");
            return;
        }
        if (!profissionalId) {
            setErro("Selecione um profissional");
            return;
        }
        if (!resultado) {
            setErro("Não foi possível calcular o horário");
            return;
        }

        const profissional = profissionais.find((p) => p.id === profissionalId);

        if (!resultado.disponivel) {
            setErro(resultado.mensagem);
            return;
        }

        onCriar({
            clienteNome: clienteNome.trim(),
            clienteFone: clienteFone.trim(),
            servicoNome: servicoSelecionado.nome,
            servicoId: servicoSelecionado.id,
            profissionalId,
            profissionalNome: profissional?.nome || "",
            data: resultado.data!,
            horario: resultado.horarioInicio,
            duracao: servicoSelecionado.duracao,
            valor: servicoSelecionado.preco,
            status: "Pendente",
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                {/* CABEÇALHO */}
                <div className="mb-5 flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-950">
                            Atendimento Imediato
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Para clientes que chegaram sem agendamento
                        </p>
                    </div>
                    <button
                        onClick={onFechar}
                        className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                        aria-label="Fechar"
                    >
                        <Icone tipo="fechar" className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* CLIENTE */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Nome do Cliente *
                            </label>
                            <input
                                type="text"
                                value={clienteNome}
                                onChange={(e) => setClienteNome(e.target.value)}
                                placeholder="João Silva"
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                                required
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Telefone
                            </label>
                            <input
                                type="tel"
                                value={clienteFone}
                                onChange={(e) => setClienteFone(e.target.value)}
                                placeholder="(81) 99999-9999"
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                            />
                        </div>
                    </div>

                    {/* SERVIÇO + PROFISSIONAL */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Serviço *
                            </label>
                            <select
                                value={servicoId}
                                onChange={(e) => setServicoId(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                                required
                            >
                                <option value="">Selecione...</option>
                                {servicos.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.nome} ({s.duracao} min)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Profissional *
                            </label>
                            <select
                                value={profissionalId}
                                onChange={(e) => setProfissionalId(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                                required
                            >
                                <option value="">Selecione...</option>
                                {profissionais.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* RESULTADO DO CÁLCULO */}
                    {resultado && (
                        <div
                            className={`rounded-xl border p-4 ${resultado.conflito
                                ? "border-yellow-300 bg-yellow-50"
                                : "border-green-300 bg-green-50"
                                }`}
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <span className="text-lg" aria-hidden="true">
                                    {resultado.conflito ? (
                                        <Icone tipo="alerta" className="h-5 w-5" />
                                    ) : (
                                        <Icone tipo="check-circle" className="h-5 w-5" />
                                    )}
                                </span>
                                <span
                                    className={`text-sm font-semibold ${resultado.conflito ? "text-yellow-800" : "text-green-800"
                                        }`}
                                >
                                    {resultado.mensagem}
                                </span>
                            </div>

                            {resultado.disponivel && (
                                <div className="grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
                                    <div>
                                        <span className="block text-xs text-slate-500">Início</span>
                                        <span className="font-bold text-slate-900">
                                            {resultado.horarioInicio}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-xs text-slate-500">Fim</span>
                                        <span className="font-bold text-slate-900">
                                            {resultado.horarioFim}
                                        </span>
                                    </div>
                                    {servicoSelecionado && (
                                        <div>
                                            <span className="block text-xs text-slate-500">Duração</span>
                                            <span className="font-bold text-slate-900">
                                                {servicoSelecionado.duracao} min
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {resultado.disponivel && resultado.proximoAgendamento && (
                                <p className="mt-3 text-xs text-slate-600">
                                    Próximo agendamento às {resultado.proximoAgendamento}
                                </p>
                            )}
                        </div>
                    )}

                    {erro && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {erro}
                        </p>
                    )}

                    {/* BOTÕES */}
                    <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row">
                        <button
                            type="button"
                            onClick={onFechar}
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={!resultado?.disponivel}
                            className="flex-1 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Criar Encaixe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
```

## app/agenda/componentes/VisaoDia.tsx

```tsx
// components/agenda/VisaoDia.tsx
"use client";

import { format, parseISO, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Agendamento } from "../types/agenda";

interface Props {
    data: Date;
    agendamentos: Agendamento[];
    onSelecionar: (agendamento: Agendamento) => void;
}

export default function VisaoDia({ data, agendamentos, onSelecionar }: Props) {
    // Filtra apenas os agendamentos do dia
    const agendamentosDoDia = agendamentos
        .filter((a) => isSameDay(parseISO(a.data), data))
        .sort((a, b) => a.horario.localeCompare(b.horario));

    const getStatusBadge = (status: string) => {
        const styles = {
            Pago: "bg-green-100 text-green-800",
            Pendente: "bg-yellow-100 text-yellow-800",
            Cancelado: "bg-red-100 text-red-800",
            Finalizado: "bg-blue-100 text-blue-800",
        };
        return styles[status as keyof typeof styles] || "bg-slate-100 text-slate-800";
    };

    if (agendamentosDoDia.length === 0) {
        return (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
                <p className="text-slate-500">Nenhum agendamento para este dia.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {agendamentosDoDia.map((a) => (
                <button
                    key={a.id}
                    onClick={() => onSelecionar(a)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-slate-950 hover:shadow-md"
                >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        {/* HORÁRIO */}
                        <div className="flex flex-col items-center justify-center rounded-lg bg-slate-950 px-4 py-2 text-white sm:min-w-[90px]">
                            <span className="text-lg font-bold">{a.horario}</span>
                        </div>

                        {/* INFO */}
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 text-sm sm:gap-2">
                                <span className="font-semibold text-slate-900">
                                    {a.clienteNome}
                                </span>
                                <span className="text-slate-400">·</span>
                                <span className="text-slate-600">{a.servicoNome}</span>
                                <span className="text-slate-400">·</span>
                                <span className="text-slate-600">{a.profissionalNome}</span>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{a.clienteFone}</p>
                        </div>

                        {/* VALOR + STATUS */}
                        <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
                            <span className="text-base font-bold text-slate-900 sm:text-lg">
                                R$ {a.valor.toFixed(2).replace(".", ",")}
                            </span>
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadge(
                                    a.status
                                )}`}
                            >
                                {a.status}
                            </span>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
```

## app/agenda/componentes/VisaoMes.tsx

```tsx
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
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="min-w-[620px]">
                {/* CABEÇALHO DOS DIAS */}
                <div className="mb-2 grid grid-cols-7 gap-1">
                    {diasDaSemana.map((d) => (
                        <div
                            key={d}
                            className="py-2 text-center text-[10px] font-medium uppercase text-slate-500 sm:text-xs"
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
                                className={`min-h-[90px] rounded-lg border p-1.5 transition sm:min-h-[100px] sm:p-2 ${isMesAtual
                                    ? "border-slate-200 bg-white"
                                    : "border-slate-100 bg-slate-50"
                                    } ${isHoje ? "ring-2 ring-slate-950" : ""}`}
                            >
                                <div
                                    className={`mb-1 text-[10px] font-semibold sm:text-xs ${isMesAtual ? "text-slate-900" : "text-slate-400"
                                        } ${isHoje ? "text-slate-950" : ""}`}
                                >
                                    {format(dia, "dd")}
                                </div>
                                <div className="space-y-1">
                                    {ags.slice(0, 3).map((a) => (
                                        <button
                                            key={a.id}
                                            onClick={() => onSelecionar(a)}
                                            className={`w-full truncate rounded px-1 py-0.5 text-left text-[9px] transition hover:opacity-80 sm:text-[10px] ${a.status === "Pago"
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
                                        <div className="pl-1 text-[9px] text-slate-500 sm:text-[10px]">
                                            +{ags.length - 3} mais
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
```

## app/agenda/componentes/VisaoSemana.tsx

```tsx
// components/agenda/VisaoSemana.tsx
"use client";

import {
    format,
    startOfWeek,
    endOfWeek,
    addDays,
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

const HORARIOS = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00",
];

export default function VisaoSemana({ data, agendamentos, onSelecionar }: Props) {
    const inicioSemana = startOfWeek(data, { locale: ptBR });
    const fimSemana = endOfWeek(data, { locale: ptBR });

    const diasDaSemana = Array.from({ length: 7 }, (_, i) =>
        addDays(inicioSemana, i)
    );

    const getAgendamentos = (dia: Date, horario: string) => {
        return agendamentos.filter((a) => {
            const dataAg = parseISO(a.data);
            return isSameDay(dataAg, dia) && a.horario === horario;
        });
    };

    return (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-sm sm:min-w-[760px]">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                        <th className="w-20 px-3 py-3 text-left font-medium text-slate-500">
                            Hora
                        </th>
                        {diasDaSemana.map((dia) => {
                            const isHoje = isSameDay(dia, new Date());
                            return (
                                <th
                                    key={dia.toISOString()}
                                    className={`px-2 py-3 text-center font-medium sm:px-3 ${isHoje ? "text-slate-950" : "text-slate-500"
                                        }`}
                                >
                                    <div className="text-[10px] uppercase sm:text-xs">
                                        {format(dia, "EEE", { locale: ptBR })}
                                    </div>
                                    <div
                                        className={`text-base font-bold sm:text-lg ${isHoje ? "text-slate-950" : "text-slate-700"
                                            }`}
                                    >
                                        {format(dia, "dd")}
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {HORARIOS.map((horario) => (
                        <tr key={horario} className="border-b border-slate-100 last:border-0">
                            <td className="px-3 py-2 text-[11px] font-medium text-slate-500 sm:text-xs">
                                {horario}
                            </td>
                            {diasDaSemana.map((dia) => {
                                const ags = getAgendamentos(dia, horario);
                                return (
                                    <td
                                        key={dia.toISOString()}
                                        className="px-1 py-1 align-top"
                                    >
                                        {ags.map((a) => (
                                            <button
                                                key={a.id}
                                                onClick={() => onSelecionar(a)}
                                                className={`w-full rounded-lg p-2 text-left text-[10px] transition hover:opacity-80 sm:text-xs ${a.status === "Pago"
                                                    ? "bg-green-100 text-green-800"
                                                    : a.status === "Pendente"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : a.status === "Cancelado"
                                                            ? "bg-red-100 text-red-800"
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}
                                            >
                                                <div className="truncate font-semibold">
                                                    {a.clienteNome}
                                                </div>
                                                <div className="truncate text-[9px] sm:text-[10px]">
                                                    {a.servicoNome}
                                                </div>
                                            </button>
                                        ))}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

## app/agenda/lib/agenda.ts

```typescript
// lib/encaixe.ts
import { getDay, isSameDay, parseISO } from "date-fns";
import { Agendamento, HorarioFuncionamento, Servico } from "../types/agenda";

export interface ResultadoEncaixe {
  disponivel: boolean;
  horarioInicio: string;
  horarioFim: string;
  conflito: boolean;
  mensagem: string;
  proximoAgendamento?: string;
  data?: string;
}

const DIAS_DA_SEMANA = [
  "domingo",
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
];

const minutosDoHorario = (horario: string) => {
  const [horas, minutos] = horario.split(":").map(Number);
  return horas * 60 + minutos;
};

const horarioDosMinutos = (minutos: number) => {
  const horas = Math.floor(minutos / 60);
  const minutosRestantes = minutos % 60;
  return `${String(horas).padStart(2, "0")}:${String(minutosRestantes).padStart(2, "0")}`;
};

export function calcularHorarioEncaixe(
  agendamentos: Agendamento[],
  servico: Servico,
  profissionalId: string,
  horariosFuncionamento: HorarioFuncionamento[]
): ResultadoEncaixe {
  const agora = new Date();
  const duracaoServico = servico.duracao;
  const dia = horariosFuncionamento.find((horario) => horario.dia === DIAS_DA_SEMANA[getDay(agora)]);

  if (!dia || !dia.ativo) {
    return {
      disponivel: false,
      horarioInicio: "",
      horarioFim: "",
      conflito: false,
      mensagem: "O meu negócio não funciona hoje.",
    };
  }

  const abertura = minutosDoHorario(dia.abertura);
  const fechamento = minutosDoHorario(dia.fechamento);
  const minutoAtual = agora.getHours() * 60 + agora.getMinutes();
  const inicioAtual = Math.max(minutoAtual, abertura);
  const pausaInicio = dia.almocoInicio ? minutosDoHorario(dia.almocoInicio) : null;
  const pausaFim = dia.almocoFim ? minutosDoHorario(dia.almocoFim) : null;

  // Filtra agendamentos do profissional hoje
  const agsDoProfissional = agendamentos
    .filter(
      (a) =>
        a.profissionalId === profissionalId &&
        isSameDay(parseISO(a.data), agora) &&
        a.status !== "Cancelado"
    )
    .sort((a, b) => a.horario.localeCompare(b.horario));

  let inicio = inicioAtual;
  let conflito = false;
  let proximoAgendamento: string | undefined;

  while (inicio + duracaoServico <= fechamento) {
    const fim = inicio + duracaoServico;
    const agendamentoEmConflito = agsDoProfissional.find((agendamento) => {
      const agendamentoInicio = minutosDoHorario(agendamento.horario);
      const agendamentoFim = agendamentoInicio + (agendamento.duracao || 30);
      return inicio < agendamentoFim && fim > agendamentoInicio;
    });

    const conflitaComAlmoco = pausaInicio !== null && pausaFim !== null && inicio < pausaFim && fim > pausaInicio;

    if (!agendamentoEmConflito && !conflitaComAlmoco) {
      const dataDoEncaixe = new Date(agora);
      dataDoEncaixe.setHours(Math.floor(inicio / 60), inicio % 60, 0, 0);
      return {
        disponivel: true,
        horarioInicio: horarioDosMinutos(inicio),
        horarioFim: horarioDosMinutos(fim),
        conflito,
        mensagem: conflito
          ? `Não cabe agora. Próximo horário disponível: ${horarioDosMinutos(inicio)}`
          : "Horário livre! Pode atender agora.",
        proximoAgendamento,
        data: dataDoEncaixe.toISOString(),
      };
    }

    conflito = true;
    if (agendamentoEmConflito) {
      const agendamentoInicio = minutosDoHorario(agendamentoEmConflito.horario);
      inicio = Math.max(inicio + 1, agendamentoInicio + (agendamentoEmConflito.duracao || 30));
      proximoAgendamento ??= agendamentoEmConflito.horario;
    } else if (pausaFim !== null) {
      inicio = Math.max(inicio + 1, pausaFim);
    }
  }

  return {
    disponivel: false,
    horarioInicio: "",
    horarioFim: "",
    conflito,
    mensagem: conflito
      ? "Não há horário disponível hoje para a duração desse serviço."
      : `O serviço precisa terminar até ${dia.fechamento}.`,
    proximoAgendamento,
  };
}
```

## app/agenda/page.tsx

```tsx
// app/agenda/page.tsx
"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
    format,
    addDays,
    subDays,
    addMonths,
    subMonths,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfDay,
    endOfDay,
    isWithinInterval,
    parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import VisaoDia from "./componentes/VisaoDia";
import VisaoSemana from "./componentes/VisaoSemana";
import VisaoMes from "./componentes/VisaoMes";
import FiltrosAgenda from "./componentes/FiltrosAgenda";
import ModalDetalhes from "./componentes/ModalDetalhes";
import ModalEncaixe from "./componentes/ModalEncaixe"; // ← NOVO
import BotaoEncaixe from "./componentes/BotaoEncaixe"; // ← NOVO
import { Agendamento, HorarioFuncionamento, Profissional, Servico, StatusAgendamento } from "./types/agenda";

// ========================================
// DADOS MOCKADOS (FUTURO: Prisma)
// ========================================
const PROFISSIONAIS_MOCK: Profissional[] = [
    { id: "1", nome: "João Silva" },
    { id: "2", nome: "Pedro Santos" },
    { id: "3", nome: "Carlos Oliveira" },
];

// ← NOVO: Serviços mockados para o encaixe
const SERVICOS_MOCK: Servico[] = [
    { id: "1", nome: "Corte", descricao: "Corte masculino", preco: 40, duracao: 30 },
    { id: "2", nome: "Barba", descricao: "Barba completa", preco: 30, duracao: 20 },
    { id: "3", nome: "Corte + Barba", descricao: "Combo", preco: 60, duracao: 50 },
    { id: "4", nome: "Pezinho", descricao: "Acabamento", preco: 15, duracao: 15 },
    { id: "5", nome: "Platinado", descricao: "Descoloração", preco: 120, duracao: 90 },
];

const HORARIOS_FUNCIONAMENTO_MOCK: HorarioFuncionamento[] = [
    { dia: "segunda", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "terca", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "quarta", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "quinta", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "sexta", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "sabado", ativo: true, abertura: "09:00", fechamento: "18:00" },
    { dia: "domingo", ativo: false, abertura: "09:00", fechamento: "14:00" },
];

const dataMock = (diasAPartirDeHoje = 0) => addDays(new Date(), diasAPartirDeHoje).toISOString();

const AGENDAMENTOS_MOCK: Agendamento[] = [
    {
        id: "1",
        data: dataMock(),
        horario: "09:00",
        clienteNome: "Lucas Mendes",
        clienteFone: "(11) 99999-1111",
        servicoNome: "Corte",
        profissionalId: "1",
        profissionalNome: "João Silva",
        valor: 40,
        duracao: 30,
        status: "Pago",
    },
    {
        id: "2",
        data: dataMock(),
        horario: "10:30",
        clienteNome: "Rafael Souza",
        clienteFone: "(11) 98888-2222",
        servicoNome: "Corte + Barba",
        profissionalId: "2",
        profissionalNome: "Pedro Santos",
        valor: 60,
        duracao: 50,
        status: "Pendente",
    },
    {
        id: "3",
        data: dataMock(1),
        horario: "14:00",
        clienteNome: "Bruno Alves",
        clienteFone: "(11) 97777-3333",
        servicoNome: "Barba",
        profissionalId: "3",
        profissionalNome: "Carlos Oliveira",
        valor: 30,
        duracao: 20,
        status: "Finalizado",
    },
    {
        id: "4",
        data: dataMock(-1),
        horario: "16:00",
        clienteNome: "Felipe Costa",
        clienteFone: "(11) 96666-4444",
        servicoNome: "Pezinho",
        profissionalId: "1",
        profissionalNome: "João Silva",
        valor: 15,
        duracao: 15,
        status: "Cancelado",
    },
    {
        id: "5",
        data: new Date().toISOString(),
        horario: "15:30",
        clienteNome: "Marcos Souza",
        clienteFone: "(81) 95555-5555",
        servicoNome: "Barba",
        profissionalId: "3",
        profissionalNome: "Carlos Oliveira",
        valor: 30,
        status: "Pendente",
    },
    // Amanhã
    {
        id: "6",
        data: addDays(new Date(), 1).toISOString(),
        horario: "09:00",
        clienteNome: "Lucas Lima",
        clienteFone: "(81) 94444-4444",
        servicoNome: "Corte + Barba",
        profissionalId: "1",
        profissionalNome: "João Silva",
        valor: 60,
        status: "Pendente",
    },
    {
        id: "7",
        data: addDays(new Date(), 1).toISOString(),
        horario: "10:00",
        clienteNome: "Rafael Costa",
        clienteFone: "(81) 93333-3333",
        servicoNome: "Pezinho",
        profissionalId: "2",
        profissionalNome: "Pedro Santos",
        valor: 15,
        status: "Pendente",
    },
    {
        id: "8",
        data: addDays(new Date(), 1).toISOString(),
        horario: "12:30",
        clienteNome: "Bruno Alves",
        clienteFone: "(81) 92222-2222",
        servicoNome: "Corte",
        profissionalId: "3",
        profissionalNome: "Carlos Oliveira",
        valor: 40,
        status: "Pendente",
    },
    // Ontem
    {
        id: "9",
        data: subDays(new Date(), 1).toISOString(),
        horario: "09:00",
        clienteNome: "Diego Rocha",
        clienteFone: "(81) 91111-1111",
        servicoNome: "Corte",
        profissionalId: "1",
        profissionalNome: "João Silva",
        valor: 40,
        status: "Finalizado",
    },
    {
        id: "10",
        data: subDays(new Date(), 1).toISOString(),
        horario: "11:00",
        clienteNome: "Eduardo Melo",
        clienteFone: "(81) 90000-0000",
        servicoNome: "Barba",
        profissionalId: "2",
        profissionalNome: "Pedro Santos",
        valor: 30,
        status: "Finalizado",
    },
    // Próxima semana
    {
        id: "11",
        data: addDays(new Date(), 5).toISOString(),
        horario: "10:00",
        clienteNome: "Felipe Nunes",
        clienteFone: "(81) 98888-1111",
        servicoNome: "Corte",
        profissionalId: "1",
        profissionalNome: "João Silva",
        valor: 40,
        status: "Pendente",
    },
    {
        id: "12",
        data: addDays(new Date(), 5).toISOString(),
        horario: "15:00",
        clienteNome: "Gustavo Reis",
        clienteFone: "(81) 97777-2222",
        servicoNome: "Corte + Barba",
        profissionalId: "3",
        profissionalNome: "Carlos Oliveira",
        valor: 60,
        status: "Pendente",
    },
];

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
export default function Agenda() {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>(AGENDAMENTOS_MOCK);
    const [dataAtual, setDataAtual] = useState(new Date());
    const [visualizacao, setVisualizacao] = useState<"dia" | "semana" | "mes">("dia");
    const [filtroProfissional, setFiltroProfissional] = useState("todos");
    const [filtroStatus, setFiltroStatus] = useState<StatusAgendamento | "todos">("todos");
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null);

    // ← NOVO: Estado do modal de encaixe
    const [modalEncaixeAberto, setModalEncaixeAberto] = useState(false);

    // ========================================
    // FILTRAR AGENDAMENTOS
    // ========================================
    const agendamentosFiltrados = useMemo(() => {
        return agendamentos.filter((a) => {
            const profissionalOk =
                filtroProfissional === "todos" || a.profissionalId === filtroProfissional;
            const statusOk = filtroStatus === "todos" || a.status === filtroStatus;
            return profissionalOk && statusOk;
        });
    }, [agendamentos, filtroProfissional, filtroStatus]);

    const quantidadeNoPeriodo = useMemo(() => {
        const inicio = visualizacao === "dia"
            ? startOfDay(dataAtual)
            : visualizacao === "semana"
                ? startOfWeek(dataAtual, { locale: ptBR })
                : startOfMonth(dataAtual);
        const fim = visualizacao === "dia"
            ? endOfDay(dataAtual)
            : visualizacao === "semana"
                ? endOfWeek(dataAtual, { locale: ptBR })
                : endOfMonth(dataAtual);

        return agendamentosFiltrados.filter((agendamento) =>
            isWithinInterval(parseISO(agendamento.data), { start: inicio, end: fim })
        ).length;
    }, [agendamentosFiltrados, dataAtual, visualizacao]);

    // ========================================
    // NAVEGAÇÃO DE DATA
    // ========================================
    const handleAnterior = () => {
        if (visualizacao === "dia") setDataAtual(subDays(dataAtual, 1));
        else if (visualizacao === "semana") setDataAtual(subDays(dataAtual, 7));
        else setDataAtual(subMonths(dataAtual, 1));
    };

    const handleProximo = () => {
        if (visualizacao === "dia") setDataAtual(addDays(dataAtual, 1));
        else if (visualizacao === "semana") setDataAtual(addDays(dataAtual, 7));
        else setDataAtual(addMonths(dataAtual, 1));
    };

    const handleHoje = () => setDataAtual(new Date());

    // ========================================
    // TÍTULO DA DATA
    // ========================================
    const tituloData = useMemo(() => {
        if (visualizacao === "dia") {
            return format(dataAtual, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
        }
        if (visualizacao === "semana") {
            const inicio = startOfWeek(dataAtual, { locale: ptBR });
            const fim = endOfWeek(dataAtual, { locale: ptBR });
            return `${format(inicio, "dd MMM", { locale: ptBR })} - ${format(fim, "dd MMM yyyy", { locale: ptBR })}`;
        }
        return format(dataAtual, "MMMM 'de' yyyy", { locale: ptBR });
    }, [dataAtual, visualizacao]);

    // ========================================
    // AÇÕES
    // ========================================
    const handleAlterarStatus = (id: string, novoStatus: StatusAgendamento) => {
        setAgendamentos((prev) =>
            prev.map((a) => (a.id === id ? { ...a, status: novoStatus } : a))
        );
        setAgendamentoSelecionado(null);
    };

    const handleExcluir = (id: string) => {
        if (confirm("Tem certeza que deseja excluir este agendamento?")) {
            setAgendamentos((prev) => prev.filter((a) => a.id !== id));
            setAgendamentoSelecionado(null);
        }
    };

    // ← NOVO: Criar encaixe
    const handleCriarEncaixe = (encaixe: {
        clienteNome: string;
        clienteFone: string;
        servicoNome: string;
        servicoId: string;
        profissionalId: string;
        profissionalNome: string;
        data: string;
        horario: string;
        duracao: number;
        valor: number;
    }) => {
        const novo: Agendamento = {
            id: Date.now().toString(),
            data: encaixe.data,
            horario: encaixe.horario,
            clienteNome: encaixe.clienteNome,
            clienteFone: encaixe.clienteFone,
            servicoNome: encaixe.servicoNome,
            servicoId: encaixe.servicoId,
            profissionalId: encaixe.profissionalId,
            profissionalNome: encaixe.profissionalNome,
            valor: encaixe.valor,
            duracao: encaixe.duracao,
            status: "Pendente",
        };
        setAgendamentos((prev) => [...prev, novo]);
        setModalEncaixeAberto(false);
    };

    // ========================================
    // RENDER
    // ========================================
    return (
        <div className="mx-auto w-full max-w-7xl px-0 py-4 sm:px-2 sm:py-6">
            {/* ===== CABEÇALHO ===== */}
            <div className="mb-5 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Agenda</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Gerencie todos os agendamentos do seu negócio
                    </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <BotaoEncaixe onClick={() => setModalEncaixeAberto(true)} />
                    <Link
                        href="/agendar/teste"
                        className="w-full rounded-lg bg-slate-950 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-slate-700 sm:w-auto"
                    >
                        + Novo Agendamento
                    </Link>
                </div>
            </div>

            {/* ===== NAVEGAÇÃO DE DATA ===== */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                    <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2 sm:min-w-[27rem]">
                        <button
                            onClick={handleAnterior}
                            aria-label="Ver período anterior"
                            title="Período anterior"
                            className="flex aspect-square items-center justify-center rounded-lg border border-slate-300 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            ←
                        </button>

                        <div className="flex min-w-0 flex-col items-center gap-1">
                            <p className="text-center text-sm font-semibold capitalize text-slate-900">
                                {tituloData}
                            </p>
                            <span className="text-xs text-slate-500">
                                {quantidadeNoPeriodo} {quantidadeNoPeriodo === 1 ? "agendamento" : "agendamentos"}
                            </span>
                            <button
                                onClick={handleHoje}
                                className="rounded-md bg-slate-950 px-3 py-1 text-xs font-medium text-white transition hover:bg-slate-700"
                            >
                                Hoje
                            </button>
                        </div>

                        <button
                            onClick={handleProximo}
                            aria-label="Ver próximo período"
                            title="Próximo período"
                            className="flex aspect-square items-center justify-center rounded-lg border border-slate-300 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            {/* ===== VISUALIZAÇÃO + FILTROS ===== */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full gap-1 rounded-lg bg-slate-100 p-1 sm:w-auto">
                    {(["dia", "semana", "mes"] as const).map((v) => (
                        <button
                            key={v}
                            onClick={() => setVisualizacao(v)}
                            className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition sm:flex-none ${visualizacao === v
                                ? "bg-slate-950 text-white"
                                : "text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>

                <FiltrosAgenda
                    profissionais={PROFISSIONAIS_MOCK}
                    filtroProfissional={filtroProfissional}
                    setFiltroProfissional={setFiltroProfissional}
                    filtroStatus={filtroStatus}
                    setFiltroStatus={setFiltroStatus}
                />
            </div>

            {/* ===== CONTEÚDO ===== */}
            {visualizacao === "dia" && (
                <VisaoDia
                    data={dataAtual}
                    agendamentos={agendamentosFiltrados}
                    onSelecionar={setAgendamentoSelecionado}
                />
            )}

            {visualizacao === "semana" && (
                <VisaoSemana
                    data={dataAtual}
                    agendamentos={agendamentosFiltrados}
                    onSelecionar={setAgendamentoSelecionado}
                />
            )}

            {visualizacao === "mes" && (
                <VisaoMes
                    data={dataAtual}
                    agendamentos={agendamentosFiltrados}
                    onSelecionar={setAgendamentoSelecionado}
                />
            )}

            {/* ===== MODAL DE DETALHES ===== */}
            {agendamentoSelecionado && (
                <ModalDetalhes
                    agendamento={agendamentoSelecionado}
                    onFechar={() => setAgendamentoSelecionado(null)}
                    onAlterarStatus={handleAlterarStatus}
                    onExcluir={handleExcluir}
                />
            )}

            {/* ===== MODAL DE ENCAIXE ===== */}
            {modalEncaixeAberto && (
                <ModalEncaixe
                    agendamentos={agendamentos}
                    profissionais={PROFISSIONAIS_MOCK}
                    servicos={SERVICOS_MOCK}
                    horariosFuncionamento={HORARIOS_FUNCIONAMENTO_MOCK}
                    onFechar={() => setModalEncaixeAberto(false)}
                    onCriar={handleCriarEncaixe}
                />
            )}
        </div>
    );
}
```

## app/agenda/types/agenda.ts

```typescript
// types/agenda.ts

export type StatusAgendamento = "Pendente" | "Pago" | "Cancelado" | "Finalizado";

export interface Agendamento {
  id: string;
  data: string; // ISO string
  horario: string; // "09:00"
  clienteNome: string;
  clienteFone: string;
  servicoNome: string;
  servicoId?: string;
  profissionalId: string;
  profissionalNome: string;
  valor: number;
  duracao?: number;
  status: StatusAgendamento;
}

export interface Profissional {
  id: string;
  nome: string;
}

export interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
}

export interface HorarioFuncionamento {
  dia: string;
  ativo: boolean;
  abertura: string;
  fechamento: string;
  almocoInicio?: string;
  almocoFim?: string;
}
```

## app/agendar/[slug]/ClienteAgendamento.tsx

```tsx
// app/agendar/[slug]/ClienteAgendamento.tsx
"use client";

import { useState, useMemo } from "react";
import { format, isSameDay, parseISO } from "date-fns";
import Image from "next/image";
import Icone from "@/app/componentes/Icones";
import EtapaBarbeiro from "../componentes/EtapaBarbeiro";
import EtapaServico from "../componentes/EtapaServico";
import EtapaData from "../componentes/EtapaData";
import EtapaHorario from "../componentes/EtapaHorario";
import EtapaDadosCliente from "../componentes/EtapaDadosCliente";
import ConfirmacaoAgendamento from "../componentes/ConfirmacaoAgendamento";

// ========================================
// TIPOS
// ========================================
interface Servico {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  duracao: number;
}

interface Profissional {
  id: string;
  nome: string;
}

interface AgendamentoExistente {
  dataHora: string;
  profissionalId: string;
}

interface Estabelecimento {
  id: string;
  slug: string;
  name: string;
  logoUrl: string | null;
  banner: string | null;
  primaryColor: string;
  servicos: Servico[];
  profissionais: Profissional[];
  agendamentos: AgendamentoExistente[];
}

interface Props {
  estabelecimento: Estabelecimento;
  slug: string;
}

// ========================================
// ETAPAS
// ========================================
const ETAPAS = {
  BARBEIRO: 0,
  SERVICO: 1,
  DATA: 2,
  HORARIO: 3,
  DADOS: 4,
  CONFIRMACAO: 5,
} as const;

type Etapa = (typeof ETAPAS)[keyof typeof ETAPAS];

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
export default function ClienteAgendamento({ estabelecimento }: Props) {
  const [etapaAtual, setEtapaAtual] = useState<Etapa>(ETAPAS.BARBEIRO);

  // Seleções do cliente
  const [profissionalSelecionado, setProfissionalSelecionado] =
    useState<Profissional | null>(null);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(
    null
  );
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(
    null
  );

  // Dados do cliente
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("telefone") ?? "";
  });
  const [loading, setLoading] = useState(false);

  const cores = {
    primary: estabelecimento.primaryColor || "#1a1a2e",
    secondary: estabelecimento.primaryColor || "#e94560",
  };

  // ========================================
  // NAVEGAÇÃO
  // ========================================
  const avancarEtapa = () => {
    setEtapaAtual((atual) => Math.min(atual + 1, ETAPAS.CONFIRMACAO) as Etapa);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const voltarEtapa = () => {
    setEtapaAtual((atual) => Math.max(atual - 1, ETAPAS.BARBEIRO) as Etapa);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ========================================
  // HORÁRIOS DISPONÍVEIS
  // ========================================
  const horariosDisponiveis = useMemo(() => {
    if (!dataSelecionada || !profissionalSelecionado) return [];

    const ocupados = estabelecimento.agendamentos
      .filter((ag) => {
        const dataAg = parseISO(ag.dataHora);
        return (
          isSameDay(dataAg, dataSelecionada) &&
          ag.profissionalId === profissionalSelecionado.id
        );
      })
      .map((ag) => format(parseISO(ag.dataHora), "HH:mm"));

    const horarios: string[] = [];
    for (let hora = 8; hora <= 19; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horario = `${String(hora).padStart(2, "0")}:${String(minuto).padStart(
          2,
          "0"
        )}`;
        if (!ocupados.includes(horario)) {
          horarios.push(horario);
        }
      }
    }
    return horarios;
  }, [dataSelecionada, profissionalSelecionado, estabelecimento.agendamentos]);

  // ========================================
  // CONFIRMAR AGENDAMENTO
  // ========================================
  const handleConfirmar = async () => {
    if (
      !profissionalSelecionado ||
      !servicoSelecionado ||
      !dataSelecionada ||
      !horarioSelecionado
    ) {
      alert("Preencha todos os dados!");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Agendamento criado!", {
        profissional: profissionalSelecionado.nome,
        servico: servicoSelecionado.nome,
        data: format(dataSelecionada, "dd/MM/yyyy"),
        horario: horarioSelecionado,
        cliente: nomeCliente,
        telefone: telefoneCliente,
      });
      avancarEtapa();
    } catch (error) {
      alert("Erro ao agendar. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // RENDERIZAR ETAPA
  // ========================================
  const renderEtapa = () => {
    switch (etapaAtual) {
      case ETAPAS.BARBEIRO:
        return (
          <EtapaBarbeiro
            profissionais={estabelecimento.profissionais}
            selecionado={profissionalSelecionado}
            onSelect={setProfissionalSelecionado}
            onNext={avancarEtapa}
            cores={cores}
          />
        );
      case ETAPAS.SERVICO:
        return (
          <EtapaServico
            servicos={estabelecimento.servicos}
            selecionado={servicoSelecionado}
            onSelect={setServicoSelecionado}
            onNext={avancarEtapa}
            onBack={voltarEtapa}
            cores={cores}
          />
        );
      case ETAPAS.DATA:
        return (
          <EtapaData
            dataSelecionada={dataSelecionada}
            onSelect={setDataSelecionada}
            onNext={avancarEtapa}
            onBack={voltarEtapa}
            cores={cores}
          />
        );
      case ETAPAS.HORARIO:
        return (
          <EtapaHorario
            horarios={horariosDisponiveis}
            selecionado={horarioSelecionado}
            onSelect={setHorarioSelecionado}
            onNext={avancarEtapa}
            onBack={voltarEtapa}
            cores={cores}
          />
        );
      case ETAPAS.DADOS:
        return (
          <EtapaDadosCliente
            nome={nomeCliente}
            setNome={setNomeCliente}
            telefone={telefoneCliente}
            setTelefone={setTelefoneCliente}
            onNext={handleConfirmar}
            onBack={voltarEtapa}
            loading={loading}
            cores={cores}
          />
        );
      case ETAPAS.CONFIRMACAO:
        return (
          <ConfirmacaoAgendamento
            estabelecimento={estabelecimento}
            profissional={profissionalSelecionado!}
            servico={servicoSelecionado!}
            data={dataSelecionada!}
            horario={horarioSelecionado!}
            clienteNome={nomeCliente}
            cores={cores}
            onVoltar={voltarEtapa}
          />
        );
      default:
        return null;
    }
  };

  // ========================================
  // PROGRESSO DAS ETAPAS
  // ========================================
  const etapasLista = Object.keys(ETAPAS).filter(
    (key) => isNaN(Number(key))
  ) as (keyof typeof ETAPAS)[];

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ===== HEADER COM BANNER E LOGO CENTRALIZADOS ===== */}
      <div
        className="relative bg-cover bg-center pt-8"
        style={{
          backgroundColor: cores.primary,
          backgroundImage: estabelecimento.banner
            ? `url(${estabelecimento.banner})`
            : "none",
        }}
      >
        {/* Overlay escuro sobre o banner */}
        {estabelecimento.banner && (
          <div className="absolute inset-0 bg-black/40" />
        )}

        {/* Conteúdo centralizado */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Logo - centralizada */}
          <div className="flex justify-center">
            {estabelecimento.logoUrl ? (
              <Image
                src={estabelecimento.logoUrl}
                alt={estabelecimento.name}
                width={96}
                height={96}
                unoptimized
                className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white/10 text-4xl shadow-lg text-white">
                <Icone tipo="tesoura" className="h-10 w-10" />
              </div>
            )}
          </div>

          {/* Nome do negócio - centralizado */}
          <h1
            className="mt-3 text-2xl font-bold"
            style={{ color: cores.secondary }}
          >
            {estabelecimento.name}
          </h1>

          {/* Subtítulo - centralizado */}
          <p className="mt-1 text-sm text-white/80">
            Agende seu horário de forma rápida e fácil
          </p>

          {/* Espaço extra no final */}
          <div className="pb-6"></div>
        </div>
      </div>

      {/* ===== CONTEÚDO ===== */}
      <div className="container mx-auto max-w-2xl px-3 py-5 sm:px-4 sm:py-8">
        <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-6">
          {/* PROGRESSO */}
          <div className="mb-6 flex items-center justify-between gap-1 sm:gap-2">
            {etapasLista.map((key, index) => {
              const isConcluida = index < etapaAtual;
              const isAtiva = index === etapaAtual;

              return (
                <div key={key} className="flex items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition ${isConcluida
                      ? "bg-green-500 text-white"
                      : isAtiva
                        ? "text-white"
                        : "bg-slate-200 text-slate-500"
                      }`}
                    style={isAtiva ? { backgroundColor: cores.secondary } : {}}
                  >
                    {isConcluida ? <Icone tipo="check" className="h-4 w-4" /> : index + 1}
                  </div>
                  {index < etapasLista.length - 1 && (
                    <div
                      className={`h-0.5 min-w-2 flex-1 transition sm:max-w-8 ${isConcluida ? "bg-green-500" : "bg-slate-200"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* ETAPA ATUAL */}
          {renderEtapa()}
        </div>
      </div>
    </div>
  );
}
```

## app/agendar/[slug]/page.tsx

```tsx
// app/agendar/[slug]/page.tsx
import ClienteAgendamento from "./ClienteAgendamento";

// ========================================
// DADOS MOCKADOS (FUTURO: Buscar do Prisma)
// ========================================

// TODO: Substituir por: await prisma.estabelecimento.findUnique({ where: { slug } })
const ESTABELECIMENTO_MOCK = {
  id: "est_001",
  slug: "teste",
  name: "teste",
  logoUrl: null, // ou "/logo.png"
  banner: null, // ou "/banner.jpg"
   primaryColor: "var(--estabelecimento-primary, #1a1a2e)",
  secondaryColor: "var(--estabelecimento-secondary, #e94560)",
  servicos: [
    {
      id: "serv_001",
      nome: "Corte",
      descricao: "Corte masculino tradicional",
      preco: 40.00,
      duracao: 30,
    },
    {
      id: "serv_002",
      nome: "Barba",
      descricao: "Barba completa com toalha quente",
      preco: 30.00,
      duracao: 20,
    },
    {
      id: "serv_003",
      nome: "Corte + Barba",
      descricao: "Combo corte e barba",
      preco: 60.00,
      duracao: 50,
    },
    {
      id: "serv_004",
      nome: "Pezinho",
      descricao: "Acabamento no pescoço e orelhas",
      preco: 15.00,
      duracao: 15,
    },
    {
      id: "serv_005",
      nome: "Platinado",
      descricao: "Descoloração e tonalização",
      preco: 120.00,
      duracao: 90,
    },
  ],
  profissionais: [
    { id: "prof_001", nome: "João Silva" },
    { id: "prof_002", nome: "Pedro Santos" },
    { id: "prof_003", nome: "Carlos Oliveira" },
  ],
  // Agendamentos existentes (para calcular disponibilidade)
  agendamentos: [
    {
      dataHora: new Date(new Date().setHours(9, 0, 0, 0)).toISOString(),
      profissionalId: "prof_001",
    },
    {
      dataHora: new Date(new Date().setHours(10, 30, 0, 0)).toISOString(),
      profissionalId: "prof_001",
    },
    {
      dataHora: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
      profissionalId: "prof_002",
    },
    {
      dataHora: new Date(new Date().setHours(16, 30, 0, 0)).toISOString(),
      profissionalId: "prof_003",
    },
  ],
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  // ========================================
  // FUTURO: Buscar dados do Prisma
  // ========================================
  // const estabelecimento = await prisma.estabelecimento.findUnique({
  //   where: { slug },
  //   include: {
  //     servicos: { orderBy: { nome: "asc" } },
  //     profissionais: { orderBy: { nome: "asc" } },
  //     agendadamentos: {
  //       where: { dataHora: { gte: new Date() } },
  //       select: { dataHora: true, profissionalId: true },
  //     },
  //   },
  // });
  //
  // if (!estabelecimento) notFound();
  //
  // const estabelecimentoJson = {
  //   ...estabelecimento,
  //   servicos: estabelecimento.servicos.map((s) => ({
  //     ...s,
  //     preco: Number(s.preco),
  //   })),
  //   agendadamentos: estabelecimento.agendadamentos.map((a) => ({
  //     ...a,
  //     dataHora: a.dataHora.toISOString(),
  //   })),
  // };

  // Por enquanto, usa dados mockados
  const estabelecimento = ESTABELECIMENTO_MOCK;

  return <ClienteAgendamento estabelecimento={estabelecimento} slug={slug} />;
}
```

## app/agendar/componentes/ConfirmacaoAgendamento.tsx

```tsx
"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Icone from "@/app/componentes/Icones";

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
            <div className="mb-5 flex justify-center">
                <div
                    className="flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-sm"
                    style={{ backgroundColor: `${cores.secondary}18`, color: cores.secondary }}
                >
                    <Icone tipo="check" className="h-9 w-9" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
                Agendamento Confirmado!
            </h2>
            <p className="mt-1 text-sm text-slate-500">
                Seu agendamento foi realizado com sucesso
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left shadow-sm ring-1 ring-slate-200 sm:p-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-slate-500">
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
                <p className="mt-1 text-xs text-slate-400">
                    Em breve o profissional confirmará seu horário
                </p>
                <p className="mt-1 text-xs text-slate-400">
                    {estabelecimento.name}
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                    onClick={() => window.location.reload()}
                    className="flex-1 rounded-xl px-6 py-3 text-white font-medium transition hover:opacity-90"
                    style={{ backgroundColor: cores.secondary }}
                >
                    Novo Agendamento
                </button>
                <button
                    onClick={onVoltar}
                    className="flex-1 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Voltar
                </button>
            </div>
        </div>
    );
}
```

## app/agendar/componentes/EtapaBarbeiro.tsx

```tsx
"use client";

import Icone from "@/app/componentes/Icones";

interface Profissional {
    id: string;
    nome: string;
}

interface Props {
    profissionais: Profissional[];
    selecionado: Profissional | null;
    onSelect: (profissional: Profissional) => void;
    onNext: () => void;
    cores: { primary: string; secondary: string };
}

export default function EtapaBarbeiro({
    profissionais,
    selecionado,
    onSelect,
    onNext,
    cores,
}: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selecionado) onNext();
    };

    return (
        <div>
            <div className="mb-5 flex items-center gap-3">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm"
                    style={{ backgroundColor: `${cores.secondary}1A`, color: cores.secondary }}
                >
                    <Icone tipo="tesoura" className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Escolha o Profissional
                    </h2>
                    <p className="text-sm text-slate-500">
                        Selecione o barbeiro que você prefere
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                    {profissionais.map((profissional) => (
                        <button
                            key={profissional.id}
                            type="button"
                            onClick={() => onSelect(profissional)}
                            className={`rounded-2xl border p-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${selecionado?.id === profissional.id
                                ? "bg-slate-900 text-white shadow-sm"
                                : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300"
                                }`}
                            style={
                                selecionado?.id === profissional.id
                                    ? { borderColor: cores.secondary, boxShadow: `0 10px 25px -18px ${cores.secondary}` }
                                    : undefined
                            }
                        >
                            <div className={`mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold ${selecionado?.id === profissional.id ? "bg-white/10 text-white" : "bg-white text-slate-700"
                                }`}>
                                {profissional.nome.charAt(0)}
                            </div>
                            <span className="text-sm font-semibold">
                                {profissional.nome}
                            </span>
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!selecionado}
                    className="mt-4 w-full rounded-xl px-6 py-3 text-white font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: cores.secondary }}
                >
                    Continuar
                </button>
            </form>
        </div>
    );
}
```

## app/agendar/componentes/EtapaDadosCliente.tsx

```tsx
// components/agendamento/EtapaDadosCliente.tsx
"use client";

import { useState } from "react";

interface Props {
  nome: string;
  setNome: (nome: string) => void;
  telefone: string;
  setTelefone: (telefone: string) => void;
  onNext: () => void;
  onBack: () => void;
  loading: boolean;
  cores: { primary: string; secondary: string };
}

export default function EtapaDadosCliente({
  nome,
  setNome,
  telefone,
  setTelefone,
  onNext,
  onBack,
  loading,
  cores,
}: Props) {
  const [erroNome, setErroNome] = useState("");
  const [erroTelefone, setErroTelefone] = useState("");

  // ========================================
  // VALIDACAO DO NOME
  // ========================================
  const validarNome = (valor: string) => {
    const nomeLimpo = valor.trim();

    if (nomeLimpo.length === 0) {
      setErroNome("O nome e obrigatorio");
      return false;
    }

    if (nomeLimpo.length < 3) {
      setErroNome("O nome deve ter pelo menos 3 caracteres");
      return false;
    }

    if (nomeLimpo.length > 100) {
      setErroNome("O nome deve ter no maximo 100 caracteres");
      return false;
    }

    if (/\d/.test(nomeLimpo)) {
      setErroNome("O nome nao pode conter numeros");
      return false;
    }

    if (!/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/.test(nomeLimpo)) {
      setErroNome("O nome contem caracteres invalidos");
      return false;
    }

    if (/(.)\1\1/.test(nomeLimpo)) {
      setErroNome("O nome contem letras repetidas em excesso");
      return false;
    }

    if (!nomeLimpo.replace(/\s/g, '').length) {
      setErroNome("O nome nao pode conter apenas espacos");
      return false;
    }

    setErroNome("");
    return true;
  };

  // ========================================
  // VALIDACAO DO TELEFONE
  // ========================================
  const validarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');

    if (numeros.length === 0) {
      setErroTelefone("O telefone e obrigatorio");
      return false;
    }

    if (numeros.length < 10) {
      setErroTelefone("O telefone deve ter pelo menos 10 digitos");
      return false;
    }

    if (numeros.length > 11) {
      setErroTelefone("O telefone deve ter no maximo 11 digitos");
      return false;
    }

    const ddd = parseInt(numeros.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      setErroTelefone("DDD invalido");
      return false;
    }

    setErroTelefone("");
    return true;
  };

  // ========================================
  // FORMATACAO DO TELEFONE
  // ========================================
  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');

    if (numeros.length === 0) return '';

    if (numeros.length <= 2) {
      return `(${numeros}`;
    }
    if (numeros.length <= 6) {
      return `(${numeros.substring(0, 2)}) ${numeros.substring(2)}`;
    }
    if (numeros.length <= 10) {
      return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
    }
    return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7, 11)}`;
  };

  // ========================================
  // HANDLERS
  // ========================================
  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setNome(valor);
    validarNome(valor);
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const apenasNumeros = valor.replace(/\D/g, '');

    if (apenasNumeros.length <= 11) {
      const formatado = formatarTelefone(valor);
      setTelefone(formatado);
      validarTelefone(formatado);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nomeValido = validarNome(nome);
    const telefoneValido = validarTelefone(telefone);

    if (nomeValido && telefoneValido) {
      onNext();
    }
  };

  // ========================================
  // RENDER
  // ========================================
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">Seus Dados</h2>
      <p className="text-sm text-slate-500 mb-6">
        Preencha seus dados para confirmar o agendamento
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NOME */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nome Completo *
          </label>
          <input
            type="text"
            value={nome}
            onChange={handleNomeChange}
            className={`w-full rounded-lg border px-4 py-3 outline-none transition ${erroNome
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-2 focus:ring-blue-500'
              }`}
            placeholder="Digite seu nome completo"
            maxLength={100}
            required
          />
          {erroNome && (
            <p className="mt-1 text-sm text-red-500">{erroNome}</p>
          )}
          {nome && !erroNome && nome.length > 0 && (
            <p className="mt-1 text-xs text-green-500">Nome valido</p>
          )}
        </div>

        {/* TELEFONE */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Telefone (WhatsApp) *
          </label>
          <input
            type="tel"
            value={telefone}
            onChange={handleTelefoneChange}
            className={`w-full rounded-lg border px-4 py-3 outline-none transition ${erroTelefone
                ? 'border-red-500 focus:ring-red-500'
                : 'border-slate-300 focus:ring-2 focus:ring-blue-500'
              }`}
            placeholder="(81) 99999-9999"
            maxLength={15}
            required
          />
          {erroTelefone && (
            <p className="mt-1 text-sm text-red-500">{erroTelefone}</p>
          )}
          {telefone && !erroTelefone && telefone.replace(/\D/g, '').length >= 10 && (
            <p className="mt-1 text-xs text-green-500">Telefone valido</p>
          )}
          <p className="mt-1 text-xs text-slate-400">
            {telefone && telefone.replace(/\D/g, '').length > 0
              ? `${telefone.replace(/\D/g, '').length} digitos`
              : 'Digite o telefone com DDD'}
          </p>
        </div>

        {/* BOTOES */}
        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={loading || !nome || !telefone || !!erroNome || !!erroTelefone}
            className="flex-1 rounded-lg px-6 py-3 text-white font-medium transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: cores.secondary }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Confirmando...
              </span>
            ) : (
              "Confirmar Agendamento"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
```

## app/agendar/componentes/EtapaData.tsx

```tsx
"use client";

import { useState } from "react";
import {
  format,
  addDays,
  getDay,
  isSameDay,
  startOfToday,
  subDays,
} from "date-fns";

interface Props {
  dataSelecionada: Date | null;
  onSelect: (data: Date) => void;
  onNext: () => void;
  onBack: () => void;
  cores: { primary: string; secondary: string };
}

export default function EtapaData({
  dataSelecionada,
  onSelect,
  onNext,
  onBack,
  cores,
}: Props) {
  const [janelaInicio, setJanelaInicio] = useState(() => startOfToday());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataSelecionada) onNext();
  };

  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hoje = startOfToday();
  const dias = Array.from({ length: 7 }, (_, i) => addDays(janelaInicio, i));
  const fimDaJanela = addDays(janelaInicio, 6);
  const podeVoltar = janelaInicio > hoje;

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Escolha a Data
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Selecione o dia para o agendamento
      </p>

      <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-2 shadow-sm">
        <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2">
          <button
            type="button"
            onClick={() => setJanelaInicio((prev) => subDays(prev, 7))}
            disabled={!podeVoltar}
            aria-label="Ver período anterior"
            title="Período anterior"
            className="flex aspect-square items-center justify-center rounded-xl border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden="true">←</span>
          </button>

          <div className="flex min-w-0 flex-col items-center gap-1">
            <span className="text-center text-xs font-semibold text-slate-700 sm:text-sm">
              {format(janelaInicio, "dd/MM")} - {format(fimDaJanela, "dd/MM")}
            </span>
            <button
              type="button"
              onClick={() => setJanelaInicio(startOfToday())}
              className="rounded-lg bg-slate-950 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Hoje
            </button>
          </div>

          <button
            type="button"
            onClick={() => setJanelaInicio((prev) => addDays(prev, 7))}
            aria-label="Ver próximo período"
            title="Próximo período"
            className="flex aspect-square items-center justify-center rounded-xl border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {dias.map((dia) => {
            const isSelected = dataSelecionada && isSameDay(dia, dataSelecionada);
            const isToday = isSameDay(dia, hoje);
            const diaSemana = diasDaSemana[getDay(dia)];

            return (
              <button
                key={dia.toISOString()}
                type="button"
                onClick={() => onSelect(dia)}
                className={`flex min-w-0 flex-col items-center rounded-xl border-2 px-0.5 py-3 transition hover:shadow-md ${isSelected ? "text-white" : "border-slate-200 text-slate-700"
                  }`}
                style={{
                  backgroundColor: isSelected ? cores.secondary : undefined,
                  borderColor: isSelected ? cores.secondary : undefined,
                }}
              >
                <span className="text-xs font-medium uppercase">
                  {diaSemana}
                </span>
                <span className="mt-1 text-base font-bold sm:text-lg">
                  {format(dia, "dd")}
                </span>
                {isToday && (
                  <span className="mt-1 text-[10px] font-medium uppercase text-slate-400">
                    Hoje
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!dataSelecionada}
            className="flex-1 rounded-lg px-6 py-3 text-white font-medium transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: cores.secondary }}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
```

## app/agendar/componentes/EtapaHorario.tsx

```tsx
"use client";

interface Props {
  horarios: string[];
  selecionado: string | null;
  onSelect: (horario: string) => void;
  onNext: () => void;
  onBack: () => void;
  cores: { primary: string; secondary: string };
}

export default function EtapaHorario({
  horarios,
  selecionado,
  onSelect,
  onNext,
  onBack,
  cores,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selecionado) onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Escolha o Horário
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Selecione o horário disponível
      </p>

      <form onSubmit={handleSubmit}>
        {horarios.length === 0 ? (
          <div className="rounded-lg bg-slate-50 p-8 text-center">
            <p className="text-slate-500">
              Nenhum horário disponível para este dia
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Voltar e escolher outra data
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {horarios.map((horario) => (
              <button
                key={horario}
                type="button"
                onClick={() => onSelect(horario)}
                className={`rounded-lg border-2 py-3 text-center transition hover:shadow-md ${selecionado === horario
                  ? "text-white"
                  : "border-slate-200 text-slate-700"
                  }`}
                style={{
                  backgroundColor:
                    selecionado === horario ? cores.secondary : undefined,
                  borderColor:
                    selecionado === horario ? cores.secondary : undefined,
                }}
              >
                <span className="text-sm font-medium">{horario}</span>
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!selecionado}
            className="flex-1 rounded-lg px-6 py-3 text-white font-medium transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: cores.secondary }}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
```

## app/agendar/componentes/EtapaServico.tsx

```tsx
"use client";

import Icone from "@/app/componentes/Icones";

interface Servico {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  duracao: number;
}

interface Props {
  servicos: Servico[];
  selecionado: Servico | null;
  onSelect: (servico: Servico) => void;
  onNext: () => void;
  onBack: () => void;
  cores: { primary: string; secondary: string };
}

export default function EtapaServico({
  servicos,
  selecionado,
  onSelect,
  onNext,
  onBack,
  cores,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selecionado) onNext();
  };

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-lg shadow-sm"
          style={{ backgroundColor: `${cores.secondary}1A`, color: cores.secondary }}
        >
          <Icone tipo="ferramentas" className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Escolha o Serviço
          </h2>
          <p className="text-sm text-slate-500">
            Selecione o serviço que você deseja
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {servicos.map((servico) => (
          <button
            key={servico.id}
            type="button"
            onClick={() => onSelect(servico)}
            className={`flex w-full items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${selecionado?.id === servico.id
              ? "bg-slate-900 text-white"
              : "border-slate-200 bg-slate-50 text-slate-900 hover:border-slate-300"
              }`}
            style={
              selecionado?.id === servico.id
                ? { borderColor: cores.secondary, boxShadow: `0 12px 28px -20px ${cores.secondary}` }
                : undefined
            }
          >
            <div className="min-w-0">
              <span className="font-semibold">{servico.nome}</span>
              {servico.descricao && (
                <p className={`mt-1 text-xs ${selecionado?.id === servico.id ? "text-slate-200" : "text-slate-500"}`}>
                  {servico.descricao}
                </p>
              )}
              <div className={`mt-2 flex gap-3 text-[11px] ${selecionado?.id === servico.id ? "text-slate-300" : "text-slate-500"}`}>
                <span>{servico.duracao} min</span>
              </div>
            </div>
            <span
              className="shrink-0 rounded-full px-3 py-1.5 text-sm font-bold text-white"
              style={{ backgroundColor: cores.secondary }}
            >
              R$ {servico.preco.toFixed(2)}
            </span>
          </button>
        ))}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!selecionado}
            className="flex-1 rounded-xl px-6 py-3 text-white font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: cores.secondary }}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}
```

## app/AppShell.tsx

```tsx
"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./side-bar/page";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAgendamentoRoute = pathname.startsWith("/agendar");

    return (
        <div className="min-h-screen bg-slate-50 lg:flex">
            {!isAgendamentoRoute && <Sidebar />}

            <main
                className={`min-h-screen min-w-0 flex-1 px-3 pb-8 pt-20 sm:px-5 sm:pb-10 sm:pt-8 lg:px-8 ${!isAgendamentoRoute ? "lg:ml-64" : ""}`}
            >
                <div className="mx-auto w-full max-w-7xl">{children}</div>
            </main>
        </div>
    );
}

```

## app/componentes/Icones.tsx

```tsx
import type { SVGProps } from "react";

export type TipoIcone =
    | "alerta"
    | "calendario"
    | "check"
    | "check-circle"
    | "cifrao"
    | "fechar"
    | "ferramentas"
    | "mais"
    | "relogio"
    | "tesoura"
    | "usuarios"
    | "encaixe";

const caminhos: Record<TipoIcone, string> = {
    alerta: "M12 9v4m0 4h.01M10.3 3.8 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z",
    calendario: "M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v13H4V6a1 1 0 0 1 1-1Zm3 8h3m-3 3h3",
    check: "m5 12 4 4L19 6",
    "check-circle": "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm-4-10 3 3 5-6",
    cifrao: "M3 7h18v10H3V7Zm4 3h.01M17 14h.01M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
    fechar: "m6 6 12 12M18 6 6 18",
    ferramentas: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18a2 2 0 1 0 3 3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-2.7-.6-.6-2.7 2.5-1.9Z",
    mais: "M12 5v14M5 12h14",
    relogio: "M12 7v5l3 2m7-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z",
    tesoura: "m6 6 12 12M6 18 18 6M6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
    usuarios: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8-3a3 3 0 0 0 0-6m4 13v-2a4 4 0 0 0-3-3.87",
    encaixe: "M12 2 3 14h7l-1 8 9-12h-7l1-8Z",
};

export default function Icone({ tipo, ...props }: SVGProps<SVGSVGElement> & { tipo: TipoIcone }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d={caminhos[tipo]} />
        </svg>
    );
}

```

## app/configuracoes/meuNegocio/page.tsx

```tsx
"use client";

import { useSearchParams } from "next/navigation";
import { startTransition, useState, useEffect } from "react";
import { Suspense } from "react";
import {
    DadosNegocio,
    Servico,
    Barbeiro,
    HorarioDia,
    Personalizacao
} from "./types";
import AbaDados from "./componentes/AbaDados";
import AbaServicos from "./componentes/AbaServicos";
import AbaBarbeiros from "./componentes/AbaBarbeiros";
import AbaHorarios from "./componentes/AbaHorarios";
import AbaPersonalizacao from "./componentes/AbaPersonalizacao";

// Dados mockados iniciais
const dadosMock: DadosNegocio = {
    nome: "",
    descricao: "",
    telefone: "",
    email: "",
    cnpj: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: ""
};

const servicosMock: Servico[] = [
    { id: "1", nome: "Corte", descricao: "Corte masculino tradicional", preco: 40, duracao: 30, barbeiros: ["1", "2"], ativo: true },
    { id: "2", nome: "Barba", descricao: "Barba completa com toalha quente", preco: 30, duracao: 20, barbeiros: ["1"], ativo: true },
    { id: "3", nome: "Corte + Barba", descricao: "Combo corte e barba", preco: 60, duracao: 50, barbeiros: ["1", "2"], ativo: true },
];

const barbeirosMock: Barbeiro[] = [
    { id: "1", nome: "João Silva", telefone: "(81) 98888-8888", email: "funcionario1@exemplo.com", foto: null, ativo: true },
    { id: "2", nome: "Pedro Santos", telefone: "(81) 97777-7777", email: "funcionario2@exemplo.com", foto: null, ativo: true },
];

const horariosMock: HorarioDia[] = [
    { dia: "segunda", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "terca", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "quarta", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "quinta", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "sexta", ativo: true, abertura: "09:00", fechamento: "20:00", almocoInicio: "12:00", almocoFim: "13:00" },
    { dia: "sabado", ativo: true, abertura: "09:00", fechamento: "18:00" },
    { dia: "domingo", ativo: false, abertura: "09:00", fechamento: "14:00" },
];

const personalizacaoMock: Personalizacao = {
    nomeNegocio: "",
    corPrimaria: "#1a1a2e",
    corSecundaria: "#e94560",
    logo: null,
    banner: null,
    mensagemBoasVindas: "",
    instagram: "",
    facebook: "",
    whatsapp: ""
};

function MeuNegocioConteudo() {
    const searchParams = useSearchParams();
    const [abaAtiva, setAbaAtiva] = useState("dados");

    // Quando a URL mudar, atualiza a aba ativa
    useEffect(() => {
        const aba = searchParams.get("aba");
        if (aba) {
            startTransition(() => setAbaAtiva(aba));
        }
    }, [searchParams]);

    const [dados, setDados] = useState(dadosMock);
    const [servicos, setServicos] = useState(servicosMock);
    const [barbeiros, setBarbeiros] = useState(barbeirosMock);
    const [horarios, setHorarios] = useState(horariosMock);
    const [personalizacao, setPersonalizacao] = useState(personalizacaoMock);

    const abas = [
        { id: "dados", label: "Dados do Negócio" },
        { id: "servicos", label: "Serviços" },
        { id: "barbeiros", label: "Funcionários" },
        { id: "horarios", label: "Horários" },
        { id: "personalizacao", label: "Personalização" },
    ];

    return (
        <div className="mx-auto w-full max-w-6xl space-y-5 pb-10 text-slate-900 sm:space-y-8">
            <header className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">Configurações do Negócio</h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-500">Gerencie as informações que seus clientes vão ver na página de agendamento</p>
            </header>

            {/* Abas */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-1 shadow-sm">
                <div className="flex min-w-max gap-1">
                    {abas.map((aba) => (
                        <button
                            key={aba.id}
                            type="button"
                            onClick={() => setAbaAtiva(aba.id)}
                            className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 ${abaAtiva === aba.id
                                ? "bg-slate-950 text-white shadow-sm"
                                : "text-slate-600 hover:bg-white hover:text-slate-950"
                                }`}
                        >
                            {aba.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Conteúdo das abas */}
            <div className="min-w-0">
                {abaAtiva === "dados" && (
                    <AbaDados dados={dados} setDados={setDados} />
                )}
                {abaAtiva === "servicos" && (
                    <AbaServicos
                        servicos={servicos}
                        setServicos={setServicos}
                        barbeiros={barbeiros}
                    />
                )}
                {abaAtiva === "barbeiros" && (
                    <AbaBarbeiros
                        barbeiros={barbeiros}
                        setBarbeiros={setBarbeiros}
                    />
                )}
                {abaAtiva === "horarios" && (
                    <AbaHorarios
                        horarios={horarios}
                        setHorarios={setHorarios}
                    />
                )}
                {abaAtiva === "personalizacao" && (
                    <AbaPersonalizacao
                        personalizacao={personalizacao}
                        setPersonalizacao={setPersonalizacao}
                    />
                )}
            </div>
        </div>
    );
}

export default function MeuNegocio() {
    return (
        <Suspense fallback={<div className="min-h-48" />}>
            <MeuNegocioConteudo />
        </Suspense>
    );
}
```

## app/dashboard/componentes/AcoesRapidas.tsx

```tsx
// components/dashboard/AcoesRapidas.tsx
"use client";

import Link from "next/link";
import Icone, { type TipoIcone } from "@/app/componentes/Icones";

interface Acao {
  href: string;
  label: string;
  descricao: string;
  icone: TipoIcone;
}

export default function AcoesRapidas() {
  const acoes: Acao[] = [
    {
      href: "/agendar/teste",
      label: "Novo Agendamento",
      descricao: "Criar um novo agendamento",
      icone: "mais",
    },
    {
      href: "/agenda",
      label: "Ver Agenda",
      descricao: "Ver todos os agendamentos",
      icone: "calendario",
    },
    {
      href: "/financeiro",
      label: "Ver Financeiro",
      descricao: "Ver relatório financeiro",
      icone: "cifrao",
    },
    {
      href: "/configuracoes/meuNegocio",
      label: "Configurações",
      descricao: "Configurar o negócio",
      icone: "ferramentas",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-950">
        Ações Rápidas
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {acoes.map((acao) => (
          <Link
            key={acao.href}
            href={acao.href}
            className="flex min-h-[104px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3 text-center transition hover:border-slate-950 hover:bg-white hover:shadow-md"
          >
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm">
              <Icone tipo={acao.icone} className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-slate-900">
              {acao.label}
            </span>
            <span className="mt-1 text-[11px] leading-4 text-slate-500 sm:text-xs">
              {acao.descricao}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

## app/dashboard/componentes/AgendaDoDia.tsx

```tsx
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
                    Ver completa
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
```

## app/dashboard/componentes/CardResumo.tsx

```tsx
// components/dashboard/CardResumo.tsx
"use client";

import type { ReactNode } from "react";

interface Props {
  titulo: string;
  valor: number | string;
  tipo?: "moeda" | "numero" | "texto";
  icone?: ReactNode;
  destaque?: "positivo" | "negativo" | "neutro";
}

export default function CardResumo({
  titulo,
  valor,
  tipo = "numero",
  icone,
  destaque = "neutro",
}: Props) {
  const valorFormatado =
    tipo === "moeda" && typeof valor === "number"
      ? `R$ ${valor.toFixed(2).replace(".", ",")}`
      : valor.toString();

  const corDestaque =
    destaque === "positivo"
      ? "text-green-600"
      : destaque === "negativo"
        ? "text-red-600"
        : "text-slate-950";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500 sm:text-xs">{titulo}</p>
        {icone && <span className="text-base sm:text-lg">{icone}</span>}
      </div>
      <p className={`text-lg font-bold sm:text-xl ${corDestaque}`}>{valorFormatado}</p>
    </div>
  );
}
```

## app/dashboard/componentes/GraficoAgendamento.tsx

```tsx
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
```

## app/dashboard/componentes/TopServicos.tsx

```tsx
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
```

## app/dashboard/page.tsx

```tsx
// app/dashboard/page.tsx
"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import Icone from "../componentes/Icones";
import CardResumo from "./componentes/CardResumo";
import AgendaDoDia from "./componentes/AgendaDoDia";
import GraficoAgendamentos from "./componentes/GraficoAgendamento";
import TopServicos from "./componentes/TopServicos";
import AcoesRapidas from "./componentes/AcoesRapidas";
import {
    AgendamentoHoje,
    ResumoDashboard,
    DadosGrafico,
    ServicoMaisVendido,
} from "./types/dashboard";

// ========================================
// DADOS MOCKADOS (FUTURO: Prisma)
// ========================================
const AGENDAMENTOS_HOJE_MOCK: AgendamentoHoje[] = [
    {
        id: "1",
        horario: "09:00",
        clienteNome: "João Silva",
        servicoNome: "Corte",
        profissionalNome: "João Silva",
        valor: 40,
        status: "Pago",
    },
    {
        id: "2",
        horario: "10:30",
        clienteNome: "Pedro Santos",
        servicoNome: "Barba",
        profissionalNome: "Pedro Santos",
        valor: 30,
        status: "Pendente",
    },
    {
        id: "3",
        horario: "11:00",
        clienteNome: "Carlos Oliveira",
        servicoNome: "Corte + Barba",
        profissionalNome: "João Silva",
        valor: 60,
        status: "Pago",
    },
    {
        id: "4",
        horario: "14:00",
        clienteNome: "Ana Paula",
        servicoNome: "Corte",
        profissionalNome: "Pedro Santos",
        valor: 40,
        status: "Pago",
    },
    {
        id: "5",
        horario: "15:30",
        clienteNome: "Marcos Souza",
        servicoNome: "Barba",
        profissionalNome: "Carlos Oliveira",
        valor: 30,
        status: "Pendente",
    },
    {
        id: "6",
        horario: "16:30",
        clienteNome: "Lucas Lima",
        servicoNome: "Corte + Barba",
        profissionalNome: "João Silva",
        valor: 60,
        status: "Pago",
    },
    {
        id: "7",
        horario: "17:30",
        clienteNome: "Rafael Costa",
        servicoNome: "Pezinho",
        profissionalNome: "Pedro Santos",
        valor: 15,
        status: "Pendente",
    },
    {
        id: "8",
        horario: "18:30",
        clienteNome: "Bruno Alves",
        servicoNome: "Corte",
        profissionalNome: "Carlos Oliveira",
        valor: 40,
        status: "Pago",
    },
];

const GRAFICO_MOCK: DadosGrafico[] = [
    { dia: "Seg", quantidade: 6 },
    { dia: "Ter", quantidade: 8 },
    { dia: "Qua", quantidade: 5 },
    { dia: "Qui", quantidade: 9 },
    { dia: "Sex", quantidade: 12 },
    { dia: "Sáb", quantidade: 15 },
    { dia: "Dom", quantidade: 4 },
];

const TOP_SERVICOS_MOCK: ServicoMaisVendido[] = [
    { nome: "Corte", quantidade: 32 },
    { nome: "Barba", quantidade: 18 },
    { nome: "Corte + Barba", quantidade: 12 },
    { nome: "Pezinho", quantidade: 8 },
    { nome: "Platinado", quantidade: 3 },
];

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
export default function Dashboard() {
    // ========================================
    // CALCULAR RESUMO
    // ========================================
    const resumo: ResumoDashboard = useMemo(() => {
        const agendamentosPagos = AGENDAMENTOS_HOJE_MOCK.filter(
            (a) => a.status === "Pago"
        );

        const faturamentoHoje = agendamentosPagos.reduce(
            (acc, a) => acc + a.valor,
            0
        );

        // Próximo agendamento (primeiro pendente ou pago após o horário atual)
        const agora = format(new Date(), "HH:mm");
        const proximo = AGENDAMENTOS_HOJE_MOCK.find((a) => a.horario > agora);

        return {
            agendamentosHoje: AGENDAMENTOS_HOJE_MOCK.length,
            faturamentoHoje,
            clientesAtendidos: agendamentosPagos.length,
            proximoAgendamento: proximo ? proximo.horario : "Nenhum",
        };
    }, []);

    return (
        <div className="mx-auto w-full max-w-7xl px-0 py-4 sm:px-2 sm:py-6">
            {/* ===== CABEÇALHO ===== */}
            <div className="mb-5 sm:mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Bem-vindo de volta! Veja o resumo do seu dia.
                </p>
            </div>

            {/* ===== CARDS DE RESUMO ===== */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                <CardResumo
                    titulo="Agendamentos Hoje"
                    valor={resumo.agendamentosHoje}
                    tipo="numero"
                    icone={<Icone tipo="calendario" className="h-5 w-5" />}
                />
                <CardResumo
                    titulo="Faturamento Hoje"
                    valor={resumo.faturamentoHoje}
                    tipo="moeda"
                    destaque="positivo"
                    icone={<Icone tipo="cifrao" className="h-5 w-5" />}
                />
                <CardResumo
                    titulo="Clientes Atendidos"
                    valor={resumo.clientesAtendidos}
                    tipo="numero"
                    icone={<Icone tipo="usuarios" className="h-5 w-5" />}
                />
                <CardResumo
                    titulo="Próximo Agendamento"
                    valor={resumo.proximoAgendamento}
                    tipo="texto"
                    icone={<Icone tipo="relogio" className="h-5 w-5" />}
                />
            </div>

            {/* ===== AGENDA DO DIA ===== */}
            <div className="mb-6">
                <AgendaDoDia agendamentos={AGENDAMENTOS_HOJE_MOCK} />
            </div>

            {/* ===== GRÁFICO + TOP SERVIÇOS ===== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <GraficoAgendamentos dados={GRAFICO_MOCK} />
                <TopServicos servicos={TOP_SERVICOS_MOCK} />
            </div>

            {/* ===== AÇÕES RÁPIDAS ===== */}
            <AcoesRapidas />
        </div>
    );
}
```

## app/dashboard/types/dashboard.ts

```typescript
// types/dashboard.ts

export interface AgendamentoHoje {
  id: string;
  horario: string;
  clienteNome: string;
  servicoNome: string;
  profissionalNome: string;
  valor: number;
  status: "Pago" | "Pendente" | "Cancelado";
}

export interface ResumoDashboard {
  agendamentosHoje: number;
  faturamentoHoje: number;
  clientesAtendidos: number;
  proximoAgendamento: string;
}

export interface DadosGrafico {
  dia: string;
  quantidade: number;
}

export interface ServicoMaisVendido {
  nome: string;
  quantidade: number;
}
```

## app/financeiro/componentes/CardResumo.tsx

```tsx
"use client";

interface Props {
  titulo: string;
  valor: number;
  tipo?: "moeda" | "numero";
  destaque?: "positivo" | "negativo" | "neutro";
}

export default function CardResumo({
  titulo,
  valor,
  tipo = "moeda",
  destaque = "neutro",
}: Props) {
  const valorFormatado =
    tipo === "moeda"
      ? `R$ ${valor.toFixed(2).replace(".", ",")}`
      : valor.toString();

  const corDestaque =
    destaque === "positivo"
      ? "text-green-600"
      : destaque === "negativo"
        ? "text-red-600"
        : "text-slate-950";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.08em] text-slate-500 sm:text-xs">
        {titulo}
      </p>
      <p className={`text-lg font-bold sm:text-xl ${corDestaque}`}>{valorFormatado}</p>
    </div>
  );
}
```

## app/financeiro/componentes/Filtros.tsx

```tsx
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
```

## app/financeiro/componentes/ModalEditarTrasacao.tsx

```tsx
"use client";

import { useState } from "react";
import Icone from "@/app/componentes/Icones";
import { Transacao, StatusTransacao } from "../types/Financeiro";

interface Props {
  transacao: Transacao;
  onSalvar: (transacao: Transacao) => void;
  onFechar: () => void;
}

export default function ModalEditarTransacao({
  transacao,
  onSalvar,
  onFechar,
}: Props) {
  const [valor, setValor] = useState(transacao.valor.toString());
  const [status, setStatus] = useState<StatusTransacao>(transacao.status);
  const [formaPagamento, setFormaPagamento] = useState(
    transacao.formaPagamento || ""
  );
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const valorNumerico = parseFloat(valor.replace(",", "."));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setErro("Informe um valor válido maior que zero");
      return;
    }

    const transacaoAtualizada: Transacao = {
      ...transacao,
      valor: valorNumerico,
      status,
      formaPagamento: status === "Pago" ? formaPagamento || "Não informado" : undefined,
    };

    onSalvar(transacaoAtualizada);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-950">
            Editar Transação
          </h2>
          <button
            onClick={onFechar}
            className="text-slate-400 transition hover:text-slate-700"
          >
            <Icone tipo="fechar" className="h-5 w-5" />
          </button>
        </div>

        {/* INFORMAÇÕES DO CLIENTE */}
        <div className="mb-4 rounded-lg bg-slate-50 p-3">
          <p className="text-sm font-medium text-slate-900">
            {transacao.clienteNome}
          </p>
          <p className="text-xs text-slate-500">
            {transacao.servicoNome} · {transacao.profissionalNome}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Valor (R$) *
            </label>
            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusTransacao)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            >
              <option value="Pendente">Pendente</option>
              <option value="Pago">Pago</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          {status === "Pago" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Forma de Pagamento
              </label>
              <select
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              >
                <option value="">Selecione...</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Cartão">Cartão</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          )}

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

## app/financeiro/componentes/ModalNovaDespesa.tsx

```tsx
"use client";

import { useState } from "react";
import { format } from "date-fns";
import Icone from "@/app/componentes/Icones";
import { Despesa, CategoriaDespesa, CATEGORIAS_DESPESA } from "../types/Financeiro";

interface Props {
    onSalvar: (despesa: Despesa) => void;
    onFechar: () => void;
}

export default function ModalNovaDespesa({ onSalvar, onFechar }: Props) {
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState<CategoriaDespesa>("Outros");
    const [valor, setValor] = useState("");
    const [data, setData] = useState(format(new Date(), "yyyy-MM-dd"));
    const [erro, setErro] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");

        if (!descricao.trim()) {
            setErro("A descrição é obrigatória");
            return;
        }

        const valorNumerico = parseFloat(valor.replace(",", "."));
        if (!valor || isNaN(valorNumerico) || valorNumerico <= 0) {
            setErro("Informe um valor válido maior que zero");
            return;
        }

        const novaDespesa: Despesa = {
            id: Date.now().toString(),
            data: new Date(data + "T12:00:00").toISOString(),
            descricao: descricao.trim(),
            categoria,
            valor: valorNumerico,
        };

        onSalvar(novaDespesa);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-950">Nova Despesa</h2>
                    <button
                        onClick={onFechar}
                        className="text-slate-400 transition hover:text-slate-700"
                    >
                        <Icone tipo="fechar" className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Descrição *
                        </label>
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Ex: Compra de shampoo"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Categoria *
                        </label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value as CategoriaDespesa)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                        >
                            {CATEGORIAS_DESPESA.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Valor (R$) *
                        </label>
                        <input
                            type="text"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            placeholder="0,00"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Data *
                        </label>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                            required
                        />
                    </div>

                    {erro && <p className="text-sm text-red-600">{erro}</p>}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onFechar}
                            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
```

## app/financeiro/componentes/TabelaDespesas.tsx

```tsx
// components/financeiro/TabelaDespesas.tsx
"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Despesa } from "../types/Financeiro";

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
```

## app/financeiro/componentes/TabelaTransacoes.tsx

```tsx
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
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-slate-950">
                    Transações
                </h2>
                <span className="text-xs text-slate-500 sm:text-sm">
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
                <div className="overflow-x-auto -mx-1 px-1">
                    <table className="w-full min-w-[660px] text-sm">
                        <thead>
                            <tr className="border-b border-slate-200 text-left">
                                <th className="pb-3 pr-2 font-medium text-slate-500">Data</th>
                                <th className="pb-3 pr-2 font-medium text-slate-500">Cliente</th>
                                <th className="pb-3 pr-2 font-medium text-slate-500">Serviço</th>
                                <th className="pb-3 pr-2 font-medium text-slate-500">Profissional</th>
                                <th className="pb-3 pr-2 font-medium text-slate-500">Valor</th>
                                <th className="pb-3 pr-2 font-medium text-slate-500">Status</th>
                                <th className="pb-3 font-medium text-slate-500">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transacoes.map((t) => (
                                <tr
                                    key={t.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                                >
                                    <td className="py-3 pr-2 text-slate-700">
                                        {format(parseISO(t.data), "dd/MM/yyyy", { locale: ptBR })}
                                    </td>
                                    <td className="py-3 pr-2 font-medium text-slate-900">
                                        {t.clienteNome}
                                    </td>
                                    <td className="py-3 pr-2 text-slate-700">{t.servicoNome}</td>
                                    <td className="py-3 pr-2 text-slate-700">{t.profissionalNome}</td>
                                    <td className="py-3 pr-2 font-semibold text-slate-900">
                                        R$ {t.valor.toFixed(2).replace(".", ",")}
                                    </td>
                                    <td className="py-3 pr-2">
                                        <span
                                            className={`rounded-full px-2 py-1 text-[11px] font-medium ${getStatusBadge(
                                                t.status
                                            )}`}
                                        >
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="py-3">
                                        <div className="flex flex-wrap gap-2">
                                            {t.status === "Pendente" && (
                                                <button
                                                    onClick={() => onMarcarComoPago(t.id)}
                                                    className="rounded-lg bg-green-600 px-2 py-1.5 text-[11px] font-medium text-white transition hover:bg-green-700"
                                                >
                                                    Pagar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onEditar(t)}
                                                className="rounded-lg bg-slate-200 px-2 py-1.5 text-[11px] font-medium text-slate-700 transition hover:bg-slate-300"
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
```

## app/financeiro/page.tsx

```tsx
"use client";

import { useState, useMemo } from "react";
import {
    startOfDay,
    startOfMonth,
    isSameDay,
    isSameMonth,
    parseISO,
    subDays,
} from "date-fns";
import CardResumo from "./componentes/CardResumo";
import Filtros from "./componentes/Filtros";
import TabelaTransacoes from "./componentes/TabelaTransacoes";
import TabelaDespesas from "./componentes/TabelaDespesas";
import ModalNovaDespesa from "./componentes/ModalNovaDespesa";
import ModalEditarTransacao from "./componentes/ModalEditarTrasacao";
import {
    Transacao,
    Despesa,
    ResumoFinanceiro,
    StatusTransacao,
} from "./types/Financeiro";

// ========================================
// DADOS MOCKADOS (FUTURO: Prisma)
// ========================================
const TRANSACOES_MOCK: Transacao[] = [
    {
        id: "1",
        data: new Date().toISOString(),
        clienteNome: "João Silva",
        servicoNome: "Corte",
        profissionalNome: "João Silva",
        valor: 40,
        status: "Pago",
        formaPagamento: "Pix",
    },
    {
        id: "2",
        data: new Date().toISOString(),
        clienteNome: "Pedro Santos",
        servicoNome: "Barba",
        profissionalNome: "Pedro Santos",
        valor: 30,
        status: "Pendente",
    },
    {
        id: "3",
        data: subDays(new Date(), 1).toISOString(),
        clienteNome: "Carlos Oliveira",
        servicoNome: "Corte + Barba",
        profissionalNome: "João Silva",
        valor: 60,
        status: "Pago",
        formaPagamento: "Dinheiro",
    },
    {
        id: "4",
        data: subDays(new Date(), 1).toISOString(),
        clienteNome: "Ana Paula",
        servicoNome: "Corte",
        profissionalNome: "Pedro Santos",
        valor: 40,
        status: "Pago",
        formaPagamento: "Cartão",
    },
    {
        id: "5",
        data: subDays(new Date(), 2).toISOString(),
        clienteNome: "Marcos Souza",
        servicoNome: "Barba",
        profissionalNome: "Carlos Oliveira",
        valor: 30,
        status: "Cancelado",
    },
    {
        id: "6",
        data: subDays(new Date(), 3).toISOString(),
        clienteNome: "Lucas Lima",
        servicoNome: "Corte + Barba",
        profissionalNome: "João Silva",
        valor: 60,
        status: "Pago",
        formaPagamento: "Pix",
    },
    {
        id: "7",
        data: subDays(new Date(), 5).toISOString(),
        clienteNome: "Rafael Costa",
        servicoNome: "Pezinho",
        profissionalNome: "Pedro Santos",
        valor: 15,
        status: "Pago",
        formaPagamento: "Dinheiro",
    },
];

const DESPESAS_MOCK: Despesa[] = [
    {
        id: "d1",
        data: subDays(new Date(), 5).toISOString(),
        descricao: "Compra de shampoo e pomada",
        categoria: "Produtos",
        valor: 150,
    },
    {
        id: "d2",
        data: subDays(new Date(), 10).toISOString(),
        descricao: "Conta de luz",
        categoria: "Luz",
        valor: 280,
    },
    {
        id: "d3",
        data: subDays(new Date(), 15).toISOString(),
        descricao: "Aluguel do espaço",
        categoria: "Aluguel",
        valor: 1200,
    },
];

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
export default function Financeiro() {
    // ========================================
    // ESTADOS
    // ========================================
    const [transacoes, setTransacoes] = useState<Transacao[]>(TRANSACOES_MOCK);
    const [despesas, setDespesas] = useState<Despesa[]>(DESPESAS_MOCK);
    const [filtroPeriodo, setFiltroPeriodo] = useState("mes");
    const [filtroStatus, setFiltroStatus] = useState<StatusTransacao | "todos">(
        "todos"
    );
    const [modalDespesaAberto, setModalDespesaAberto] = useState(false);
    const [transacaoEditando, setTransacaoEditando] =
        useState<Transacao | null>(null);

    // ========================================
    // FILTRAR TRANSAÇÕES
    // ========================================
    const transacoesFiltradas = useMemo(() => {
        const hoje = new Date();
        let dataInicio: Date;

        switch (filtroPeriodo) {
            case "hoje":
                dataInicio = startOfDay(hoje);
                break;
            case "7dias":
                dataInicio = subDays(hoje, 7);
                break;
            case "30dias":
                dataInicio = subDays(hoje, 30);
                break;
            case "mes":
            default:
                dataInicio = startOfMonth(hoje);
                break;
        }

        return transacoes.filter((t) => {
            const dataTransacao = parseISO(t.data);
            const dentroPeriodo = dataTransacao >= dataInicio;
            const statusOk = filtroStatus === "todos" || t.status === filtroStatus;
            return dentroPeriodo && statusOk;
        });
    }, [transacoes, filtroPeriodo, filtroStatus]);

    // ========================================
    // CALCULAR RESUMO
    // ========================================
    const resumo: ResumoFinanceiro = useMemo(() => {
        const hoje = new Date();

        const transacoesPagas = transacoes.filter((t) => t.status === "Pago");
        const transacoesPagasMes = transacoesPagas.filter((t) =>
            isSameMonth(parseISO(t.data), hoje)
        );
        const transacoesPagasDia = transacoesPagas.filter((t) =>
            isSameDay(parseISO(t.data), hoje)
        );

        const faturamentoMes = transacoesPagasMes.reduce(
            (acc, t) => acc + t.valor,
            0
        );
        const faturamentoDia = transacoesPagasDia.reduce(
            (acc, t) => acc + t.valor,
            0
        );
        const totalAtendimentos = transacoesPagasMes.length;
        const ticketMedio =
            totalAtendimentos > 0 ? faturamentoMes / totalAtendimentos : 0;

        const despesasMes = despesas
            .filter((d) => isSameMonth(parseISO(d.data), hoje))
            .reduce((acc, d) => acc + d.valor, 0);

        const lucroLiquido = faturamentoMes - despesasMes;

        return {
            faturamentoMes,
            faturamentoDia,
            ticketMedio,
            totalAtendimentos,
            totalDespesas: despesasMes,
            lucroLiquido,
        };
    }, [transacoes, despesas]);

    // ========================================
    // AÇÕES - TRANSAÇÕES
    // ========================================
    const handleMarcarComoPago = (id: string) => {
        setTransacoes((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, status: "Pago" as StatusTransacao, formaPagamento: "Não informado" }
                    : t
            )
        );
    };

    const handleEditarTransacao = (transacao: Transacao) => {
        setTransacaoEditando(transacao);
    };

    const handleSalvarTransacao = (transacaoAtualizada: Transacao) => {
        setTransacoes((prev) =>
            prev.map((t) =>
                t.id === transacaoAtualizada.id ? transacaoAtualizada : t
            )
        );
        setTransacaoEditando(null);
    };

    // ========================================
    // AÇÕES - DESPESAS
    // ========================================
    const handleAdicionarDespesa = (novaDespesa: Despesa) => {
        setDespesas((prev) => [...prev, novaDespesa]);
        setModalDespesaAberto(false);
    };

    const handleExcluirDespesa = (id: string) => {
        if (confirm("Tem certeza que deseja excluir esta despesa?")) {
            setDespesas((prev) => prev.filter((d) => d.id !== id));
        }
    };

    // ========================================
    // RENDER
    // ========================================
    return (
        <div className="mx-auto w-full max-w-7xl px-0 py-4 sm:px-2 sm:py-6">
            {/* ===== CABEÇALHO ===== */}
            <div className="mb-5 sm:mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                    Financeiro
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Gerencie as finanças do seu negócio
                </p>
            </div>

            {/* ===== CARDS DE RESUMO ===== */}
            <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
                <CardResumo
                    titulo="Faturamento do Mês"
                    valor={resumo.faturamentoMes}
                    tipo="moeda"
                />
                <CardResumo
                    titulo="Faturamento do Dia"
                    valor={resumo.faturamentoDia}
                    tipo="moeda"
                />
                <CardResumo
                    titulo="Ticket Médio"
                    valor={resumo.ticketMedio}
                    tipo="moeda"
                />
                <CardResumo
                    titulo="Atendimentos"
                    valor={resumo.totalAtendimentos}
                    tipo="numero"
                />
                <CardResumo
                    titulo="Despesas do Mês"
                    valor={resumo.totalDespesas}
                    tipo="moeda"
                />
                <CardResumo
                    titulo="Lucro Líquido"
                    valor={resumo.lucroLiquido}
                    tipo="moeda"
                    destaque={resumo.lucroLiquido >= 0 ? "positivo" : "negativo"}
                />
            </div>

            {/* ===== FILTROS ===== */}
            <Filtros
                filtroPeriodo={filtroPeriodo}
                setFiltroPeriodo={setFiltroPeriodo}
                filtroStatus={filtroStatus}
                setFiltroStatus={setFiltroStatus}
            />

            {/* ===== TABELA DE TRANSAÇÕES ===== */}
            <div className="mt-6">
                <TabelaTransacoes
                    transacoes={transacoesFiltradas}
                    onMarcarComoPago={handleMarcarComoPago}
                    onEditar={handleEditarTransacao}
                />
            </div>

            {/* ===== TABELA DE DESPESAS (COM BOTÃO NOVA DESPESA) ===== */}
            <div className="mt-8">
                <TabelaDespesas
                    despesas={despesas}
                    onExcluir={handleExcluirDespesa}
                    onNovaDespesa={() => setModalDespesaAberto(true)}
                />
            </div>

            {/* ===== MODAIS ===== */}
            {modalDespesaAberto && (
                <ModalNovaDespesa
                    onSalvar={handleAdicionarDespesa}
                    onFechar={() => setModalDespesaAberto(false)}
                />
            )}

            {transacaoEditando && (
                <ModalEditarTransacao
                    transacao={transacaoEditando}
                    onSalvar={handleSalvarTransacao}
                    onFechar={() => setTransacaoEditando(null)}
                />
            )}
        </div>
    );
}
```

## app/financeiro/types/Financeiro.ts

```typescript
export type StatusTransacao = "Pendente" | "Pago" | "Cancelado";

export type CategoriaDespesa =
  | "Produtos"
  | "Aluguel"
  | "Água"
  | "Luz"
  | "Internet"
  | "Marketing"
  | "Equipamentos"
  | "Outros";

export interface Transacao {
  id: string;
  data: string; // ISO string
  clienteNome: string;
  servicoNome: string;
  profissionalNome: string;
  valor: number;
  status: StatusTransacao;
  formaPagamento?: string;
}

export interface Despesa {
  id: string;
  data: string; // ISO string
  descricao: string;
  categoria: CategoriaDespesa;
  valor: number;
}

export interface ResumoFinanceiro {
  faturamentoMes: number;
  faturamentoDia: number;
  ticketMedio: number;
  totalAtendimentos: number;
  totalDespesas: number;
  lucroLiquido: number;
}

export const CATEGORIAS_DESPESA: CategoriaDespesa[] = [
  "Produtos",
  "Aluguel",
  "Água",
  "Luz",
  "Internet",
  "Marketing",
  "Equipamentos",
  "Outros",
];
```

## app/globals.css

```css
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-geist-sans), sans-serif;
  overflow-x: hidden;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

button,
input,
select,
textarea {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

@media (max-width: 767px) {
  body {
    padding-bottom: env(safe-area-inset-bottom);
  }
}
```

## app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "./AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agendamento APP",
  description: "Agendamento de Salões, Babearias e estúdios de beleza",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
```

## app/page.tsx

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Gestão para negócios
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Sistema de Agendamento
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Gerencie seu negócio de forma simples
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/agendar/teste"
            className="rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
          >
            Agendar Horário
          </Link>
        </div>
      </section>
    </main>
  );
}
```

## app/side-bar/page.tsx

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icone from "../componentes/Icones";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [configuracoesAberto, setConfiguracoesAberto] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M4 13.5h7V20H4v-6.5Zm9-9h7v7h-7V4.5Zm0 10.5h7V20h-7v-4.5ZM4 4.5h7v6.5H4V4.5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      href: "/financeiro",
      label: "Financeiro",
      active: pathname === "/financeiro",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M3.5 18.5h17M6 15.5V9.5m6 6V5.5m6 10V12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        className="fixed left-4 top-4 z-50 rounded-xl bg-slate-900 p-2.5 text-white shadow-lg transition hover:bg-slate-800 lg:hidden"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto border-r border-slate-200 bg-slate-100/95 p-4 shadow-xl backdrop-blur-sm transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            <Icone tipo="tesoura" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Sistema</p>
            <h3 className="text-sm font-semibold text-slate-800">Agenda</h3>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map(({ href, label, active, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-700 hover:bg-slate-200 hover:text-slate-950"
                }`}
            >
              <span className={active ? "text-white" : "text-slate-500"}>{icon}</span>
              {label}
            </Link>
          ))}

          <button
            onClick={() => setConfiguracoesAberto(!configuracoesAberto)}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${configuracoesAberto
              ? "bg-slate-200 text-slate-950"
              : "text-slate-700 hover:bg-slate-200 hover:text-slate-950"
              }`}
          >
            <span className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M10.5 3.5h3l.7 2.3a7.1 7.1 0 0 1 2.4 1.4l2.2-.9 1.5 2.6-1.6 1.9c.2.7.3 1.4.3 2.2s-.1 1.5-.3 2.2l1.6 1.9-1.5 2.6-2.2-.9a7.1 7.1 0 0 1-2.4 1.4l-.7 2.3h-3l-.7-2.3a7.1 7.1 0 0 1-2.4-1.4l-2.2.9-1.5-2.6 1.6-1.9a7.1 7.1 0 0 1-.3-2.2c0-.8.1-1.5.3-2.2L3.7 9.9l1.5-2.6 2.2.9a7.1 7.1 0 0 1 2.4-1.4l.7-2.3Z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Configurações
            </span>

            <span className="text-[10px] text-slate-500" aria-hidden="true">
              {configuracoesAberto ? "▲" : "▼"}
            </span>
          </button>

          {configuracoesAberto && (
            <div className="ml-3 mt-1 space-y-1 border-l border-slate-300 pl-2">
              <Link
                href="/configuracoes/perfil"
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${pathname === "/configuracoes/perfil"
                  ? "bg-slate-900 font-medium text-white"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                  }`}
              >
                Perfil
              </Link>

              <Link
                href="/configuracoes/meuNegocio"
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${pathname === "/configuracoes/meuNegocio"
                  ? "bg-slate-900 font-medium text-white"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                  }`}
              >
                Meu Negócio
              </Link>
            </div>
          )}
        </nav>
      </aside>
    </div>
  );
}

```

## prisma/schema.prisma

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
}

model Estabelecimento {
  id             String   @id @default(uuid())
  slug           String   @unique
  name           String
  logoUrl        String?
  banner         String?
  primaryColor   String   @default("#00000000")
  createAt       DateTime @default(now())
  updateAt       DateTime
  proprietarioId String

  proprietarios Proprietario @relation(fields: [proprietarioId], references: [id], onDelete: Cascade)

  servicos       Servico[]
  profissionais  Profissional[]
  agendadamentos Agendamento[]

  @@index([slug])
}

model Proprietario {
  id       String @id @default(uuid())
  name     String
  telefone String @unique
  email    String @unique

  estabelecimentos Estabelecimento[]

  createAt DateTime @default(now())
  updateAt DateTime
}

model Servico {
  id        String  @id @default(uuid())
  nome      String
  descricao String?
  preco     Decimal @db.Decimal(10, 2)
  duracao   Int

  estabelecimentoId String

  estabelecimentos Estabelecimento @relation(fields: [estabelecimentoId], references: [id], onDelete: Cascade)
  agendamentos     Agendamento[]
}

model Profissional {
  id   String @id @default(uuid())
  nome String

  estabelecimentoId String
  estabelecimento   Estabelecimento @relation(fields: [estabelecimentoId], references: [id], onDelete: Cascade)
  aagendamento      Agendamento[]
}

model Agendamento {
  id          String   @id @default(uuid())
  clienteNome String
  clienteFone String
  descricao   String
  dataHora    DateTime
  preco       Decimal  @db.Decimal(10, 2)

  estabelecimentoId String
  estabelecimento   Estabelecimento @relation(fields: [estabelecimentoId], references: [id], onDelete: Cascade)

  servicoId String
  servico   Servico @relation(fields: [servicoId], references: [id])

  profissionalId String
  profissional   Profissional @relation(fields: [profissionalId], references: [id])

  createdAt DateTime @default(now())

  @@index([profissionalId, dataHora])
  @@index([estabelecimentoId, dataHora])
}

```
