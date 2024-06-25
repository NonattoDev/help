"use client";
import useSWR from "swr";
import SkeletonStatLoading from "./SkeletonStatLoading";
import { GetFinanceiroFuncionarios } from "../actions/GetFinanceiroFuncionarios";
import { FaBalanceScaleLeft } from "react-icons/fa";

export default function FinanceiroFuncionarios() {
  const { data, isLoading, error } = useSWR("GetFinanceiroFuncionarios", GetFinanceiroFuncionarios);

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaBalanceScaleLeft fontSize={25} />
        </div>
        <div className="stat-title text-zinc-900">A pagar funcionários</div>
        <div className="stat-value text-primary">
          {data?.data.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </div>
  );
}
