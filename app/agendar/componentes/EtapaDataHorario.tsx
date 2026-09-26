"use client";

import { useState } from "react";
import {
  format,
  addDays,
  getDay,
  isSameDay,
  startOfToday,
  subDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import Icone from "@/app/componentes/Icones";

interface Props {
  dataSelecionada: Date | null;
  onSelectData: (data: Date) => void;
  horarioSelecionado: string | null;
  onSelectHorario: (horario: string) => void;
  horarios: string[];
  onNext: () => void;
  onBack: () => void;
  cores: { primary: string; secondary: string };
}

export default function EtapaDataHorario({
  dataSelecionada,
  onSelectData,
  horarioSelecionado,
  onSelectHorario,
  horarios,
  onNext,
  onBack,
  cores,
}: Props) {
  const [janelaInicio, setJanelaInicio] = useState(() => startOfToday());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataSelecionada && horarioSelecionado) onNext();
  };

  const handleSelecionarData = (dia: Date) => {
    onSelectData(dia);
    if (!dataSelecionada || !isSameDay(dia, dataSelecionada)) {
      onSelectHorario("");
    }
  };

  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hoje = startOfToday();
  const dias = Array.from({ length: 7 }, (_, i) => addDays(janelaInicio, i));
  const fimDaJanela = addDays(janelaInicio, 6);
  const podeVoltar = janelaInicio > hoje;

  const podeContinuar = dataSelecionada && horarioSelecionado;

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Escolha Data e Horário
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Selecione o dia e depois o horário disponível
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ========================
            SEÇÃO 1: DATA
        ======================== */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            1. Escolha a data
          </label>

          {/* NAVEGAÇÃO DE SEMANA */}
          <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-2 shadow-sm">
            <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-2">
              <button
                type="button"
                onClick={() => setJanelaInicio((prev) => subDays(prev, 7))}
                disabled={!podeVoltar}
                aria-label="Ver período anterior"
                className="flex aspect-square items-center justify-center rounded-xl border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span aria-hidden="true">←</span>
              </button>

              <div className="flex min-w-0 flex-col items-center gap-1">
                <span className="text-center text-xs font-semibold text-slate-700 sm:text-sm">
                  {format(janelaInicio, "dd/MM")} - {format(fimDaJanela, "dd/MM")}
                </span>
                <button
                  type="button"
                  onClick={() => setJanelaInicio(startOfToday())}
                  className="rounded-lg bg-slate-950 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Hoje
                </button>
              </div>

              <button
                type="button"
                onClick={() => setJanelaInicio((prev) => addDays(prev, 7))}
                aria-label="Ver próximo período"
                className="flex aspect-square items-center justify-center rounded-xl border border-slate-300 bg-white text-lg font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* GRID DE DIAS */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {dias.map((dia) => {
              const isSelected =
                dataSelecionada && isSameDay(dia, dataSelecionada);
              const isToday = isSameDay(dia, hoje);
              const diaSemana = diasDaSemana[getDay(dia)];

              return (
                <button
                  key={dia.toISOString()}
                  type="button"
                  onClick={() => handleSelecionarData(dia)}
                  className={`flex min-w-0 flex-col items-center rounded-xl border-2 px-0.5 py-3 transition hover:shadow-md ${
                    isSelected
                      ? "text-white"
                      : "border-slate-200 text-slate-700"
                  }`}
                  style={{
                    backgroundColor: isSelected ? cores.secondary : undefined,
                    borderColor: isSelected ? cores.secondary : undefined,
                  }}
                >
                  <span className="text-xs font-medium uppercase">
                    {diaSemana}
                  </span>
                  <span className="mt-1 text-base font-bold sm:text-lg">
                    {format(dia, "dd")}
                  </span>
                  {isToday && (
                    <span
                      className={`mt-1 text-[10px] font-medium uppercase ${
                        isSelected ? "text-white/80" : "text-slate-400"
                      }`}
                    >
                      Hoje
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================
            SEÇÃO 2: HORÁRIO
        ======================== */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            2. Escolha o horário
          </label>

          {!dataSelecionada ? (
            <div className="rounded-lg bg-slate-50 p-6 text-center ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">
                Selecione uma data para ver os horários disponíveis
              </p>
            </div>
          ) : horarios.length === 0 ? (
            <div className="rounded-lg bg-slate-50 p-6 text-center ring-1 ring-slate-200">
              <p className="text-sm text-slate-500">
                Nenhum horário disponível para este dia
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {horarios.map((horario) => (
                <button
                  key={horario}
                  type="button"
                  onClick={() => onSelectHorario(horario)}
                  className={`rounded-lg border-2 py-3 text-center transition hover:shadow-md ${
                    horarioSelecionado === horario
                      ? "text-white"
                      : "border-slate-200 text-slate-700"
                  }`}
                  style={{
                    backgroundColor:
                      horarioSelecionado === horario
                        ? cores.secondary
                        : undefined,
                    borderColor:
                      horarioSelecionado === horario
                        ? cores.secondary
                        : undefined,
                  }}
                >
                  <span className="text-sm font-medium">{horario}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================
            RESUMO DA ESCOLHA (sem emoji)
        ======================== */}
        {dataSelecionada && horarioSelecionado && (
          <div
            className="flex flex-col gap-2 rounded-xl p-4 ring-1"
            style={{
              backgroundColor: `${cores.secondary}10`,
              borderColor: cores.secondary,
            }}
          >
            <div className="flex items-center gap-2">
              <Icone
                tipo="calendario"
                className="h-4 w-4"
                style={{ color: cores.secondary }}
              />
              <span className="text-sm font-semibold text-slate-700">
                {format(dataSelecionada, "EEEE, dd 'de' MMMM", {
                  locale: ptBR,
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Icone
                tipo="relogio"
                className="h-4 w-4"
                style={{ color: cores.secondary }}
              />
              <span className="text-sm text-slate-600">
                Horário:{" "}
                <span className="font-bold">{horarioSelecionado}</span>
              </span>
            </div>
          </div>
        )}

        {/* BOTÕES */}
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!podeContinuar}
            className="flex-1 rounded-lg px-6 py-3 text-white font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ backgroundColor: cores.secondary }}
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}