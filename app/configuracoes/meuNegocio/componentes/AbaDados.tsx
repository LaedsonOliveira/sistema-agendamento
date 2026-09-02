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
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>
            Nome do Negócio *
            <input
              type="text"
              name="nome"
              value={dados.nome}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Telefone *
            <input
              type="tel"
              name="telefone"
              value={dados.telefone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            E-mail *
            <input
              type="email"
              name="email"
              value={dados.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            CNPJ
            <input
              type="text"
              name="cnpj"
              value={dados.cnpj}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Endereço
            <input
              type="text"
              name="endereco"
              value={dados.endereco}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Cidade
            <input
              type="text"
              name="cidade"
              value={dados.cidade}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Estado
            <input
              type="text"
              name="estado"
              value={dados.estado}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
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
            />
          </label>
        </div>
      </div>

      <div>
        <button type="submit">
          Salvar Alterações
        </button>
      </div>
    </form>
  );
}