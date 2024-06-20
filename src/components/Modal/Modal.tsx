import { AgendaAulas } from "@prisma/client";
import { useState } from "react";

interface ModalProps {
  agendaAula: AgendaAulas | null;
  onClose: () => void;
}

export default function Modal({ agendaAula, onClose }: ModalProps) {
  return (
    <dialog id="my_modal_2" className="modal" open={!!agendaAula}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Detalhes da Aula</h3>
        {agendaAula && (
          <>
            <p className="py-4">Data: {new Date(agendaAula.data).toLocaleDateString()}</p>
            <p className="py-4">Hora inicio: {agendaAula.horaInicio}</p>
            <p className="py-4">Hora final: {agendaAula.horaFinal}</p>
            <p className="py-4">Modalidade: {agendaAula.modalidade}</p>
            <p className="py-4">Local: {agendaAula.local}</p>
            <p className="py-4">Duração: {agendaAula.duracao}h</p>
          </>
        )}
        <div className="modal-action">
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
