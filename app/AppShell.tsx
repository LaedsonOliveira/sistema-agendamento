"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./side-bar/page";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAgendamentoRoute = pathname.startsWith("/agendar");

    return (
        <div className="min-h-screen bg-slate-50 lg:flex">
            {!isAgendamentoRoute && <Sidebar />}

            <main
                className={`min-h-screen min-w-0 flex-1 ${
                    isAgendamentoRoute
                        ? "px-0 py-0" // ← Página de agendamento: sem padding extra
                        : "px-3 pb-8 pt-20 sm:px-5 sm:pb-10 sm:pt-8 lg:px-8"
                } ${!isAgendamentoRoute ? "lg:ml-64" : ""}`}
            >
                <div className={isAgendamentoRoute ? "w-full" : "mx-auto w-full max-w-7xl"}>
                    {children}
                </div>
            </main>
        </div>
    );
}