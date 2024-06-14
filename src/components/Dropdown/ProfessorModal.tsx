"use client";

import { useState, useEffect, useCallback } from "react";
import { Professor } from "@prisma/client";
import { GiTeacher } from "react-icons/gi";
import { BiEdit, BiSearch } from "react-icons/bi";
import { createPortal } from "react-dom";
import Link from "next/link";
import "@/components/Dropdown/styles/custom-scrollbar.scss";
import { CgUserAdd } from "react-icons/cg";
import LoadingButton from "@/components/Buttons/LoadingButton";

interface ProfessorModalButtonProps {
  professores: Professor[] | undefined | null;
}

export default function ProfessorModalButton({ professores }: ProfessorModalButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(15);
  const [loading, setLoading] = useState(false);

  const openModal = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleResultsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setResultsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, closeModal]);

  const handleOutsideClick = (event: React.MouseEvent) => {
    if ((event.target as Element).classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  const filteredProfessores = professores?.filter((professor) => professor.nome.toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastProfessor = currentPage * resultsPerPage;
  const indexOfFirstProfessor = indexOfLastProfessor - resultsPerPage;
  const currentProfessores = filteredProfessores?.slice(indexOfFirstProfessor, indexOfLastProfessor);

  const totalPages = Math.ceil((filteredProfessores?.length || 0) / resultsPerPage);

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-box bg-white p-6 rounded-lg shadow-lg relative w-full max-w-5xl max-h-[95vh] overflow-y-auto custom-scrollbar">
        <button className="absolute top-5 right-2 text-gray-500 hover:text-gray-700" onClick={closeModal}>
          ✖
        </button>
        <h2 className="font-bold text-2xl mb-8 text-center">Lista de Professores</h2>
        <label className="input input-bordered flex items-center gap-2">
          <BiSearch className="w-4 h-4 opacity-70" />
          <input type="search" className="grow text-center" placeholder="Pesquisar por professor" onChange={(e) => handleSearch(e.target.value)} />
        </label>
        <div className="mt-2">
          {loading ? (
            <LoadingButton />
          ) : (
            <Link onClick={closeModal} href={"/help/admin/factory/create/professor"} className="btn btn-primary">
              <CgUserAdd /> Adicionar Professor
            </Link>
          )}
        </div>

        <div className="py-4">
          {currentProfessores && currentProfessores.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentProfessores.map((professor) => (
                  <tr key={professor.id}>
                    <td>{professor.nome}</td>
                    <td>{professor.email.toLowerCase()}</td>
                    <td>
                      <Link className="btn btn-outline btn-sm" onClick={closeModal} href={`/help/admin/factory/edit/professor/${professor.id}`}>
                        <BiEdit />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">Nenhum professor encontrado.</p>
          )}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <select className="select select-bordered" value={resultsPerPage} onChange={handleResultsPerPageChange}>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button className="btn" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <a onClick={openModal} className="cursor-pointer">
        <GiTeacher /> Professor
      </a>

      {isModalOpen && createPortal(modalContent, document.body)}
    </>
  );
}
