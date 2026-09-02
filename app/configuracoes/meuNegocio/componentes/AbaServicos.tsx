"use client";

import { useState } from "react";
import { Servico, Barbeiro } from "../types";

interface Props {
  servicos: Servico[];
  setServicos: (servicos: Servico[]) => void;
  barbeiros: Barbeiro[];
}

export default function AbaServicos({ servicos, setServicos, barbeiros }: Props) {
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<Servico | null>(null);
  const [form, setForm] = useState<Partial<Servico>>({
    nome: "",
    descricao: "",
    preco: 0,
    duracao: 30,
    barbeiros: [],
    ativo: true,
  });

  const handleOpenModal = (servico?: Servico) => {
    if (servico) {
      setEditando(servico);
      setForm(servico);
    } else {
      setEditando(null);
      setForm({ nome: "", descricao: "", preco: 0, duracao: 30, barbeiros: [], ativo: true });
    }
    setModalAberto(true);
  };

  const handleCloseModal = () => {
    setModalAberto(false);
    setEditando(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked :
        type === "number" ? Number(value) : value,
    });
  };

  const handleBarbeiroToggle = (barbeiroId: string) => {
    const current = form.barbeiros || [];
    const updated = current.includes(barbeiroId)
      ? current.filter(id => id !== barbeiroId)
      : [...current, barbeiroId];
    setForm({ ...form, barbeiros: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editando) {
      setServicos(servicos.map(s => s.id === editando.id ? { ...form, id: s.id } as Servico : s));
    } else {
      const novo: Servico = {
        id: Date.now().toString(),
        ...form as Omit<Servico, 'id'>,
      };
      setServicos([...servicos, novo]);
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      setServicos(servicos.filter(s => s.id !== id));
    }
  };

  const barbeirosAtivos = barbeiros.filter(b => b.ativo);

  return (
    <div>
      {/* Cabeçalho */}
      <div>
        <div>
          <h2>Serviços</h2>
          <p>Gerencie os serviços oferecidos pela barbearia</p>
        </div>
        <button onClick={() => handleOpenModal()}>
          + Novo Serviço
        </button>
      </div>

      {/* Lista de Serviços */}
      <div>
        {servicos.length === 0 ? (
          <p>Nenhum serviço cadastrado. Clique em "Novo Serviço" para começar.</p>
        ) : (
          servicos.map((servico) => (
            <div key={servico.id}>
              <div>
                <div>
                  <h3>{servico.nome}</h3>
                  <p>{servico.descricao}</p>
                  <div>
                    <span>R$ {servico.preco.toFixed(2)}</span>
                    <span>{servico.duracao} min</span>
                    {servico.barbeiros.map(id => {
                      const barbeiro = barbeiros.find(b => b.id === id);
                      return barbeiro ? (
                        <span key={id}>{barbeiro.nome}</span>
                      ) : null;
                    })}
                  </div>
                </div>
                <div>
                  <button onClick={() => handleOpenModal(servico)}>Editar</button>
                  <button onClick={() => handleDelete(servico.id)}>Excluir</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {modalAberto && (
        <div>
          <div>
            <div>
              <h2>{editando ? "Editar Serviço" : "Novo Serviço"}</h2>

              <form onSubmit={handleSubmit}>
                <div>
                  <label>
                    Nome do Serviço *
                    <input
                      type="text"
                      name="nome"
                      value={form.nome || ""}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div>
                  <label>
                    Descrição
                    <textarea
                      name="descricao"
                      value={form.descricao || ""}
                      onChange={handleChange}
                      rows={2}
                    />
                  </label>
                </div>

                <div>
                  <div>
                    <label>
                      Preço (R$) *
                      <input
                        type="number"
                        name="preco"
                        value={form.preco || 0}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        required
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Duração (min) *
                      <input
                        type="number"
                        name="duracao"
                        value={form.duracao || 30}
                        onChange={handleChange}
                        min="5"
                        step="5"
                        required
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label>Barbeiros que fazem este serviço</label>
                  <div>
                    {barbeirosAtivos.length === 0 ? (
                      <p>Nenhum barbeiro ativo. Cadastre barbeiros primeiro.</p>
                    ) : (
                      barbeirosAtivos.map((barbeiro) => (
                        <label key={barbeiro.id}>
                          <input
                            type="checkbox"
                            checked={form.barbeiros?.includes(barbeiro.id) || false}
                            onChange={() => handleBarbeiroToggle(barbeiro.id)}
                          />
                          {barbeiro.nome}
                        </label>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="ativo"
                      checked={form.ativo !== false}
                      onChange={handleChange}
                    />
                    Serviço ativo (visível para clientes)
                  </label>
                </div>

                <div>
                  <button type="button" onClick={handleCloseModal}>
                    Cancelar
                  </button>
                  <button type="submit">
                    {editando ? "Atualizar" : "Adicionar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}