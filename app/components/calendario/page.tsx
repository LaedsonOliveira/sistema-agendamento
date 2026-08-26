"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core/index.js";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

interface EventItem {
    title: string;
    date: string;
}

export default function Calendar({ events = [] }: { events?: EventItem[] }) {
    const handleDateClick = (info: DateClickArg) => {
        console.log("Data:", info.dateStr);
    };

    return (
        <div
            className="
            bg-white p-3 rounded-2xl shadow-sm border border-slate-200 w-full text-xs
            [--fc-border-color:#f1f5f9]
            [--fc-today-bg-color:#ecfdf5]

            /* 1. Trava qualquer overflow ou barra de rolagem interna */
            [&_.fc-scroller]:!overflow-hidden !important
            [&_.fc-scroller-liquid-absolute]:!overflow-hidden !important
            [&_.fc-scrollgrid-sync-table]:!h-auto

            /* Cabeçalho Compacto */
            [&_.fc-toolbar-title]:!text-sm [&_.fc-toolbar-title]:!font-bold [&_.fc-toolbar-title]:!text-emerald-800 [&_.fc-toolbar-title]:capitalize
            
            /* Botões */
            [&_.fc-button-primary]:!bg-white [&_.fc-button-primary]:!text-emerald-700 [&_.fc-button-primary]:!border-slate-200 [&_.fc-button-primary]:!text-[11px] [&_.fc-button-primary]:!py-0.5 [&_.fc-button-primary]:!px-2 [&_.fc-button-primary]:!rounded-md hover:[&_.fc-button-primary]:!bg-emerald-50
            
            /* Cabeçalho dos dias */
            [&_.fc-col-header-cell]:!py-0.5
            [&_.fc-col-header-cell-cushion]:!text-[10px] [&_.fc-col-header-cell-cushion]:!font-semibold [&_.fc-col-header-cell-cushion]:!text-slate-400 [&_.fc-col-header-cell-cushion]:!no-underline
            
            /* Células e Números */
            [&_.fc-daygrid-day-number]:!text-[10px] [&_.fc-daygrid-day-number]:!p-0.5 [&_.fc-daygrid-day-number]:!text-slate-600 [&_.fc-daygrid-day-number]:!no-underline
            [&_.fc-day-today_.fc-daygrid-day-number]:!font-bold [&_.fc-day-today_.fc-daygrid-day-number]:!text-emerald-600
            
            /* Borda externa */
            [&_.fc-scrollgrid]:!rounded-xl [&_.fc-scrollgrid]:overflow-hidden "
        >
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale={ptBrLocale}
                events={events}
                dateClick={handleDateClick}
                eventContent={renderEventContent}

                height="auto"
                contentHeight="auto"

                dayMaxEvents={2}

                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "today",
                }}
                buttonText={{ today: "Hoje" }}
            />
        </div>
    );
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div className="w-full flex items-center gap-1 px-1 py-0 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-[9px] leading-tight truncate">
            <span className="w-1 h-1 rounded-full bg-emerald-600 shrink-0" />
            <span className="truncate font-medium">{eventInfo.event.title}</span>
        </div>
    );
}