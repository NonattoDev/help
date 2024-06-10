"use client";

import { useState } from "react";
import { Professor } from "@prisma/client";
import { GiTeacher } from "react-icons/gi";
import ReactDOM from "react-dom";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";

interface ProfessorModalButtonProps {
  professores: Professor[] | undefined | null;
}

export default function ProfessorModalButton({ professores }: ProfessorModalButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProfessores, setFilteredProfessores] = useState<Professor[] | undefined | null>(professores);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearch = (search: string) => {
    if (!professores) return;

    if (search === "") {
      setFilteredProfessores(professores);
      return;
    }

    const filtered = professores.filter((professor) => professor.nome.toLowerCase().includes(search.toLowerCase()));

    setFilteredProfessores(filtered);
  };

  const modalContent = (
    <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="modal-box bg-white p-4 rounded-lg shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
          ✖
        </button>
        <h2 className="font-bold text-lg mb-4">Lista de Professores</h2>
        <input type="search" placeholder="Pesquisar por professor" className="input input-bordered" onChange={(e) => handleSearch(e.target.value)} />
        <div className="py-4">
          {filteredProfessores && filteredProfessores.length > 0 ? (
            <ul>
              {filteredProfessores.map((professor) => (
                <li key={professor.id}>
                  {professor.nome} -
                  <Link className="btn" href={`/help/config/${professor.id}/meuperfil`}>
                    <BiEdit />
                  </Link>
                </li>
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
  );

  return (
    <>
      <a onClick={openModal} className="cursor-pointer">
        <GiTeacher /> Professor
      </a>
      {isModalOpen && ReactDOM.createPortal(modalContent, document.body)}
    </>
  );
}
