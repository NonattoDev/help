"use client";

import { Aluno } from "@prisma/client";
import { ProfessoresMatch } from "./Actions/GetProfessores";
import { useState } from "react";
import { toast } from "react-toastify";
import { saveAgenda } from "./Actions/SaveAgenda";
import moment from "moment";
import "moment/locale/pt-br";
import { BiLeftArrow, BiRightArrowCircle } from "react-icons/bi";
import ReactInputMask from "react-input-mask";
import AgendaCard from "@/components/Agenda/AgendaCard/AgendaCard";

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

export default function AgendaMatch({ professor, aluno }: AgendaMatchProps) {
  const [step, setStep] = useState<Step>(Step.SELECTDATE);
  const [date, setDate] = useState<string>("");
  const [modalidade, setModalidade] = useState<string>("");

  const [horaInicio, setHoraInicio] = useState<string>("");
  const [horaFinal, setHoraFinal] = useState<string>("");

  // Agenda aulas do professor
  const [agendaAulas, setAgendaAulas] = useState<any[]>(professor?.AgendaAulas as any[]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let errorCount = 0;
    // Se a data for antes do dia atual, não pode marcar
    if (moment(e.target.value).isBefore(moment().format("YYYY-MM-DD"))) {
      toast.error("Data inválida");
      errorCount++;
    }

    if (errorCount > 0) return;

    setDate(e.target.value);
  };

  const handleModalidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalidade(e.target.value);
    setStep(Step.SELECTHORARIODISPONIVEL);
  };

  const handleAgendar = async () => {
    const horaInicioMoment = moment(horaInicio, "HH:mm");
    const horaFinalMoment = moment(horaFinal, "HH:mm");

    let errorCount = 0;

    if (!horaInicioMoment.isValid()) {
      toast.error("Horário de início inválido");
      errorCount++;
    }

    if (!horaFinalMoment.isValid()) {
      toast.error("Horário de final inválido");
      errorCount++;
    }

    if (horaInicioMoment.isAfter(horaFinalMoment)) {
      toast.error("Horário de início não pode ser maior que o horário final");
      errorCount++;
    }

    if (horaInicioMoment.isSame(horaFinalMoment)) {
      toast.error("Horário de início não pode ser igual ao horário final");
      errorCount++;
    }

    if (errorCount > 0) return;

    if (modalidade === "PRESENCIAL") {
      // Adiciona 30 minutos para o deslocamento
      horaFinalMoment.add(30, "minutes");
    }

    const duracao = horaFinalMoment.diff(horaInicioMoment, "minutes");

    let AgendaAula = {
      alunoId: aluno.id,
      professorId: professor.id,
      data: moment(date).format("YYYY-MM-DD"),
      horaInicio,
      horaFinal,
      modalidade: modalidade.toUpperCase(),
      duracao,
      local: "",
    };

    if (modalidade === "PRESENCIAL") {
      AgendaAula.local = professor.endereco.bairro;
    }

    const response = await saveAgenda(AgendaAula as any);

    if (response && response.error) return toast.error(response.error);
    toast.success(response.success);

    setAgendaAulas([...agendaAulas, response.data]);
    setStep(Step.SELECTDATE);
    setModalidade("");
    setHoraInicio("");
    setHoraFinal("");
  };

  const handleVoltar = () => {
    if (step === Step.SELECTDATE) {
      window.location.reload();
    } else if (step === Step.SELECTMODALIDADE) {
      setStep(Step.SELECTDATE);
    } else if (step === Step.SELECTHORARIODISPONIVEL) {
      setModalidade("");
      setStep(Step.SELECTMODALIDADE);
    }
  };

  // Verificar quantas aulas o aluno já tem marcadas ESSE mes
  const qtdAulasMarcadas = agendaAulas.filter((agenda) => moment(agenda.data).format("MM-YYYY") === moment(date).format("MM-YYYY") && agenda.cancelada === false).length;

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
          <div className="formControl">
            <label className="label">
              <span className="label-text">Inicio aula</span>
            </label>
            <ReactInputMask
              mask="99:99"
              maskPlaceholder={null}
              alwaysShowMask={false}
              onChange={(e) => setHoraInicio(e.target.value)}
              name="horaInicio"
              type="text"
              className="input input-bordered input-sm"
              placeholder="Inicio"
            />
          </div>
          <div className="formControl">
            <label className="label">
              <span className="label-text">Final aula</span>
            </label>
            <ReactInputMask
              mask="99:99"
              maskPlaceholder={null}
              alwaysShowMask={false}
              onChange={(e) => setHoraFinal(e.target.value)}
              name="horaFim"
              type="text"
              className="input input-bordered input-sm"
              placeholder="Final da Aula"
            />
          </div>

          <button className="btn" onClick={handleAgendar}>
            Agendar
          </button>

          {(agendaAulas?.length as any) > 0 && (
            <>
              <div className="text-center font-bold text-1xl">Agenda do professor {professor.nome}</div>
              <AgendaCard AgendaAulas={agendaAulas} calledBy="AgendaMatch" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
