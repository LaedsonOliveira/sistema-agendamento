"use client";

import { format, addDays, getDay, isSameDay, startOfToday } from "date-fns";

interface Props {
  dataSelecionada: Date | null;
  onSelect: (data: Date) => void;
  onNext: () => void;
  onBack: () => void;
  cores: { primary: string; secondary: string };
}

export default function EtapaData({
  dataSelecionada,
  onSelect,
  onNext,
  onBack,
  cores,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataSelecionada) onNext();
  };

  const diasDaSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const hoje = startOfToday();
  const dias = Array.from({ length: 7 }, (_, i) => addDays(hoje, i));

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Escolha a Data
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Selecione o dia para o agendamento
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {dias.map((dia) => {
            const isSelected = dataSelecionada && isSameDay(dia, dataSelecionada);
            const isToday = isSameDay(dia, hoje);
            const diaSemana = diasDaSemana[getDay(dia)];

            return (
              <button
                key={dia.toISOString()}
                type="button"
                onClick={() => onSelect(dia)}
                className={`flex min-w-0 flex-col items-center rounded-xl border-2 px-0.5 py-3 transition hover:shadow-md ${isSelected ? "text-white" : "border-slate-200 text-slate-700"
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
                  <span className="mt-1 text-[10px] font-medium uppercase text-slate-400">
                    Hoje
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded-lg border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={!dataSelecionada}
            className="flex-1 rounded-lg px-6 py-3 text-white font-medium transition hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: cores.secondary }}
          >
            Continuar →
          </button>
        </div>
      </form>
    </div>
  );
}