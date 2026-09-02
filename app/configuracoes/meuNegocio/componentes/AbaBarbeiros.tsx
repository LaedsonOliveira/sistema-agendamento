"use client";

import { useState } from "react";
import { Barbeiro } from "../types";

interface Props {
  barbeiros: Barbeiro[];
  setBarbeiros: (barbeiros: Barbeiro[]) => void;
}

export default function AbaBarbeiros({ barbeiros, setBarbeiros }: Props) {
  const [modalAberto, setModalAberto] = useState(false);
  const [editando, setEditando] = useState<Barbeiro | null>(null);
  const [form, setForm] = useState<Partial<Barbeiro>>({
    nome: "",
    telefone: "",
    email: "",
    foto: null,
    ativo: true,
  });

  const handleOpenModal = (barbeiro?: Barbeiro) => {
    if (barbeiro) {
      setEditando(barbeiro);
      setForm(barbeiro);
    } else {
      setEditando(null);
      setForm({ nome: "", telefone: "", email: "", foto: null, ativo: true });
    }
    setModalAberto(true);
  };

  const handleCloseModal = () => {
    setModalAberto(false);
    setEditando(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editando) {
      setBarbeiros(barbeiros.map(b => b.id === editando.id ? { ...form, id: b.id } as Barbeiro : b));
    } else {
      const novo: Barbeiro = {
        id: Date.now().toString(),
        ...form as Omit<Barbeiro, 'id'>,
      };
      setBarbeiros([...barbeiros, novo]);
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este barbeiro?")) {
      setBarbeiros(barbeiros.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>Barbeiros</h2>
          <p>Gerencie os profissionais da barbearia</p>
        </div>
        <button onClick={() => handleOpenModal()}>
          + Novo Barbeiro
        </button>
      </div>

      <div>
        {barbeiros.length === 0 ? (
          <p>Nenhum barbeiro cadastrado.</p>
        ) : (
          barbeiros.map((barbeiro) => (
            <div key={barbeiro.id}>
              <div>
                <div>
                  <div>
                    {barbeiro.foto ? (
                      <img src={barbeiro.foto} alt={barbeiro.nome} />
                    ) : (
                      <span>Sem foto</span>
                    )}
                  </div>
                  <h3>{barbeiro.nome}</h3>
                  <p>{barbeiro.telefone}</p>
                  <p>{barbeiro.email}</p>
                  <span>
                    {barbeiro.ativo ? "Ativo" : "Inativo"}
                  </span>
                </div>
                <div>
                  <button onClick={() => handleOpenModal(barbeiro)}>Editar</button>
                  <button onClick={() => handleDelete(barbeiro.id)}>Excluir</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {modalAberto && (
        <div>
          <div>
            <div>
              <h2>{editando ? "Editar Barbeiro" : "Novo Barbeiro"}</h2>

              <form onSubmit={handleSubmit}>
                <div>
                  <label>
                    Nome Completo *
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
                    Telefone *
                    <input
                      type="tel"
                      name="telefone"
                      value={form.telefone || ""}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div>
                  <label>
                    E-mail
                    <input
                      type="email"
                      name="email"
                      value={form.email || ""}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="ativo"
                      checked={form.ativo !== false}
                      onChange={handleChange}
                    />
                    Barbeiro ativo
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