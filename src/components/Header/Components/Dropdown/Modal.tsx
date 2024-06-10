"use client";

import { useState } from "react";
import { Professor } from "@prisma/client";
import { GiTeacher } from "react-icons/gi";

interface ProfessorModalButtonProps {
  professores: Professor[] | undefined | null;
}

export default function ProfessorModalButton({ professores }: ProfessorModalButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <a onClick={openModal} className="cursor-pointer">
        <GiTeacher /> Professor
      </a>

      {isModalOpen && (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="modal-box relative bg-white p-4 rounded-lg shadow-lg">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
              ✖
            </button>
            <h2 className="font-bold text-lg mb-4">Lista de Professores</h2>
            <div className="py-4">
              {professores ? (
                <ul>
                  {professores.map((professor) => (
                    <li key={professor.id}>{professor.nome}</li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum professor encontrado.</p>
              )}
            </div>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
