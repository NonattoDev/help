import Aluno from "@/interfaces/aluno.interface";
import { Professor } from "@/interfaces/professor.interface";
import { AgendaAulas as PrismaAgendaAulas } from "@prisma/client";
import moment from "moment";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { CancelAula } from "../../../app/help/admin/match/components/Actions/CancelAula";
import { useState } from "react";
import { FaCheckCircle, FaPencilAlt, FaRoute } from "react-icons/fa";
import Modal from "../../Modal/ModalEditAula";
import { FinalizarAula } from "@/app/help/admin/match/components/Actions/FinalizarAula";

interface AgendaProps {
  AgendaAulas: AgendaAulas[] | undefined;
}

interface AgendaAulas extends PrismaAgendaAulas {
  aluno: Aluno;
  professor: Professor;
}

export default function AgendaCard({ AgendaAulas }: AgendaProps) {
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

  const handleOpenRoute = (agenda: AgendaAulas) => {
    toast.info("Abrindo rota");
    window.open(`https://www.google.com/maps/dir/${agenda.professor.endereco.cep}, ${agenda.professor.endereco.rua}/${agenda.aluno.endereco.cep},${agenda.aluno.endereco.rua}`);
  };

  const handleUpdatedAula = (aula: AgendaAulas) => {
    const aulaIndex = agendaAulas?.findIndex((agenda) => agenda.id === aula.id);
    agendaAulas![aulaIndex as number] = aula;

    setAgendaAulas([...agendaAulas!]);
  };

  const handleFinalizarAula = async (aulaId: string) => {
    const finalizarAula = await FinalizarAula(aulaId);

    if (!finalizarAula) return toast.error("Erro ao finalizar a aula");

    if (finalizarAula.success) {
      toast.success(finalizarAula.success);
    }

    const findIndex = agendaAulas?.findIndex((agenda) => agenda.id === aulaId);

    if (findIndex !== undefined) {
      agendaAulas![findIndex].finalizada = true;
      setAgendaAulas([...agendaAulas!]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {agendaAulas?.map((agenda) => {
          const aulaDateTime = moment(`${agenda.data} ${agenda.horaInicio}`, "YYYY-MM-DD HH:mm");

          return (
            <div className="stat shadow-md rounded-md bg-slate-200" key={agenda.id}>
              <div className="flex justify-between items-center">
                <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(agenda)}>
                  <FaPencilAlt />
                </button>
                <div className="flex-1 stat-value text-center">{moment(agenda.data).format("DD/MM/YY")}</div>
              </div>
              <div className="text-info text-end">
                {agenda.horaInicio} - {agenda.horaFinal}
              </div>
              <div className="my-2">
                <div className="status-info">Aluno: {agenda.aluno.nome}</div>
                <div className="status-info">Modalidade: {agenda.modalidade === "ONLINE" ? "Online" : "Presencial"}</div>
                {agenda.modalidade === "PRESENCIAL" && (
                  <div className="flex justify-between align-middle justify-items-center">
                    <div className="status-info">Local: {agenda.aluno?.endereco?.bairro}</div>
                    <button className="btn btn-info" onClick={() => handleOpenRoute(agenda)}>
                      <FaRoute color="white" />
                    </button>
                  </div>
                )}
              </div>
              <div>
                {agenda.cancelada ? (
                  <div className="stat-desc text-error text-center mt-5">Aula cancelada</div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {!agenda.finalizada && <div className="stat-desc text-success text-center mt-5">Aula confirmada</div>}
                    {aulaDateTime.isBefore(moment()) && !agenda.finalizada && (
                      <button className="btn btn-success text-white" onClick={() => handleFinalizarAula(agenda.id)}>
                        Marcar como finalizada
                      </button>
                    )}
                  </div>
                )}
                {agenda.finalizada && <div className="stat-desc text-success text-center my-2">Aula concluída</div>}
              </div>
              {aulaDateTime.isAfter(moment()) && !agenda.cancelada && (
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
      </div>
      {selectedAula && <Modal agendaAula={selectedAula} onClose={handleCloseModal} handleUpdatedAula={handleUpdatedAula} />}
    </>
  );
}
