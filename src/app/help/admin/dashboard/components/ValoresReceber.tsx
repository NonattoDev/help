"use client";
import useSWR from "swr";
import SkeletonStatLoading from "./SkeletonStatLoading";
import { GetValoresReceber } from "../actions/GetValoresReceber";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

export default function ValoresReceber({ date }: { date?: string }) {
  const { data, isLoading, error } = useSWR(["GetValoresReceber",date] , () => GetValoresReceber(date));

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
      <div className="stat">
        <div className="stat-figure text-primary">
          <FaMoneyBillTrendUp fontSize={25} color="#00A96E" />
        </div>
        <div className="stat-title text-zinc-900">A receber</div>
        <div className="stat-value text-success">
          {data?.data.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </div>
  );
}
