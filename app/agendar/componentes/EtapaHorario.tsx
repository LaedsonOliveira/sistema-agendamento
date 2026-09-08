"use client";

interface Props {
  horarios: string[];
  selecionado: string | null;
  onSelect: (horario: string) => void;
  onNext: () => void;
  onBack: () => void;
  cores: { primary: string; secondary: string };
}

export default function EtapaHorario({
  horarios,
  selecionado,
  onSelect,
  onNext,
  onBack,
  cores,
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selecionado) onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Escolha o Horário
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Selecione o horário disponível
      </p>

      <form onSubmit={handleSubmit}>
        {horarios.length === 0 ? (
          <div className="rounded-lg bg-slate-50 p-8 text-center">
            <p className="text-slate-500">
              Nenhum horário disponível para este dia
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Voltar e escolher outra data
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {horarios.map((horario) => (
              <button
                key={horario}
                type="button"
                onClick={() => onSelect(horario)}
                className={`rounded-lg border-2 py-3 text-center transition hover:shadow-md ${selecionado === horario
                    ? "text-white"
                    : "border-slate-200 text-slate-700"
                  }`}
                style={{
                  backgroundColor:
                    selecionado === horario ? cores.secondary : undefined,
                  borderColor:
                    selecionado === horario ? cores.secondary : undefined,
                }}
              >
                <span className="text-sm font-medium">{horario}</span>
              </button>
            ))}
          </div>
        )}

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
            disabled={!selecionado}
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