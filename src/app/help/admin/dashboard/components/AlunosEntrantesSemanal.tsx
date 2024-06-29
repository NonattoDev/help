"use client";
import useSWR from "swr";
import { GetAlunosIngressantesSemanal } from "../actions/GetAlunosIngressantesSemanal";
import SkeletonStatLoading from "./SkeletonStatLoading";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { CgMathPlus } from "react-icons/cg";

export default function AlunosEntrantesSemanal({ date }: { date?: string }) {
  const { data, isLoading, error } = useSWR(["GetAlunosIngressantesSemanal", date], () => GetAlunosIngressantesSemanal(date));
  const [showModal, setShowModal] = useState(false);

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  return (
    <>
      <div className="stats shadow text-primary-content bg-slate-300 cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="stat">
          <div className="stat-figure text-primary">
            <PiStudentFill fontSize={30} />
            <CgMathPlus fontSize={15} className="-mt-1" />
          </div>
          <div className="stat-title text-zinc-900">Alunos novos na semana</div>
          <div className="stat-value text-primary">{data?.qtdAlunosNovos}</div>
        </div>
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <h2 className="text-center font-semibold text-1xl mb-4">Novos alunos da semana</h2>
        {data?.alunosNovos && data.alunosNovos.length > 0 && data.alunosNovos.map((aluno) => <li key={aluno.id}>{aluno.nome}</li>)}
      </Modal>
    </>
  );
}
