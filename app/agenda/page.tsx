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