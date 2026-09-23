"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icone from "../componentes/Icones";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [configuracoesAberto, setConfiguracoesAberto] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M4 13.5h7V20H4v-6.5Zm9-9h7v7h-7V4.5Zm0 10.5h7V20h-7v-4.5ZM4 4.5h7v6.5H4V4.5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      href: "/financeiro",
      label: "Financeiro",
      active: pathname === "/financeiro",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
          <path d="M3.5 18.5h17M6 15.5V9.5m6 6V5.5m6 10V12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        className="fixed left-4 top-4 z-50 rounded-xl bg-slate-900 p-2.5 text-white shadow-lg transition hover:bg-slate-800 lg:hidden"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto border-r border-slate-200 bg-slate-100/95 p-4 shadow-xl backdrop-blur-sm transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="mb-5 flex items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-sm font-semibold text-white">
            <Icone tipo="tesoura" className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Sistema</p>
            <h3 className="text-sm font-semibold text-slate-800">Agenda</h3>
          </div>
        </div>

        <nav className="space-y-1.5">
          {navItems.map(({ href, label, active, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-700 hover:bg-slate-200 hover:text-slate-950"
                }`}
            >
              <span className={active ? "text-white" : "text-slate-500"}>{icon}</span>
              {label}
            </Link>
          ))}

          <button
            onClick={() => setConfiguracoesAberto(!configuracoesAberto)}
            className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${configuracoesAberto
              ? "bg-slate-200 text-slate-950"
              : "text-slate-700 hover:bg-slate-200 hover:text-slate-950"
              }`}
          >
            <span className="flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                <path d="M10.5 3.5h3l.7 2.3a7.1 7.1 0 0 1 2.4 1.4l2.2-.9 1.5 2.6-1.6 1.9c.2.7.3 1.4.3 2.2s-.1 1.5-.3 2.2l1.6 1.9-1.5 2.6-2.2-.9a7.1 7.1 0 0 1-2.4 1.4l-.7 2.3h-3l-.7-2.3a7.1 7.1 0 0 1-2.4-1.4l-2.2.9-1.5-2.6 1.6-1.9a7.1 7.1 0 0 1-.3-2.2c0-.8.1-1.5.3-2.2L3.7 9.9l1.5-2.6 2.2.9a7.1 7.1 0 0 1 2.4-1.4l.7-2.3Z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Configurações
            </span>

            <span className="text-[10px] text-slate-500" aria-hidden="true">
              {configuracoesAberto ? "▲" : "▼"}
            </span>
          </button>

          {configuracoesAberto && (
            <div className="ml-3 mt-1 space-y-1 border-l border-slate-300 pl-2">
              <Link
                href="/configuracoes/perfil"
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${pathname === "/configuracoes/perfil"
                  ? "bg-slate-900 font-medium text-white"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                  }`}
              >
                Perfil
              </Link>

              <Link
                href="/configuracoes/meuNegocio"
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${pathname === "/configuracoes/meuNegocio"
                  ? "bg-slate-900 font-medium text-white"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                  }`}
              >
                Meu Negócio
              </Link>
            </div>
          )}
        </nav>
      </aside>
    </div>
  );
}
