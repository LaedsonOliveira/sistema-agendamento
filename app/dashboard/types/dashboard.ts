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