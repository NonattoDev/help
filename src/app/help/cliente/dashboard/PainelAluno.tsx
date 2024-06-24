"use client";

import AgendaCard from "@/components/Agenda/AgendaCard/AgendaCard";
import { AgendaAulas } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import { GetAgendas } from "../../../../server/actions/GetAgendas";
import { toast } from "react-toastify";

export default function PainelAluno({ AgendaAluno }: { AgendaAluno: any[] }) {
  const [agendaAulas, setAgendaAulas] = useState<AgendaAulas[] | undefined>(AgendaAluno);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const handleDateChange = async (e: any) => {
    setDate(e.target.value);
    const Agendas = await GetAgendas(e.target.value);

    if (!Agendas) return;

    if (Agendas.success === false) {
      setAgendaAulas([]);
      toast.error(Agendas.message);
      return;
    }
    setAgendaAulas(Agendas.data);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 items-center my-4">
        <span className="label-text">Filtro por data</span>
        <input type="date" name="date" className="input input-bordered w-1/12 input-sm" value={date} onChange={handleDateChange} />
      </div>
      {agendaAulas && agendaAulas.length > 0 && <AgendaCard AgendaAulas={agendaAulas as any[]} calledBy="AlunoPage" />}
      {agendaAulas && agendaAulas.length <= 0 && <AgendaCard AgendaAulas={AgendaAluno as any[]} calledBy="AlunoPage" />}
    </div>
  );
}
