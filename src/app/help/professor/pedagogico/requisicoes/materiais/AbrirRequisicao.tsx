"use client";

import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { GetAlunos } from "./actions/GetAlunos";
import { Aluno } from "@prisma/client";

export default function AbrirRequisicao() {
  const [showModal, setShowModal] = useState(false);
  const [alunos, setAlunos] = useState([] as Aluno[]);
  const [alunoSelected, setAlunoSelected] = useState("");
  const [requisicaoMaterial, setRequisicaoMaterial] = useState("");

  const handleShowModal = async () => {
    // Server Action que busca os alunos para o select
    const alunos = await GetAlunos();

    if (!alunos.success) {
      toast.error("Erro ao buscar alunos.");
      return;
    }

    setAlunos(alunos.data);
    setShowModal(true);
  };

  const handleSelectAluno = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlunoSelected(e.target.value);
  };

  const handleAbrirRequisicao = () => {
    if (!alunoSelected) {
      toast.error("Selecione um aluno.");
      return;
    }
    toast.success(`Requisição aberta para o aluno ${alunoSelected}.`);
  };

  const handleChangeRequisicao = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequisicaoMaterial(e.target.value);
  };

  return (
    <div>
      <button className="btn" onClick={handleShowModal}>
        Abrir Requisição
      </button>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center">
          <h2 className="text-md font-semibold mb-4">Abrir uma Requisição</h2>

          <label htmlFor="" className="label-text">
            Selecione o aluno
          </label>
          <select className="input input-bordered text-center my-2" value={alunoSelected} onChange={handleSelectAluno}>
            <option value="" disabled>
              Selecione o aluno
            </option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>

          <textarea className="textarea textarea-accent textarea-lg w-full " placeholder="Bio" value={requisicaoMaterial} onChange={handleChangeRequisicao}></textarea>

          <button className="btn my-2" onClick={handleAbrirRequisicao}>
            Fazer pedido de material
          </button>
        </div>
      </Modal>
    </div>
  );
}
