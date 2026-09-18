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
    isSameDay,
    isSameMonth,
    parseISO,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import VisaoDia from "./componentes/VisaoDia";
import VisaoSemana from "./componentes/VisaoSemana";
import VisaoMes from "./componentes/VisaoMes";
import FiltrosAgenda from "./componentes/FiltrosAgenda";
import ModalDetalhes from "./componentes/ModalDetalhes";
import { Agendamento, Profissional, StatusAgendamento } from "./types/agenda";

// ========================================
// DADOS MOCKADOS (FUTURO: Prisma)
// ========================================
const PROFISSIONAIS_MOCK: Profissional[] = [
    { id: "1", nome: "João Silva" },
    { id: "2", nome: "Pedro Santos" },
    { id: "3", nome: "Carlos Oliveira" },
];

const AGENDAMENTOS_MOCK: Agendamento[] = [
    // Hoje
    {
        id: "1",
        data: new Date().toISOString(),
        horario: "09:00",
        clienteNome: "João Silva",
        clienteFone: "(81) 99999-9999",
        servicoNome: "Corte",
        profissionalId: "1",
        profissionalNome: "João Silva",
        valor: 40,
        status: "Pago",
    },
    {
        id: "2",
        data: new Date().toISOString(),
        horario: "10:30",
        clienteNome: "Pedro Santos",
        clienteFone: "(81) 98888-8888",
        servicoNome: "Barba",
        profissionalId: "2",
        profissionalNome: "Pedro Santos",
        valor: 30,
        status: "Pendente",
    },
    {
        id: "3",
        data: new Date().toISOString(),
        horario: "11:00",
        clienteNome: "Carlos Oliveira",
        clienteFone: "(81) 97777-7777",
        servicoNome: "Corte + Barba",
        profissionalId: "1",
        profissionalNome: "João Silva",
        valor: 60,
        status: "Pago",
    },
    {
        id: "4",
        data: new Date().toISOString(),
        horario: "14:00",
        clienteNome: "Ana Paula",
        clienteFone: "(81) 96666-6666",
        servicoNome: "Corte",
        profissionalId: "2",
        profissionalNome: "Pedro Santos",
        valor: 40,
        status: "Pago",
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
        horario: "14:00",
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

    // ========================================
    // RENDER
    // ========================================
    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* ===== CABEÇALHO ===== */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Agenda</h1>
                    <p className="text-sm text-slate-500">
                        Gerencie todos os agendamentos da sua barbearia
                    </p>
                </div>
                <Link
                    href="/agendar/teste"
                    className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                    + Novo Agendamento
                </Link>
            </div>

            {/* ===== NAVEGAÇÃO DE DATA ===== */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleAnterior}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            ← Anterior
                        </button>
                        <button
                            onClick={handleHoje}
                            className="rounded-lg bg-slate-950 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
                        >
                            Hoje
                        </button>
                        <button
                            onClick={handleProximo}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            Próximo
                        </button>
                    </div>
                    <p className="text-sm font-semibold capitalize text-slate-900">
                        {tituloData}
                    </p>
                </div>
            </div>

            {/* ===== VISUALIZAÇÃO + FILTROS ===== */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                {/* VISUALIZAÇÃO */}
                <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
                    {(["dia", "semana", "mes"] as const).map((v) => (
                        <button
                            key={v}
                            onClick={() => setVisualizacao(v)}
                            className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition ${visualizacao === v
                                ? "bg-slate-950 text-white"
                                : "text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {v}
                        </button>
                    ))}
                </div>

                {/* FILTROS */}
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
        </div>
    );
}