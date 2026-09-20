// components/dashboard/AcoesRapidas.tsx
"use client";

import Link from "next/link";

export default function AcoesRapidas() {
  const acoes = [
    {
      href: "/agendar/teste",
      label: "Novo Agendamento",
      descricao: "Criar um novo agendamento",
      icone: "＋",
    },
    {
      href: "/agenda",
      label: "Ver Agenda",
      descricao: "Ver todos os agendamentos",
      icone: "📅",
    },
    {
      href: "/financeiro",
      label: "Ver Financeiro",
      descricao: "Ver relatório financeiro",
      icone: "💰",
    },
    {
      href: "/configuracoes/meuNegocio",
      label: "Configurações",
      descricao: "Configurar o negócio",
      icone: "⚙️",
    },
  ];

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="mb-4 text-lg font-semibold text-slate-950">
        Ações Rápidas
      </h2>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {acoes.map((acao) => (
          <Link
            key={acao.href}
            href={acao.href}
            className="flex min-h-[104px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-3 text-center transition hover:border-slate-950 hover:bg-white hover:shadow-md"
          >
            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg shadow-sm">
              {acao.icone}
            </span>
            <span className="text-sm font-medium text-slate-900">
              {acao.label}
            </span>
            <span className="mt-1 text-[11px] leading-4 text-slate-500 sm:text-xs">
              {acao.descricao}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}