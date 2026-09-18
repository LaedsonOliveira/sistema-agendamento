"use client";

interface Servico {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  duracao: number;
}

interface Props {
  servicos: Servico[];
  selecionado: Servico | null;
  onSelect: (servico: Servico) => void;
  onNext: () => void;
  onBack: () => void;
  cores: { primary: string; secondary: string };
}

export default function EtapaServico({
  servicos,
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
        Escolha o Serviço
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Selecione o serviço que você deseja
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {servicos.map((servico) => (
          <button
            key={servico.id}
            type="button"
            onClick={() => onSelect(servico)}
            className={`flex w-full items-start justify-between gap-3 rounded-xl border-2 p-4 text-left transition hover:shadow-md ${selecionado?.id === servico.id ? "border-2" : "border-slate-200"
              }`}
            style={{
              borderColor:
                selecionado?.id === servico.id ? cores.secondary : undefined,
            }}
          >
            <div className="min-w-0">
              <span className="font-medium text-slate-900">{servico.nome}</span>
              {servico.descricao && (
                <p className="text-xs text-slate-500">{servico.descricao}</p>
              )}
              <div className="mt-1 flex gap-3 text-xs text-slate-500">
                <span>{servico.duracao} min</span>
              </div>
            </div>
            <span
              className="shrink-0 rounded-full px-3 py-1 text-sm font-bold text-white"
              style={{ backgroundColor: cores.secondary }}
            >
              R$ {servico.preco.toFixed(2)}
            </span>
          </button>
        ))}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
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
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
}