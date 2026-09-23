"use client";

import { useState } from "react";
import { format } from "date-fns";
import Icone from "@/app/componentes/Icones";
import { Despesa, CategoriaDespesa, CATEGORIAS_DESPESA } from "../types/Financeiro";

interface Props {
    onSalvar: (despesa: Despesa) => void;
    onFechar: () => void;
}

export default function ModalNovaDespesa({ onSalvar, onFechar }: Props) {
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState<CategoriaDespesa>("Outros");
    const [valor, setValor] = useState("");
    const [data, setData] = useState(format(new Date(), "yyyy-MM-dd"));
    const [erro, setErro] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");

        if (!descricao.trim()) {
            setErro("A descrição é obrigatória");
            return;
        }

        const valorNumerico = parseFloat(valor.replace(",", "."));
        if (!valor || isNaN(valorNumerico) || valorNumerico <= 0) {
            setErro("Informe um valor válido maior que zero");
            return;
        }

        const novaDespesa: Despesa = {
            id: Date.now().toString(),
            data: new Date(data + "T12:00:00").toISOString(),
            descricao: descricao.trim(),
            categoria,
            valor: valorNumerico,
        };

        onSalvar(novaDespesa);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-950">Nova Despesa</h2>
                    <button
                        onClick={onFechar}
                        className="text-slate-400 transition hover:text-slate-700"
                    >
                        <Icone tipo="fechar" className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Descrição *
                        </label>
                        <input
                            type="text"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            placeholder="Ex: Compra de shampoo"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Categoria *
                        </label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value as CategoriaDespesa)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                        >
                            {CATEGORIAS_DESPESA.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Valor (R$) *
                        </label>
                        <input
                            type="text"
                            value={valor}
                            onChange={(e) => setValor(e.target.value)}
                            placeholder="0,00"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Data *
                        </label>
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
                            required
                        />
                    </div>

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
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}