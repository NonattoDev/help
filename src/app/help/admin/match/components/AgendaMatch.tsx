"use client";

import { Aluno } from "@prisma/client";
import { ProfessoresMatch } from "./Actions/GetProfessores";
import { useState } from "react";
import { toast } from "react-toastify";

interface AgendaMatchProps {
  professor: ProfessoresMatch;
  aluno: Aluno;
}

// Observacoes da agenda e de regra de negocio
// As aulas iniciam sempre as 9 horas e a ultima aula só pode iniciar até as 20 horas
// Para aulas Presenciais o intervalo entre uma aula e outra deve ser de 30 minutos
// Para Aulas Online não há intervalo entre as aulas
// Existem pacotes de aulas de 1h, 1h30 e 2h

enum Step {
  SELECTDATA,
  SELECTMODALIDADE,
  SELECTDURACAO,
  SELECTHORARIODISPONIVEL,
}

const horariosDisponiveis = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

export default function AgendaMatch({ professor, aluno }: AgendaMatchProps) {
  const [step, setStep] = useState<Step>(Step.SELECTDATA);
  const [date, setDate] = useState<string>("");
  const [modalidade, setModalidade] = useState<string>("");
  const [duracao, setDuracao] = useState<number>(0);
  const [agendamentos, setAgendamentos] = useState<{ horario: string; modalidade: string; duracao: number }[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setStep(Step.SELECTMODALIDADE);
  };

  const handleModalidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalidade(e.target.value);
    setStep(Step.SELECTDURACAO);
  };

  const handleDuracaoChange = (duracao: number) => {
    setDuracao(duracao);
    setStep(Step.SELECTHORARIODISPONIVEL);
  };

  const handleHorarioClick = (horario: string) => {
    setAgendamentos([...agendamentos, { horario, modalidade, duracao }]);

    let AgendaAula = {
      aluno: aluno.id,
      professor: professor.id,
      horario,
      modalidade,
      duracao,
      local: "",
    };

    if (modalidade === "presencial") {
      AgendaAula.local = professor.endereco.bairro;
    }

    toast.success(`Aula agendada para o dia ${date} às ${horario} com duração de ${duracao}h`);
  };

  const filtrarHorarios = () => {
    let horariosFiltrados = [...horariosDisponiveis];

    agendamentos.forEach((agendamento) => {
      const startHour = parseInt(agendamento.horario.split(":")[0]);
      const endHour = startHour + agendamento.duracao;

      for (let i = startHour; i < endHour; i++) {
        const index = horariosFiltrados.indexOf(`${i.toString().padStart(2, "0")}:00`);
        if (index > -1) horariosFiltrados.splice(index, 1);
      }

      if (agendamento.modalidade === "presencial") {
        const intervalEnd = endHour + 0.5; // Adding 30 minutes interval
        const index = horariosFiltrados.indexOf(`${Math.floor(intervalEnd).toString().padStart(2, "0")}:00`);
        if (index > -1) horariosFiltrados.splice(index, 1);
      }
    });

    return horariosFiltrados;
  };

  return (
    <div>
      {step === Step.SELECTDATA && (
        <div className="flex flex-col items-center justify-center gap-6">
          <label className="text-1xl font-bold">Selecione uma data</label>
          <input type="date" className="input input-bordered" value={date} onChange={handleDateChange} />
        </div>
      )}
      {step === Step.SELECTMODALIDADE && (
        <div className="flex flex-col items-center justify-center gap-6">
          <label className="text-1xl font-bold">Selecione a modalidade da aula</label>
          <div className="flex gap-5">
            <label>
              <input type="radio" value="online" className="radio radio-sm mr-1" checked={modalidade === "online"} onChange={handleModalidadeChange} />
              Online
            </label>
            <label>
              <input type="radio" value="presencial" className="radio radio-sm mr-1" checked={modalidade === "presencial"} onChange={handleModalidadeChange} />
              Presencial
            </label>
          </div>
        </div>
      )}
      {step === Step.SELECTDURACAO && (
        <div className="flex flex-col items-center justify-center gap-6">
          <label className="text-1xl font-bold">Selecione a duração da aula</label>
          <div className="flex gap-4">
            <button type="button" className="btn btn-info text-white" onClick={() => handleDuracaoChange(1)}>
              1h
            </button>
            <button type="button" className="btn btn-info text-white" onClick={() => handleDuracaoChange(1.5)}>
              1h30
            </button>
            <button type="button" className="btn btn-info text-white" onClick={() => handleDuracaoChange(2)}>
              2h
            </button>
          </div>
        </div>
      )}
      {step === Step.SELECTHORARIODISPONIVEL && (
        <div className="flex flex-col items-center justify-center gap-6">
          <label className="text-1xl font-bold">Selecione um horário disponível</label>
          <div className="grid grid-cols-6 gap-4">
            {filtrarHorarios().map((horario) => (
              <button key={horario} type="button" className="btn btn-info" onClick={() => handleHorarioClick(horario)}>
                {horario}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
