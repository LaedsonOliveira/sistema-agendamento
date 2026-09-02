"use client";

import { useState, useRef } from "react";
import { Personalizacao } from "../types";

interface Props {
  personalizacao: Personalizacao;
  setPersonalizacao: (personalizacao: Personalizacao) => void;
}

export default function AbaPersonalizacao({ personalizacao, setPersonalizacao }: Props) {
  const [previewLogo, setPreviewLogo] = useState<string | null>(personalizacao.logo || null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(personalizacao.banner || null);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalizacao({ ...personalizacao, [name]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewLogo(result);
        setPersonalizacao({ ...personalizacao, logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewBanner(result);
        setPersonalizacao({ ...personalizacao, banner: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removerLogo = () => {
    setPreviewLogo(null);
    setPersonalizacao({ ...personalizacao, logo: null });
    if (logoInputRef.current) logoInputRef.current.value = "";
  };

  const removerBanner = () => {
    setPreviewBanner(null);
    setPersonalizacao({ ...personalizacao, banner: null });
    if (bannerInputRef.current) bannerInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Personalização salva com sucesso! (Mock)");
    console.log(personalizacao);
  };

  return (
    <div>
      <div>
        <h2>Personalização</h2>
        <p>Personalize a aparência da página pública de agendamento</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Preview */}
        <div>
          <h3>Preview da Página do Cliente</h3>
          <div>
            {previewBanner && (
              <div />
            )}

            <div>
              {previewLogo ? (
                <img src={previewLogo} alt="Logo" />
              ) : (
                <div>Sem logo</div>
              )}

              <h3>{personalizacao.nomeNegocio || "Sua Barbearia"}</h3>

              <p>{personalizacao.mensagemBoasVindas || "Bem-vindo! Agende seu horário."}</p>

              <div>
                <span>Corte</span>
                <span>Barba</span>
                <span>Combo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Uploads */}
        <div>
          <div>
            <label>Logo da Barbearia</label>
            <div>
              <div>
                {previewLogo ? (
                  <img src={previewLogo} alt="Logo" />
                ) : (
                  <span>Sem logo</span>
                )}
              </div>

              <div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  id="logo-upload"
                />
                <label htmlFor="logo-upload">
                  Upload Logo
                </label>
                {previewLogo && (
                  <button type="button" onClick={removerLogo}>
                    Remover
                  </button>
                )}
                <p>Formatos: PNG, JPG, SVG</p>
              </div>
            </div>
          </div>

          <div>
            <label>Banner de Fundo</label>
            <div>
              <div>
                {!previewBanner && <span>Sem banner</span>}
              </div>

              <div>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  id="banner-upload"
                />
                <label htmlFor="banner-upload">
                  Upload Banner
                </label>
                {previewBanner && (
                  <button type="button" onClick={removerBanner}>
                    Remover
                  </button>
                )}
                <p>Recomendado: 1200x400px</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cores */}
        <div>
          <div>
            <label>Cor Principal</label>
            <div>
              <input
                type="color"
                name="corPrimaria"
                value={personalizacao.corPrimaria || "#1a1a2e"}
                onChange={handleChange}
              />
              <input
                type="text"
                name="corPrimaria"
                value={personalizacao.corPrimaria || ""}
                onChange={handleChange}
                placeholder="#1a1a2e"
              />
            </div>
          </div>

          <div>
            <label>Cor Secundária</label>
            <div>
              <input
                type="color"
                name="corSecundaria"
                value={personalizacao.corSecundaria || "#e94560"}
                onChange={handleChange}
              />
              <input
                type="text"
                name="corSecundaria"
                value={personalizacao.corSecundaria || ""}
                onChange={handleChange}
                placeholder="#e94560"
              />
            </div>
          </div>
        </div>

        {/* Mensagem */}
        <div>
          <label>Mensagem de Boas-vindas</label>
          <textarea
            name="mensagemBoasVindas"
            value={personalizacao.mensagemBoasVindas || ""}
            onChange={handleChange}
            rows={3}
            placeholder="Escreva uma mensagem de boas-vindas para seus clientes..."
          />
        </div>

        {/* Redes Sociais */}
        <div>
          <div>
            <label>Nome do Negócio</label>
            <input
              type="text"
              name="nomeNegocio"
              value={personalizacao.nomeNegocio || ""}
              onChange={handleChange}
              placeholder="Ex: Barbearia do Edyni"
            />
          </div>

          <div>
            <label>Instagram</label>
            <input
              type="text"
              name="instagram"
              value={personalizacao.instagram || ""}
              onChange={handleChange}
              placeholder="@barbeariaedyni"
            />
          </div>
          <div>
            <label>WhatsApp</label>
            <input
              type="text"
              name="whatsapp"
              value={personalizacao.whatsapp || ""}
              onChange={handleChange}
              placeholder="(81) 99999-9999"
            />
          </div>
        </div>

        {/* Botão Salvar */}
        <div>
          <button type="submit">
            Salvar Personalização
          </button>
        </div>
      </form>
    </div>
  );
}