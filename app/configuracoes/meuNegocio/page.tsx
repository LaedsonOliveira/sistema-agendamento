"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
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
    nome: "Barbearia do Edyni",
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
    nomeNegocio: "Barbearia do Edyni",
    corPrimaria: "#1a1a2e",
    corSecundaria: "#e94560",
    logo: null,
    banner: null,
    mensagemBoasVindas: "Bem-vindo à Barbearia do Edyni! Agende seu horário e saia renovado.",
    instagram: "@barbeariaedyni",
    facebook: "/barbeariaedyni",
    whatsapp: "(81) 99999-9999"
};

export default function MeuNegocio() {
    const searchParams = useSearchParams(); 
    const [abaAtiva, setAbaAtiva] = useState("dados");

    // Quando a URL mudar, atualiza a aba ativa
    useEffect(() => {
        const aba = searchParams.get("aba");
        if (aba) {
            setAbaAtiva(aba);
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
        <div>
            <h1>Configurações do Negócio</h1>
            <p>Gerencie as informações que seus clientes vão ver na página de agendamento</p>

            {/* Abas */}
            <div>
                {abas.map((aba) => (
                    <button
                        key={aba.id}
                        onClick={() => setAbaAtiva(aba.id)}
                        style={{
                            fontWeight: abaAtiva === aba.id ? "bold" : "normal",
                            borderBottom: abaAtiva === aba.id ? "2px solid blue" : "none",
                            padding: "8px 16px",
                            cursor: "pointer"
                        }}
                    >
                        {aba.label}
                    </button>
                ))}
            </div>

            {/* Conteúdo das abas */}
            <div>
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