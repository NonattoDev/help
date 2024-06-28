"use client";
import useSWR from "swr";
import SkeletonStatLoading from "./SkeletonStatLoading";
import { GetAlunosDesativadosMensal } from "../actions/GetAlunosDesativadosMensal";
import { TbZoomMoney } from "react-icons/tb";

export default function AlunosDesativadosMensal() {
  const { data, isLoading, error } = useSWR("GetAlunosDesativadosMensal", GetAlunosDesativadosMensal);

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
      <div className="stat">
        <div className="stat-figure text-primary">
          <TbZoomMoney fontSize={25} color="#00A96E" />
        </div>
        <div className="stat-title text-zinc-900">Alunos desativados este mês</div>
        <div className="stat-value text-success">{data?.AlunosDesativados}</div>
      </div>
    </div>
  );
}
