import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Gestão para barbearias
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Sistema de Agendamento
        </h1>
        <p className="mt-4 text-base text-slate-600">
          Gerencie sua barbearia de forma simples
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/agendar/teste"
            className="rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
          >
            Agendar Horário
          </Link>
        </div>
      </section>
    </main>
  );
}