"use client";

import React, { useState, ChangeEvent } from 'react';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

const Perfil: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: 'Edyni Silva',
    email: 'edyni@email.com',
    telefone: '(81) 99999-9999',
    senha: '***********'
  });

  const [foto, setFoto] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFoto(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Dados salvos:', formData);
    alert('Perfil atualizado com sucesso!');
  };

  const handleAlterarSenha = () => {
    alert('Redirecionar para página de alteração de senha');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Cabeçalho */}
        <div className="profile-header">
          <h1>Meu Perfil</h1>
          <p>Gerencie seus dados pessoais e informações da conta.</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="profile-form">
          {/* Seção da Foto */}
          <div className="foto-section">
            <div className="foto-container">
              {foto ? (
                <img src={foto} alt="Foto de perfil" className="foto-perfil" />
              ) : (
                <div className="foto-placeholder">
                  <span className="foto-icon">👤</span>
                </div>
              )}
            </div>
            <div className="foto-actions">
              <label htmlFor="foto-input" className="btn-foto">
                Alterar foto
                <input
                  type="file"
                  id="foto-input"
                  accept="image/*"
                  onChange={handleFotoChange}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </div>

          {/* Campos do formulário */}
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              className="form-input"
              placeholder="(00) 00000-0000"
            />
          </div>

          {/* Seção da Senha */}
          <div className="senha-section">
            <div className="form-group senha-group">
              <label htmlFor="senha">Senha</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleInputChange}
                className="form-input"
                disabled
              />
            </div>
            <button
              type="button"
              onClick={handleAlterarSenha}
              className="btn-alterar-senha"
            >
              Alterar senha
            </button>
          </div>

          {/* Botão Salvar */}
          <div className="form-actions">
            <button type="submit" className="btn-salvar">
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Perfil;