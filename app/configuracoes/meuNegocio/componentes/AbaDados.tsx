"use client";

import { DadosNegocio } from "../types";

interface Props {
  dados: DadosNegocio;
  setDados: (dados: DadosNegocio) => void;
}

export default function AbaDados({ dados, setDados }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dados salvos com sucesso! (Mock)");
    console.log(dados);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2 sm:p-6">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-slate-700">
            Nome do Negócio *
            <input
              type="text"
              name="nome"
              value={dados.nome}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Telefone *
            <input
              type="tel"
              name="telefone"
              value={dados.telefone}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            E-mail *
            <input
              type="email"
              name="email"
              value={dados.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            CNPJ
            <input
              type="text"
              name="cnpj"
              value={dados.cnpj}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Endereço
            <input
              type="text"
              name="endereco"
              value={dados.endereco}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Cidade
            <input
              type="text"
              name="cidade"
              value={dados.cidade}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Estado
            <input
              type="text"
              name="estado"
              value={dados.estado}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            CEP
            <input
              type="text"
              name="cep"
              value={dados.cep}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Descrição
            <textarea
              name="descricao"
              value={dados.descricao}
              onChange={handleChange}
              rows={3}
              className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-200"
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2">
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}