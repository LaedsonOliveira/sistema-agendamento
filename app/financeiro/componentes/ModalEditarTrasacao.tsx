"use client";

import { useState } from "react";
import Icone from "@/app/componentes/Icones";
import { Transacao, StatusTransacao } from "../types/Financeiro";

interface Props {
  transacao: Transacao;
  onSalvar: (transacao: Transacao) => void;
  onFechar: () => void;
}

export default function ModalEditarTransacao({
  transacao,
  onSalvar,
  onFechar,
}: Props) {
  const [valor, setValor] = useState(transacao.valor.toString());
  const [status, setStatus] = useState<StatusTransacao>(transacao.status);
  const [formaPagamento, setFormaPagamento] = useState(
    transacao.formaPagamento || ""
  );
  const [erro, setErro] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const valorNumerico = parseFloat(valor.replace(",", "."));
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setErro("Informe um valor válido maior que zero");
      return;
    }

    const transacaoAtualizada: Transacao = {
      ...transacao,
      valor: valorNumerico,
      status,
      formaPagamento: status === "Pago" ? formaPagamento || "Não informado" : undefined,
    };

    onSalvar(transacaoAtualizada);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-950">
            Editar Transação
          </h2>
          <button
            onClick={onFechar}
            className="text-slate-400 transition hover:text-slate-700"
          >
            <Icone tipo="fechar" className="h-5 w-5" />
          </button>
        </div>

        {/* INFORMAÇÕES DO CLIENTE */}
        <div className="mb-4 rounded-lg bg-slate-50 p-3">
          <p className="text-sm font-medium text-slate-900">
            {transacao.clienteNome}
          </p>
          <p className="text-xs text-slate-500">
            {transacao.servicoNome} · {transacao.profissionalNome}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Valor (R$) *
            </label>
            <input
              type="text"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusTransacao)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            >
              <option value="Pendente">Pendente</option>
              <option value="Pago">Pago</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          {status === "Pago" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Forma de Pagamento
              </label>
              <select
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
              >
                <option value="">Selecione...</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
                <option value="Cartão">Cartão</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
          )}

          {erro && <p className="text-sm text-red-600">{erro}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onFechar}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}