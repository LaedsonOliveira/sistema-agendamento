// app/dashboard/page.tsx
"use client";

import { useMemo } from "react";
import { format } from "date-fns";
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
                    icone="📅"
                />
                <CardResumo
                    titulo="Faturamento Hoje"
                    valor={resumo.faturamentoHoje}
                    tipo="moeda"
                    destaque="positivo"
                    icone="💰"
                />
                <CardResumo
                    titulo="Clientes Atendidos"
                    valor={resumo.clientesAtendidos}
                    tipo="numero"
                    icone="👥"
                />
                <CardResumo
                    titulo="Próximo Agendamento"
                    valor={resumo.proximoAgendamento}
                    tipo="texto"
                    icone="⏰"
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