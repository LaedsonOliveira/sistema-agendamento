// app/agendar/[slug]/ClienteAgendamento.tsx
"use client";

import { useState, useMemo } from "react";
import { format, isSameDay, parseISO } from "date-fns";
import Image from "next/image";
import Icone from "@/app/componentes/Icones";
import EtapaBarbeiro from "../componentes/EtapaBarbeiro";
import EtapaServico from "../componentes/EtapaServico";
import EtapaDataHorario from "../componentes/EtapaDataHorario";
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
  DATA_HORARIO: 2,
  DADOS: 3,
  CONFIRMACAO: 4,
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
    case ETAPAS.DATA_HORARIO:
      return (
        <EtapaDataHorario
          dataSelecionada={dataSelecionada}
          onSelectData={setDataSelecionada}
          horarioSelecionado={horarioSelecionado}
          onSelectHorario={setHorarioSelecionado}
          horarios={horariosDisponiveis}
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
    {/* ===== HEADER COM BANNER E LOGO ===== */}
    <div
      className="relative bg-cover bg-center"
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
      <div className="relative z-10 container mx-auto px-4 py-6 text-center sm:py-8">
        {/* Logo - centralizada */}
        <div className="flex justify-center">
          {estabelecimento.logoUrl ? (
            <Image
              src={estabelecimento.logoUrl}
              alt={estabelecimento.name}
              width={80}
              height={80}
              unoptimized
              className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg sm:h-24 sm:w-24"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-white/10 text-white shadow-lg sm:h-24 sm:w-24">
              <Icone tipo="tesoura" className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
          )}
        </div>

        {/* Nome do negócio */}
        <h1
          className="mt-3 text-xl font-bold sm:text-2xl"
          style={{ color: cores.secondary }}
        >
          {estabelecimento.name}
        </h1>

        {/* Subtítulo */}
        <p className="mt-1 text-xs text-white/80 sm:text-sm">
          Agende seu horário de forma rápida e fácil
        </p>
      </div>
    </div>

    {/* ===== CONTEÚDO ===== */}
    <div className="mx-auto w-full max-w-2xl px-3 py-4 sm:px-4 sm:py-8">
      <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-6">
        {/* PROGRESSO */}
        <div className="mb-5 flex items-center justify-between gap-1 sm:mb-6 sm:gap-2">
          {etapasLista.map((key, index) => {
            const isConcluida = index < etapaAtual;
            const isAtiva = index === etapaAtual;

            return (
              <div key={key} className="flex items-center">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition sm:h-8 sm:w-8 sm:text-sm ${
                    isConcluida
                      ? "bg-green-500 text-white"
                      : isAtiva
                        ? "text-white"
                        : "bg-slate-200 text-slate-500"
                  }`}
                  style={isAtiva ? { backgroundColor: cores.secondary } : {}}
                >
                  {isConcluida ? (
                    <Icone tipo="check" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < etapasLista.length - 1 && (
                  <div
                    className={`h-0.5 min-w-2 flex-1 transition sm:max-w-8 ${
                      isConcluida ? "bg-green-500" : "bg-slate-200"
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