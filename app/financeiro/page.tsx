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