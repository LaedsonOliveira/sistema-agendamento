// app/configuracoes/meu-negocio/components/AbaHorarios.tsx
"use client";

import { HorarioDia } from "../types";

interface Props {
  horarios: HorarioDia[];
  setHorarios: (horarios: HorarioDia[]) => void;
}

const diasSemana = [
  { id: "segunda", label: "Segunda" },
  { id: "terca", label: "Terça" },
  { id: "quarta", label: "Quarta" },
  { id: "quinta", label: "Quinta" },
  { id: "sexta", label: "Sexta" },
  { id: "sabado", label: "Sábado" },
  { id: "domingo", label: "Domingo" },
];

export default function AbaHorarios({ horarios, setHorarios }: Props) {
  const handleChange = (dia: string, field: keyof HorarioDia, value: any) => {
    setHorarios(
      horarios.map(h =>
        h.dia === dia ? { ...h, [field]: value } : h
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Horários salvos com sucesso! (Mock)");
    console.log(horarios);
  };

  return (
    <div>
      <div>
        <h2>Horários de Funcionamento</h2>
        <p>Defina os dias e horários que a barbearia funciona</p>
      </div>

      <form onSubmit={handleSubmit}>
        {diasSemana.map((dia) => {
          const horario = horarios.find(h => h.dia === dia.id);
          if (!horario) return null;

          return (
            <div key={dia.id}>
              <div>
                <div>
                  <input
                    type="checkbox"
                    checked={horario.ativo}
                    onChange={(e) => handleChange(dia.id, 'ativo', e.target.checked)}
                  />
                  <label>{dia.label}</label>
                </div>

                <div>
                  <span>Abre:</span>
                  <input
                    type="time"
                    value={horario.abertura || "09:00"}
                    onChange={(e) => handleChange(dia.id, 'abertura', e.target.value)}
                    disabled={!horario.ativo}
                  />
                  
                  <span>Fecha:</span>
                  <input
                    type="time"
                    value={horario.fechamento || "18:00"}
                    onChange={(e) => handleChange(dia.id, 'fechamento', e.target.value)}
                    disabled={!horario.ativo}
                  />

                  <div>
                    <span>Almoço:</span>
                    <input
                      type="time"
                      value={horario.almocoInicio || ""}
                      onChange={(e) => handleChange(dia.id, 'almocoInicio', e.target.value)}
                      disabled={!horario.ativo}
                    />
                    <span>às</span>
                    <input
                      type="time"
                      value={horario.almocoFim || ""}
                      onChange={(e) => handleChange(dia.id, 'almocoFim', e.target.value)}
                      disabled={!horario.ativo}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div>
          <button type="submit">
            Salvar Horários
          </button>
        </div>
      </form>
    </div>
  );
}