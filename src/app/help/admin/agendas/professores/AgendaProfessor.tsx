"use client";
import { useState } from "react";
import SelectProfessoresAgenda from "./components/SelectProfessoresAgenda";
import { AgendaAulas, Professor } from "@prisma/client";
import moment from "moment";
import { GetProfessorAgenda } from "./actions/GetProfessorAgenda";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

interface SelectProfessoresAgendaProps {
  professores: Professor[];
}

export default function AgendaProfessores({ professores }: SelectProfessoresAgendaProps) {
  const [professor, setProfessor] = useState("");
  const [professorAgenda, setProfessorAgenda] = useState<AgendaAulas | null>(null);
  const [date, setDate] = useState<string>("");
  const [showDate, setShowDate] = useState(false);
  const [allPeriodo, setAllPeriodo] = useState(false);
  const [mesAnoFiltro, setMesAnoFiltro] = useState(false);

  const HandleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProfessor(event.target.value);

    setShowDate(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleBuscar = async () => {
    if (!date && !allPeriodo) {
      toast.error("Selecione uma data");
      return;
    }
    // Buscar a agenda do professor
    const agendasProfessor = await GetProfessorAgenda(professor, allPeriodo, mesAnoFiltro, mesAnoFiltro ? moment(date).format("YYYY-MM") : date);

    if (!agendasProfessor) {
      toast.error("Erro interno de servidor");
      return;
    }

    if (agendasProfessor.error) {
      toast.error(agendasProfessor.error);
    }

    if (agendasProfessor.success) {
      setProfessorAgenda(agendasProfessor.data as unknown as AgendaAulas);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold mb-6">Agenda dos professores</h1>
      <SelectProfessoresAgenda professores={professores} HandleSelectChange={HandleSelectChange} />
      {showDate && (
        <div className="my-5">
          <div className="flex flex-col">
            <span className="text-1xl font-semibold mb-2 text-center">Selecione uma data</span>
            <input disabled={allPeriodo} type="date" value={date} onChange={handleDateChange} className="input input-bordered" />
          </div>

          <div className="flex my-6 gap-2 items-center">
            <span className="text-md">Considerar apenas mês e ano</span>
            <input className="checkbox" type="checkbox" name="mesAno" checked={mesAnoFiltro} onChange={() => setMesAnoFiltro(!mesAnoFiltro)} />
          </div>

          <div className="flex my-6 gap-2 items-center">
            <span className="text-md">Trazer todos os períodos</span>
            <input className="checkbox" type="checkbox" name="allPeriodo" checked={allPeriodo} onChange={() => setAllPeriodo(!allPeriodo)} />
          </div>

          <div className="flex justify-center">
            <button className="btn btn-primary" onClick={handleBuscar}>
              <FaSearch />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
