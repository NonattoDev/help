"use client";

import { Aluno } from "@prisma/client";
import { ProfessoresMatch } from "./Actions/GetProfessores";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveAgenda } from "./Actions/SaveAgenda";
import moment from "moment";

interface AgendaMatchProps {
  professor: ProfessoresMatch;
  aluno: Aluno;
}

enum Step {
  SELECTDATA,
  SELECTMODALIDADE,
  SELECTDURACAO,
  SELECTHORARIODISPONIVEL,
}

// Função para gerar horários disponíveis
const gerarHorariosDisponiveis = (inicio: string, fim: string, intervalo: number) => {
  const horarios = [];
  let current = moment(inicio, "HH:mm");

  while (current.format("HH:mm") <= fim) {
    horarios.push(current.format("HH:mm"));
    current.add(intervalo, "minutes");
  }

  return horarios;
};

const horariosDisponiveis = gerarHorariosDisponiveis("09:00", "20:00", 60);

export default function AgendaMatch({ professor, aluno }: AgendaMatchProps) {
  const [step, setStep] = useState<Step>(Step.SELECTDATA);
  const [date, setDate] = useState<string>("");
  const [modalidade, setModalidade] = useState<string>("");
  const [duracao, setDuracao] = useState<number>(0);
  const [agendamentos, setAgendamentos] = useState<{ hora: string; modalidade: string; duracao: number }[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
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

  const handleHorarioClick = async (hora: string) => {
    setAgendamentos([...agendamentos, { hora, modalidade, duracao }]);

    let AgendaAula = {
      alunoId: aluno.id,
      professorId: professor.id,
      data: moment(date).toDate(),
      hora,
      modalidade: modalidade.toUpperCase(),
      duracao,
      local: "",
    };

    if (modalidade === "PRESENCIAL") {
      AgendaAula.local = professor.endereco.bairro;
    }

    await saveAgenda(AgendaAula as any);

    toast.success(`Aula agendada para o dia ${date} às ${hora} com duração de ${duracao}h`);
    setStep(Step.SELECTDATA);
  };

  const filtrarHorarios = () => {
    let horariosFiltrados = gerarHorariosDisponiveis("09:00", "20:00", 60);

    professor?.AgendaAulas?.forEach((agendamento) => {
      const agendamentoDate = moment(agendamento.data).format("YYYY-MM-DD");
      if (agendamentoDate === date) {
        const startHour = parseInt(agendamento.hora.split(":")[0]);
        const startMinute = parseInt(agendamento.hora.split(":")[1]);
        const durationInMinutes = agendamento.duracao * 60;
        const endMinute = startMinute + durationInMinutes;
        const endHour = startHour + Math.floor(endMinute / 60);
        const endMinutesAdjusted = endMinute % 60;

        // Remover horários ocupados
        for (let hour = startHour; hour < endHour; hour++) {
          const time = `${hour.toString().padStart(2, "0")}:00`;
          const index = horariosFiltrados.indexOf(time);
          if (index > -1) horariosFiltrados.splice(index, 1);
        }

        if (endMinutesAdjusted > 0) {
          const time = `${endHour.toString().padStart(2, "0")}:00`;
          const index = horariosFiltrados.indexOf(time);
          if (index > -1) horariosFiltrados.splice(index, 1);
        }

        if (modalidade === "PRESENCIAL") {
          const intervalEndHour = endHour;
          const intervalEndMinute = endMinutesAdjusted + 30;
          const intervalAdjustedEndHour = intervalEndHour + Math.floor(intervalEndMinute / 60);
          const intervalAdjustedEndMinute = intervalEndMinute % 60;

          if (intervalAdjustedEndMinute > 0) {
            const intervalTime = `${intervalAdjustedEndHour.toString().padStart(2, "0")}:${intervalAdjustedEndMinute.toString().padStart(2, "0")}`;
            const index = horariosFiltrados.indexOf(intervalTime);
            if (index > -1) horariosFiltrados.splice(index, 1);
          } else {
            const intervalTime = `${intervalAdjustedEndHour.toString().padStart(2, "0")}:00`;
            const index = horariosFiltrados.indexOf(intervalTime);
            if (index > -1) horariosFiltrados.splice(index, 1);
          }
        }
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
              <input type="radio" value="ONLINE" className="radio radio-sm mr-1" checked={modalidade === "ONLINE"} onChange={handleModalidadeChange} />
              Online
            </label>
            <label>
              <input type="radio" value="PRESENCIAL" className="radio radio-sm mr-1" checked={modalidade === "PRESENCIAL"} onChange={handleModalidadeChange} />
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
            {filtrarHorarios().map((hora) => (
              <button key={hora} type="button" className="btn btn-info" onClick={() => handleHorarioClick(hora)}>
                {hora}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
