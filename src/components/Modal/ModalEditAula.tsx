import { AgendaAulas } from "@prisma/client";
import { useState } from "react";
import ReactInputMask from "react-input-mask";

interface ModalProps {
  agendaAula: AgendaAulas | null;
  onClose: () => void;
}

export default function ModalEditAula({ agendaAula, onClose }: ModalProps) {
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
    // Implementar a lógica de salvar aula
    console.log(aula);
  };

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
                onChange={(e) => setAula({ ...aula, horaFinal: e.target.value })}
                name="horaFinal"
                type="text"
                className="input input-bordered input-sm"
                placeholder="Final da Aula"
              />
            </div>
            <p className="py-4">Local: {aula.local}</p>
            <p className="py-4">Duração: {aula.duracao}min</p>
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
