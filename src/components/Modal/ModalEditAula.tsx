import { updateAula } from "@/app/help/admin/match/components/Actions/updateAula";
import { AgendaAulas } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";

interface ModalProps {
  agendaAula: AgendaAulas | null;
  handleUpdatedAula: any;
  onClose: () => void;
}

export default function ModalEditAula({ agendaAula, onClose, handleUpdatedAula }: ModalProps) {
  const [aula, setAula] = useState<AgendaAulas | null>(agendaAula);

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAula({
      ...aula!,
      data: event.target.value,
    });
  };

  const handleModalidadeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAula({
      ...aula!,
      modalidade: event.target.value as "ONLINE" | "PRESENCIAL",
    });
  };

  const saveEdit = async () => {
    let errorCount = 0;

    if (!aula?.data) {
      toast.error("Data não pode ser vazia");
      errorCount++;
    }
    if (!aula?.horaInicio) {
      toast.error("Hora de inicio não pode ser vazia");
      errorCount++;
    }
    if (!aula?.horaFinal) {
      toast.error("Hora final não pode ser vazia");
      errorCount++;
    }

    if (aula && aula.horaFinal && aula?.horaInicio && aula?.horaInicio >= aula?.horaFinal) {
      toast.error("A hora inicio da aula não pode ser após o fim, e nem igual!");
      errorCount++;
    }

    if (errorCount > 0) return;

    // Implementar a lógica de salvar aula
    const update = await updateAula(aula!);

    if (!update) return toast.error("Erro ao atualizar aula");

    if (update.error) return toast.error(update.error);

    toast.success(update.success);
    setAula(update.data as AgendaAulas);
    handleUpdatedAula(update.data as AgendaAulas);
    onClose();
  };

  if (!aula) return null;

  const horaInicio = moment(aula.horaInicio, "HH:mm");
  const horaFinal = moment(aula.horaFinal, "HH:mm");
  const duracao = horaFinal.diff(horaInicio, "minutes");

  return (
    <dialog id="my_modal_2" className="modal" open={!!agendaAula}>
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Editar Aula</h3>
        {aula && (
          <div>
            <div className="formControl">
              <label className="label">
                <span className="text-1xl font-bold">Data</span>
              </label>
              <div>
                <input type="date" name="data" className="input input-bordered input-sm" value={aula.data} onChange={handleDataChange} />
              </div>
            </div>

            <div className="my-5">
              <div className="text-1xl font-bold text-center mb-2">Selecione a modalidade da aula</div>
              <div className="flex gap-5 justify-center ">
                <label>
                  <input type="radio" value="ONLINE" className="radio radio-sm mr-1" checked={aula.modalidade === "ONLINE"} onChange={handleModalidadeChange} />
                  Online
                </label>
                <label>
                  <input type="radio" value="PRESENCIAL" className="radio radio-sm mr-1" checked={aula.modalidade === "PRESENCIAL"} onChange={handleModalidadeChange} />
                  Presencial
                </label>
              </div>
            </div>
            <div className="text-1xl font-bold text-center mt-4">Digite um horário</div>
            <div className="formControl">
              <label className="label">
                <span className="label-text">Inicio aula</span>
              </label>
              <ReactInputMask
                mask="99:99"
                maskPlaceholder={null}
                alwaysShowMask={false}
                value={aula.horaInicio}
                onChange={(e) => setAula({ ...aula, horaInicio: e.target.value })}
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
                value={aula.horaFinal}
                onChange={(e) => setAula({ ...aula, horaFinal: e.target.value })}
                name="horaFinal"
                type="text"
                className="input input-bordered input-sm"
                placeholder="Final da Aula"
              />
            </div>
            {aula.modalidade === "PRESENCIAL" && <p className="mt-5">Local: {aula.local}</p>}
            <p className="my-2">Duração: {duracao} minutos</p>
          </div>
        )}
        <div className="modal-action">
          <button className="btn" onClick={saveEdit}>
            Salvar
          </button>
          <button className="btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
}
