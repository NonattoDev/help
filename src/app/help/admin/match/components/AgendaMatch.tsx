"use client";

import { Aluno } from "@prisma/client";
import { ProfessoresMatch } from "./Actions/GetProfessores";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveAgenda } from "./Actions/SaveAgenda";
import moment from "moment";
import "moment/locale/pt-br";
import { BiLeftArrow, BiRightArrowCircle } from "react-icons/bi";

moment.locale("pt-br");

interface AgendaMatchProps {
  professor: ProfessoresMatch;
  aluno: Aluno & { AgendaAulas: any[]; financeiro: { qtd_aulas: number } };
}

enum Step {
  SELECTDATE,
  SELECTMODALIDADE,
  SELECTHORARIODISPONIVEL,
}

interface Disponibilidade {
  manha: boolean;
  tarde: boolean;
  noite: boolean;
}

interface ProfessorDisponibilidade {
  segunda: Disponibilidade;
  terca: Disponibilidade;
  quarta: Disponibilidade;
  quinta: Disponibilidade;
  sexta: Disponibilidade;
  sabado: Disponibilidade;
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

const diasDaSemana: { [key: string]: string } = {
  segunda: "Segunda-Feira",
  terca: "Terça-Feira",
  quarta: "Quarta-Feira",
  quinta: "Quinta-Feira",
  sexta: "Sexta-Feira",
  sabado: "Sábado",
};

export default function AgendaMatch({ professor, aluno }: AgendaMatchProps) {
  const [step, setStep] = useState<Step>(Step.SELECTDATE);
  const [date, setDate] = useState<string>("");
  const [modalidade, setModalidade] = useState<string>("");
  const [duracao, setDuracao] = useState<number>(0);
  const [agendamentos, setAgendamentos] = useState<{ hora: string; modalidade: string; duracao: number }[]>([]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleModalidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalidade(e.target.value);
    setStep(Step.SELECTHORARIODISPONIVEL);
  };

  const handleDuracaoChange = (duracao: number) => {
    setDuracao(duracao);
    setStep(Step.SELECTHORARIODISPONIVEL);
  };

  const handleHorarioClick = async () => {
    const hora = "09:00";
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
    setStep(Step.SELECTDATE);
  };

  const handleVoltar = () => {
    if (step === Step.SELECTDATE) {
      window.location.reload();
    } else if (step === Step.SELECTMODALIDADE) {
      setStep(Step.SELECTDATE);
    } else if (step === Step.SELECTHORARIODISPONIVEL) {
      setDuracao(0);
      setStep(Step.SELECTMODALIDADE);
    }
  };

  // Verificar quantas aulas o aluno já tem marcadas ESSE mes
  const qtdAulasMarcadas = aluno.AgendaAulas.filter((agenda) => moment(agenda.data).format("MM-YYYY") === moment(date).format("MM-YYYY")).length;

  return (
    <div>
      <button className="btn btn-info rounded-[20px]" onClick={handleVoltar}>
        <BiLeftArrow />
      </button>
      {step === Step.SELECTDATE && (
        <div className="flex flex-col justify-center gap-6">
          {date && (
            <label className="text-1xl font-bold text-end">
              {aluno.nome} tem {aluno.financeiro?.qtd_aulas - qtdAulasMarcadas} aulas restantes para o mês de {moment(date).format("MMMM")}
            </label>
          )}
          <label className="text-1xl font-bold text-center">Selecione uma data</label>
          <div className="flex justify-center">
            <input type="date" className="input input-bordered" value={date} onChange={handleDateChange} />
          </div>
          <div className="flex justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!date) return toast.error("Selecione uma data");
                if (qtdAulasMarcadas >= aluno.financeiro.qtd_aulas) return toast.error("Aluno já atingiu o limite de aulas para o mês");
                setStep(Step.SELECTMODALIDADE);
              }}
            >
              <BiRightArrowCircle />
            </button>
          </div>
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
      {step === Step.SELECTHORARIODISPONIVEL && (
        <div className="flex flex-col items-center justify-center gap-6">
          <label className="text-1xl font-bold">Digite um horário</label>
          <input type="text" className="input input-bordered input-sm" placeholder="Inicio" />
          <input type="text" className="input input-bordered input-sm" placeholder="Final da Aula" />
          <button className="btn" onClick={handleHorarioClick}>
            Agendar
          </button>
        </div>
      )}
    </div>
  );
}
