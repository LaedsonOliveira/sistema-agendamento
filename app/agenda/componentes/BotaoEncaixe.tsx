// components/agenda/BotaoEncaixe.tsx
"use client";

import Icone from "@/app/componentes/Icones";

interface Props {
  onClick: () => void;
}

export default function BotaoEncaixe({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2"
    >
      <Icone tipo="encaixe" className="h-4 w-4" />
      Encaixe
    </button>
  );
}