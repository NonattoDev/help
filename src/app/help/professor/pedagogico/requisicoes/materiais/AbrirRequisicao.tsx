"use client";

import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { GetAlunos } from "./actions/GetAlunos";
import { Aluno } from "@prisma/client";
import { OpenRequisicao } from "./actions/OpenRequisicao";
import moment from "moment";

export default function AbrirRequisicao() {
  const [showModal, setShowModal] = useState(false);
  const [alunos, setAlunos] = useState([] as Aluno[]);
  const [alunoSelected, setAlunoSelected] = useState("");
  const [requisicaoMaterial, setRequisicaoMaterial] = useState("");
  const [prazo, setPrazo] = useState(moment().add(2, "days").format("YYYY-MM-DD"));
  const [tituloRequisicao, setTituloRequisicao] = useState("");

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

  const handleAbrirRequisicao = async () => {
    if (!alunoSelected) {
      toast.error("Selecione um aluno.");
      return;
    }

    if (!tituloRequisicao) {
      toast.error("Informe o título da requisição.");
      return;
    }

    if (!requisicaoMaterial) {
      toast.error("Informe o material da requisição.");
      return;
    }

    if (!prazo) {
      toast.error("Informe o prazo da requisição.");
      return;
    }

    if (moment(prazo).isBefore(moment().add(2, "days"))) {
      toast.error("O prazo deve ser maior que 2 dias.");
      return;
    }

    // Não pode ser menor que a data atual
    if (moment(prazo).isBefore(moment())) {
      toast.error("O prazo deve ser maior que a data atual.");
      return;
    }

    const requisicaoCompleta = {
      alunoId: alunoSelected,
      requisicaoMaterial,
      tituloRequisicao,
      prazo: moment(prazo).toDate(),
    };

    const openRequisicao = await OpenRequisicao(requisicaoCompleta);

    if (!openRequisicao.success) {
      toast.error(openRequisicao.message);

      return;
    }

    // Zera os States

    setAlunoSelected("");
    setPrazo(moment().add(2, "days").format("YYYY-MM-DD"));
    setRequisicaoMaterial("");
    setTituloRequisicao("");
    toast.success(openRequisicao.message);
  };

  const handleChangeRequisicao = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequisicaoMaterial(e.target.value);
  };

  return (
    <div>
      <button className="btn my-2" onClick={handleShowModal}>
        Abrir Requisição
      </button>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center">
          <h2 className="text-md font-semibold mb-4">Abrir uma Requisição</h2>

          <label className="label-text">Selecione o aluno</label>
          <select className="select select-sm select-primary w-full max-w-xs text-center" value={alunoSelected} onChange={handleSelectAluno}>
            <option value="" disabled>
              Selecione o aluno
            </option>
            {alunos.map((aluno) => (
              <option key={aluno.id} value={aluno.id}>
                {aluno.nome}
              </option>
            ))}
          </select>

          <label className="label-text text-center mt-2">Do que precisa ?</label>
          <input type="text" className="input input-bordered input-sm mb-2 text-center" value={tituloRequisicao} onChange={(e) => setTituloRequisicao(e.target.value)} />
          <label className="label-text text-center mt-2">Para quando precisa ?</label>
          <input className="mb-4 input input-bordered texte-center input-sm" type="date" name="prazo" value={prazo} onChange={(e) => setPrazo(e.target.value)} />
          <textarea className="textarea textarea-accent textarea-lg w-full text-sm " placeholder="Bio" value={requisicaoMaterial} onChange={handleChangeRequisicao}></textarea>

          <button className="btn my-2" onClick={handleAbrirRequisicao}>
            Fazer pedido de material
          </button>
        </div>
      </Modal>
    </div>
  );
}
