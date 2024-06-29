"use client";

import useSWR from "swr";
import { GetAlunosAtivos } from "../actions/GetAlunosAtivos";
import { toast } from "react-toastify";
import SkeletonStatLoading from "./SkeletonStatLoading";
import { PiStudentFill } from "react-icons/pi";

export default function CardAlunosAlert({ date }: { date?: string }) {
  const { data, error, isLoading } = useSWR(["GetAlunosAtivos", date], () => GetAlunosAtivos(date));

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  if (data && data.success === false) {
    toast.error(data.message);
    return;
  }

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
      <div className="stat">
        <div className="stat-figure text-primary">
          <PiStudentFill fontSize={30} />
        </div>
        <div className="stat-title text-zinc-900">Total de alunos ativos</div>
        <div className="stat-value text-primary">{data?.data}</div>
        <div className="stat-desc text-zinc-900">{data?.porcentagemAmaisqueMesAnterior}% mais que o mês anterior</div>
      </div>
    </div>
  );
}
