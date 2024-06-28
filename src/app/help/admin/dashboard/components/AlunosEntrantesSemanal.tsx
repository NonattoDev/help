"use client";
import useSWR from "swr";
import { GetAlunosIngressantesSemanal } from "../actions/GetAlunosIngressantesSemanal";
import SkeletonStatLoading from "./SkeletonStatLoading";
import Modal from "@/components/Modal/Modal";
import { useState } from "react";

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
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
