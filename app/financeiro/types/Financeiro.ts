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