"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [configuracoesAberto, setConfiguracoesAberto] = useState(false);
  const pathname = usePathname();

  return (
    <div>
      {/* Botão Hamburguer - aparece apenas no mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        className="fixed left-4 top-4 z-50 rounded-lg bg-gray-800 p-2 text-white shadow-lg transition hover:bg-gray-700 lg:hidden"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay (fundo escuro) - aparece apenas quando sidebar está aberta no mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto bg-gray-100 p-4 shadow-md
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Menu</h3>

        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Dashboard
          </Link>

          <Link
            href="/financeiro"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Financeiro
          </Link>
          <button
            onClick={() => setConfiguracoesAberto(!configuracoesAberto)}
            className={`flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${configuracoesAberto
              ? "bg-slate-200 text-slate-950"
              : "text-slate-700 hover:bg-slate-200 hover:text-slate-950"
              }`}
          >
            <span>Configurações</span>

            <span className="text-xs text-slate-500" aria-hidden="true">
              {configuracoesAberto ? "▲" : "▼"}
            </span>
          </button>

          {/* Submenu */}
          {configuracoesAberto && (
            <div className="ml-3 mt-1 space-y-1 border-l border-slate-300 pl-2">

              <Link
                href="/configuracoes/perfil"
                className={`block rounded-lg px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${pathname === "/configuracoes/perfil"
                  ? "bg-slate-950 font-medium text-white"
                  : "text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                  }`}
              >
                Perfil
              </Link>

              <Link
                href="/configuracoes/meuNegocio"
                className={`block rounded-lg px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 ${pathname === "/configuracoes/meuNegocio"
                  ? "bg-slate-950 font-medium text-white"
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
