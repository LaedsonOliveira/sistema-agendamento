import FormAgendamento from "./components/form-agendamento/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8 flex flex-col items-center justify-center">
      {/* Container compacto centralizado */}
      <section className="w-full max-w-md flex flex-col gap-4">

        <FormAgendamento />
      </section>
    </main>
  );
}