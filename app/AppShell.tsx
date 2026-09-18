"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./side-bar/page";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAgendamentoRoute = pathname.startsWith("/agendar");

    return (
        <div className="min-h-screen lg:flex">
            {!isAgendamentoRoute && <Sidebar />}

            <main
                className={`min-h-screen min-w-0 flex-1 px-4 pb-8 pt-20 sm:px-6 sm:pt-8 lg:px-8 ${!isAgendamentoRoute ? "lg:ml-64" : ""
                    }`}
            >
                {children}
            </main>
        </div>
    );
}
