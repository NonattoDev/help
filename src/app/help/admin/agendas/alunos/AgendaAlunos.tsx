"use client";
import { useState } from "react";
import SelectAlunosAgenda from "./components/SelectAlunosAgenda";
import { AgendaAulas, Aluno } from "@prisma/client";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import AgendaCard from "@/components/Agenda/AgendaCard/AgendaCard";
import { GetAlunosAgenda } from "./actions/GetAlunosAgenda";
import { only } from "node:test";

interface SelectAlunosAgendaProps {
  alunos: Aluno[];
}

export default function AgendaAlunos({ alunos }: SelectAlunosAgendaProps) {
  const [aluno, setAluno] = useState("");
  const [alunoAgenda, setAlunoAgenda] = useState<AgendaAulas[] | undefined>();
  const [date, setDate] = useState<string>("");
  const [showDate, setShowDate] = useState(false);
  const [allPeriodo, setAllPeriodo] = useState(false);
  const [mesAnoFiltro, setMesAnoFiltro] = useState(false);
  const [onlyWeek, setOnlyWeek] = useState(false);

  const HandleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAluno(event.target.value);

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

    // Buscar a agenda do aluno
    const agendasAluno = await GetAlunosAgenda(aluno, allPeriodo, mesAnoFiltro, onlyWeek, date);

    if (!agendasAluno) {
      toast.error("Erro interno de servidor");
      return;
    }

    if (agendasAluno.error) {
      toast.error(agendasAluno.error);
    }

    if (agendasAluno.success) {
      setAlunoAgenda(agendasAluno.data as unknown as AgendaAulas[]);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-semibold mb-6">Agenda dos professores</h1>
        <SelectAlunosAgenda alunos={alunos} HandleSelectChange={HandleSelectChange} />
        {showDate && (
          <div className="my-5">
            <div className="flex flex-col">
              <span className="text-1xl font-semibold mb-2 text-center">Selecione uma data</span>
              <input disabled={allPeriodo || onlyWeek} type="date" value={date} onChange={handleDateChange} className="input input-bordered" />
            </div>

            <div className="flex my-6 gap-2 items-center">
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

            <div className="flex my-6 gap-2 items-center">
              <span className="text-md">Considerar apenas mês e ano</span>
              <input disabled={onlyWeek} className="checkbox" type="checkbox" name="mesAno" checked={mesAnoFiltro} onChange={() => setMesAnoFiltro(!mesAnoFiltro)} />
            </div>

            <div className="flex my-6 gap-2 items-center">
              <span className="text-md">Trazer todos os períodos</span>
              <input disabled={onlyWeek} className="checkbox" type="checkbox" name="allPeriodo" checked={allPeriodo} onChange={() => setAllPeriodo(!allPeriodo)} />
            </div>

            <div className="flex justify-center">
              <button className="btn btn-primary" onClick={handleBuscar}>
                <FaSearch />
              </button>
            </div>
          </div>
        )}
      </div>

      {(alunoAgenda?.length as any) > 0 && (
        <div className="card card-bordered shadow-md p-6">
          <div className="text-center font-bold text-3xl">Agenda</div>
          <AgendaCard AgendaAulas={alunoAgenda as any[]} />
        </div>
      )}
    </>
  );
}
