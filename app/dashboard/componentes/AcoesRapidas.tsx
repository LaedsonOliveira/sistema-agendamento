// components/dashboard/AcoesRapidas.tsx
"use client";

import Link from "next/link";

export default function AcoesRapidas() {
  const acoes = [
    {
      href: "/agendar/teste",
      label: "Novo Agendamento",
      descricao: "Criar um novo agendamento",
    },
    {
      href: "/agenda",
      label: "Ver Agenda",
      descricao: "Ver todos os agendamentos",
    },
    {
      href: "/financeiro",
      label: "Ver Financeiro",
      descricao: "Ver relatório financeiro",
    },
    {
      href: "/configuracoes/meuNegocio",
      label: "Configurações",
      descricao: "Configurar o negócio",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-950">
        Ações Rápidas
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {acoes.map((acao) => (
          <Link
            key={acao.href}
            href={acao.href}
            className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:border-slate-950 hover:bg-white hover:shadow-md"
          >
            <span className="text-sm font-medium text-slate-900">
              {acao.label}
            </span>
            <span className="mt-1 text-xs text-slate-500">
              {acao.descricao}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}