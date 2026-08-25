import Image from "next/image";
import Calendar from "./components/calendario/page";


export default function Home() {
  return (
    <main>
      <section className="w-100 h-100">
        <Calendar
          events={[
            { title: "viajar", date: "2026-08-24" },
            { title: "viajar1", date: "2026-08-24" },
            { title: "viajar2", date: "2026-08-24" },
            { title: "viajar3", date: "2026-08-24" }
          ]}
        />
      </section>

    </main>
  );
}
