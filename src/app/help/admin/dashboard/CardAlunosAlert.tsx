"use client";

import useSWR from "swr";
import { GetAlunosAtivos } from "./actions/GetAlunosAtivos";
import { toast } from "react-toastify";

export default function CardAlunosAlert({ date }: { date: string }) {
  const { data, error, isLoading } = useSWR(["GetAlunosAtivos", date], () => GetAlunosAtivos(date));

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <div className="skeleton w-full h-96"></div>;

  if (data && data.success === false) {
    toast.error(data.message);
    return;
  }

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
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
        <div className="stat-title text-zinc-900">Total de alunos ativos</div>
        <div className="stat-value text-primary">{data?.data}</div>
        <div className="stat-desc text-zinc-900">{data?.comparativoMeses} more than last month</div>
      </div>
    </div>
  );
}
