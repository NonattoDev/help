"use client";
import useSWR from "swr";
import SkeletonStatLoading from "./SkeletonStatLoading";
import { GetLucroTotal } from "../actions/GetLucroTotal";
import { GiReceiveMoney } from "react-icons/gi";

export default function LucroTotal({ date }: { date?: string }) {
  const { data, isLoading, error } = useSWR(["GetLucroTotal", date], () => GetLucroTotal(date));

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
      <div className="stat">
        <div className="stat-figure text-primary">
          <GiReceiveMoney fontSize={25} color="#00A96E" />
        </div>
        <div className="stat-title text-zinc-900">Lucro Total</div>
        <div className="stat-value text-success">
          {data?.LucroTotal.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </div>
  );
}
