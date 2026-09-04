"use client";

import { useSearchParams } from "next/navigation";
import { startTransition, useState, useEffect } from "react";
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
    nome: "teste",
    descricao: "A melhor barbearia da região com profissionais experientes",
    telefone: "(81) 99999-9999",
    email: "contato@barbeariaedyni.com",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua Exemplo, 123",
    cidade: "Recife",
    estado: "PE",
    cep: "50000-000"
};

const servicosMock: Servico[] = [
    { id: "1", nome: "Corte", descricao: "Corte masculino tradicional", preco: 40, duracao: 30, barbeiros: ["1", "2"], ativo: true },
    { id: "2", nome: "Barba", descricao: "Barba completa com toalha quente", preco: 30, duracao: 20, barbeiros: ["1"], ativo: true },
    { id: "3", nome: "Corte + Barba", descricao: "Combo corte e barba", preco: 60, duracao: 50, barbeiros: ["1", "2"], ativo: true },
];

const barbeirosMock: Barbeiro[] = [
    { id: "1", nome: "João Silva", telefone: "(81) 98888-8888", email: "joao@barbearia.com", foto: null, ativo: true },
    { id: "2", nome: "Pedro Santos", telefone: "(81) 97777-7777", email: "pedro@barbearia.com", foto: null, ativo: true },
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
    nomeNegocio: "teste",
    corPrimaria: "#1a1a2e",
    corSecundaria: "#e94560",
    logo: null,
    banner: null,
    mensagemBoasVindas: "Bem-vindo à Barbearia! Agende seu horário e saia renovado.",
    instagram: "@barbearateste",
    facebook: "/barbearateste",
    whatsapp: "(81) 99999-9999"
};

export default function MeuNegocio() {
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
        { id: "barbeiros", label: "Barbeiros" },
        { id: "horarios", label: "Horários" },
        { id: "personalizacao", label: "Personalização" },
    ];

    return (
        <div className="mx-auto max-w-6xl space-y-8 pb-10 text-slate-900">
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