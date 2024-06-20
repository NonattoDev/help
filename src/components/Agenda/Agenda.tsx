import Aluno from "@/interfaces/aluno.interface";
import { Professor } from "@/interfaces/professor.interface";
import { AgendaAulas as PrismaAgendaAulas } from "@prisma/client";
import moment from "moment";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { CancelAula } from "../../app/help/admin/match/components/Actions/CancelAula";
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import Modal from "../Modal/Modal";

interface AgendaProps {
  AgendaAulas: AgendaAulas[] | undefined;
}

interface AgendaAulas extends PrismaAgendaAulas {
  aluno: Aluno;
  professor: Professor;
}

export default function Agenda({ AgendaAulas }: AgendaProps) {
  const [agendaAulas, setAgendaAulas] = useState<AgendaAulas[] | undefined>(AgendaAulas);
  const [selectedAula, setSelectedAula] = useState<AgendaAulas | null>(null);

  const handleCancelAula = async (aulaId: string) => {
    const aulaCancelada = await CancelAula(aulaId);

    if (!aulaCancelada) return toast.error("Erro ao cancelar a aula");

    const aulaIndex = agendaAulas?.findIndex((agenda) => agenda.id === aulaId);
    const aula = agendaAulas?.[aulaIndex as number];
    aula!.cancelada = true;

    setAgendaAulas([...agendaAulas!]);

    toast.info(`A aula com id ${aulaId} foi cancelada com sucesso!`);
  };

  const handleEditClick = (aula: AgendaAulas) => {
    setSelectedAula(aula);
  };

  const handleCloseModal = () => {
    setSelectedAula(null);
  };

  return (
    <div className="grid grid-cols-5 gap-4">
      {agendaAulas?.map((agenda) => {
        return (
          <div className="stat shadow-md rounded-md bg-slate-200" key={agenda.id}>
            <BiEdit onClick={() => handleEditClick(agenda)} className="cursor-pointer" />

            <div className="stat-value text-center">{moment(agenda.data).format("DD/MM/YY")}</div>
            <div className="text-info text-end">
              {agenda.horaInicio} - {agenda.horaFinal}
            </div>
            <div className="my-2">
              <div className="status-info">Aluno: {agenda.aluno.nome}</div>
              <div className="status-info">Modalidade: {agenda.modalidade === "ONLINE" ? "Online" : "Presencial"}</div>
            </div>
            <div>
              {agenda.cancelada && <div className="stat-desc text-error text-center mt-5">Aula cancelada</div>}
              {agenda.finalizada && <div className="stat-desc text-success text-center my-2">Aula concluída</div>}
            </div>
            {moment().isBefore(moment(agenda.data)) && !agenda.cancelada && (
              <button className={`btn btn-error ${agenda.cancelada ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => handleCancelAula(agenda.id)} disabled={agenda.cancelada}>
                <MdCancel />
              </button>
            )}
            {agenda.finalizada && (
              <button className="btn btn-success">
                <FaCheckCircle color="white" />
              </button>
            )}
          </div>
        );
      })}
      {selectedAula && <Modal agendaAula={selectedAula} onClose={handleCloseModal} />}
    </div>
  );
}
