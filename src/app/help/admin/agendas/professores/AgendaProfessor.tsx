"use client";
import { useState } from "react";
import SelectProfessoresAgenda from "./components/SelectProfessoresAgenda";
import { AgendaAulas, Professor } from "@prisma/client";
import moment from "moment";
import { GetProfessorAgenda } from "./actions/GetProfessorAgenda";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import AgendaCard from "@/components/Agenda/AgendaCard/AgendaCard";

interface SelectProfessoresAgendaProps {
  professores: Professor[];
}

export default function AgendaProfessores({ professores }: SelectProfessoresAgendaProps) {
  const [professor, setProfessor] = useState("");
  const [professorAgenda, setProfessorAgenda] = useState<AgendaAulas[] | undefined>();
  const [date, setDate] = useState<string>("");
  const [showDate, setShowDate] = useState(false);
  const [allPeriodo, setAllPeriodo] = useState(false);
  const [mesAnoFiltro, setMesAnoFiltro] = useState(false);
  const [onlyWeek, setOnlyWeek] = useState(true);

  const HandleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProfessor(event.target.value);

    setShowDate(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleBuscar = async () => {
    if (!date && !allPeriodo && !onlyWeek) {
      toast.error("Selecione uma data");
      return;
    }

    if (onlyWeek) {
      setAllPeriodo(false);
      setMesAnoFiltro(false);
    }

    // Buscar a agenda do professor
    const agendasProfessor = await GetProfessorAgenda(professor, allPeriodo, mesAnoFiltro, onlyWeek, date);

    if (!agendasProfessor) {
      toast.error("Erro interno de servidor");
      return;
    }

    if (agendasProfessor.error) {
      toast.error(agendasProfessor.error);
    }

    if (agendasProfessor.success) {
      setProfessorAgenda(agendasProfessor.data as unknown as AgendaAulas[]);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mb-6">Agenda dos professores</h1>
        <SelectProfessoresAgenda professores={professores} HandleSelectChange={HandleSelectChange} />
        {showDate && (
          <div className="my-5">
            <div className="flex gap-2 justify-center items-center mb-2 w-full">
              <span className="text-md">Trazer agenda semanal</span>
              <input
                className="checkbox"
                type="checkbox"
                name="onlyWeek"
                checked={onlyWeek}
                onChange={() => {
                  setOnlyWeek(!onlyWeek);
                  setAllPeriodo(false);
                  setMesAnoFiltro(false);
                }}
              />
            </div>

            {!onlyWeek && (
              <div className="mt-4">
                <div className="flex flex-col justify-center w-full">
                  <span className="text-1xl font-semibold mb-2 text-center">Selecione uma data</span>
                  <input disabled={allPeriodo || onlyWeek} type="date" value={date} onChange={handleDateChange} className="input input-bordered" />
                </div>

                <div className="flex my-6 gap-2 items-center">
                  <span className="text-md">Considerar apenas mês e ano</span>
                  <input disabled={onlyWeek} className="checkbox" type="checkbox" name="mesAno" checked={mesAnoFiltro} onChange={() => setMesAnoFiltro(!mesAnoFiltro)} />
                </div>

                <div className="flex my-6 gap-2 items-center">
                  <span className="text-md">Trazer todos os períodos</span>
                  <input disabled={onlyWeek} className="checkbox" type="checkbox" name="allPeriodo" checked={allPeriodo} onChange={() => setAllPeriodo(!allPeriodo)} />
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button className="btn btn-primary" onClick={handleBuscar}>
                <FaSearch />
              </button>
            </div>
          </div>
        )}
      </div>

      {(professorAgenda?.length as any) > 0 && (
        <div className="card card-bordered shadow-md p-6">
          <div className="text-center font-bold text-3xl mb-4">Agenda</div>
          <AgendaCard AgendaAulas={professorAgenda as any[]} calledBy="AgendaProfessores" />
        </div>
      )}
    </>
  );
}
