"use client";

interface Profissional {
    id: string;
    nome: string;
}

interface Props {
    profissionais: Profissional[];
    selecionado: Profissional | null;
    onSelect: (profissional: Profissional) => void;
    onNext: () => void;
    cores: { primary: string; secondary: string };
}

export default function EtapaBarbeiro({
    profissionais,
    selecionado,
    onSelect,
    onNext,
    cores,
}: Props) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selecionado) onNext();
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">
                Escolha o Profissional
            </h2>
            <p className="text-sm text-slate-500 mb-6">
                Selecione o barbeiro que você prefere
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                    {profissionais.map((profissional) => (
                        <button
                            key={profissional.id}
                            type="button"
                            onClick={() => onSelect(profissional)}
                            className={`rounded-xl border-2 p-4 text-center transition hover:shadow-md ${selecionado?.id === profissional.id
                                ? "border-2"
                                : "border-slate-200"
                                }`}
                            style={{
                                borderColor:
                                    selecionado?.id === profissional.id
                                        ? cores.secondary
                                        : undefined,
                            }}
                        >
                            <div className="text-3xl mb-1">{profissional.nome.charAt(0)}</div>
                            <span className="text-sm font-medium text-slate-900">
                                {profissional.nome}
                            </span>
                        </button>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!selecionado}
                    className="mt-4 w-full rounded-lg px-6 py-3 text-white font-medium transition hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: cores.secondary }}
                >
                    Continuar
                </button>
            </form>
        </div>
    );
}