// types/agenda.ts

export type StatusAgendamento = "Pendente" | "Pago" | "Cancelado" | "Finalizado";

export interface Agendamento {
  id: string;
  data: string; // ISO string
  horario: string; // "09:00"
  clienteNome: string;
  clienteFone: string;
  servicoNome: string;
  profissionalId: string;
  profissionalNome: string;
  valor: number;
  status: StatusAgendamento;
}

export interface Profissional {
  id: string;
  nome: string;
}