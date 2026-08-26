import Calendar from "./components/calendario/page";
import FormAgendamento from "./components/form-agendamento/page";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8 flex flex-col items-center justify-center">
      {/* Container compacto centralizado */}
      <section className="w-full max-w-md flex flex-col gap-4">
        <Calendar
          events={[
            { title: "viajar", date: "2026-08-24" },
            { title: "viajar1", date: "2026-08-24" },
            { title: "viajar2", date: "2026-08-24" },
            { title: "viajar3", date: "2026-08-24" },
          ]}
        />

        <FormAgendamento />
      </section>
    </main>
  );
}