"use client";
import useSWR from "swr";
import SkeletonStatLoading from "./SkeletonStatLoading";
import { GetVendasDaSemana } from "../actions/GetVendasDaSemana";
import { TbZoomMoney } from "react-icons/tb";

export default function VendasDaSemana() {
  const { data, isLoading, error } = useSWR("GetVendasDaSemana", GetVendasDaSemana);

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
      <div className="stat">
        <div className="stat-figure text-primary">
          <TbZoomMoney fontSize={25} color="#00A96E" />
        </div>
        <div className="stat-title text-zinc-900">Vendas da semana</div>
        <div className="stat-value text-success">{data?.VendasDaSemana.length}</div>
        <div className="stat-desc text-zinc-900">
          {data?.ValorTotalDasVendas.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}{" "}
          é o valor total das vendas da semana.
        </div>
      </div>
    </div>
  );
}
