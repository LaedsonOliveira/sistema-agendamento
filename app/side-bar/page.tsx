"use client";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão Hamburguer - aparece apenas no mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-700 transition"
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
          fixed lg:relative z-50
          w-64 bg-gray-100 h-screen shadow-md
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          overflow-y-auto p-4
        `}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Menu</h3>

        <nav className="space-y-1">
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Serviços
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Funcionários
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded transition-colors"
          >
            Financeiro
          </a>
        </nav>
      </aside>
    </>
  );
}