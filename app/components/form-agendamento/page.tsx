"use client"

import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css";

export default function FormAgendamento() {

    const [modalAberto, setModalAberto] = useState(false);

    const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date());

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return (


        <>
            <button
                onClick={() => setModalAberto(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
                Fazer Agendamento
            </button>

            {modalAberto && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">

                        <h1 className="text-xl font-bold text-gray-800">Agendar</h1>
                        <p className="text-m text-gray-600">Agendamento de serviço e profissional</p>

                        <form className="flex flex-col gap-4" action={CriarAgendamento}>

                            <div className="flex flex-col items-center bg-gray-50 border border-gray-200 rounded-xl p-3 shadow-inner">
                                <DayPicker
                                    mode="single"
                                    locale={ptBR}
                                    selected={dataSelecionada}
                                    onSelect={setDataSelecionada}
                                    disabled={{ before: hoje }}
                                    classNames={{
                                        caption_label: "text-base font-bold text-emerald-700 capitalize",
                                        button_previous: "!h-8 !w-8 !text-emerald-700 hover:!bg-emerald-100 !rounded-full flex items-center justify-center transition",
                                        button_next: "!h-8 !w-8 !text-emerald-700 hover:!bg-emerald-100 !rounded-full flex items-center justify-center transition",
                                        chevron: "!fill-emerald-700 !w-4 !h-4",
                                        weekday: "text-gray-600 font-bold text-xs  w-8 text-center",
                                        day: " font-bold text-emerald-600 hover:bg-emerald-50 ",
                                        selected: "bg-emerald-600 !text-white font-extrabold",
                                        today: "border border-emerald-600 !text-emerald-700",
                                        disabled: "!text-gray-300 opacity-40 cursor-not-allowed",
                                    }}
                                />
                                <input
                                    type="hidden"
                                    name="data"
                                    value={
                                        dataSelecionada
                                            ? dataSelecionada.toLocaleDateString("pt-BR")
                                            : ""
                                    }
                                />
                            </div>

                            {/* Fazer um componente para os select */}

                            <select name="horario" id="opcaoHorario" required defaultValue={""}
                                className="w-full p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/40 text-emerald-900 font-medium 
                                focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none
                                [&>option]:bg-white [&>option]:text-emerald-950 [&>option]:py-2">
                                <option value={""}>Selecionar horário</option>
                                <option value="8h">8:00</option>
                                <option value="9h">9:00</option>
                            </select>

                            <select name="servico" id="opcaoServico" required defaultValue={""}
                                className="w-full p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/40 text-emerald-900 font-medium 
                                focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none
                                [&>option]:bg-white [&>option]:text-emerald-950 [&>option]:py-2">
                                <option value={""}>Selecionar Serviço</option>
                                <option value="cabelo">Cabelo</option>
                                <option value="cabelo-barba">Cabelo e barba</option>
                            </select>

                            <select name="profissionais" id="opcaoProfissionais" required defaultValue={""}
                                className="w-full p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/40 text-emerald-900 font-medium 
                                focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none
                                [&>option]:bg-white [&>option]:text-emerald-950 [&>option]:py-2">
                                <option value={""}>Selecionar Profissional</option>
                                <option value="barbeiro1">barbeiro1</option>
                                <option value="barbeiro2">barbeiro2</option>
                            </select>

                            <div className="flex gap-3">
                                <button onClick={() => setModalAberto(false)} className="bg-red-400 rounded-lg p-1" >Cancelar</button>
                                <button type="submit" className="bg-green-400 rounded-lg p-1 px-3">Enviar</button>
                            </div>

                        </form>

                    </div>

                </div>
            )}
        </>
    );
}

function CriarAgendamento() {

}