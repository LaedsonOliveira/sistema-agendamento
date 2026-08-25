"use client"

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useState } from "react";

interface EventItem {
    title: string;
    date: string;
}

interface CalendarProps {
    events?: EventItem[];
}


export default function Calendar({ events }: CalendarProps) {

    const [event, setEvent] = useState<EventItem[]>([
        { title: "Evento Inicial", date: "2026-08-24" }
    ]);
    const [selsectDate, setSelectDate] = useState<string>();
    const [title, setTitle] = useState<string>();

    const handleDateClick = (info: DateClickArg) => {
        alert(info.dateStr)
    }

    return (
        <section>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={events}
                dateClick={handleDateClick}
                //estiliza o evento
                eventContent={renderEventContent}
            />
        </section>

    );
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}