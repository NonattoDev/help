"use client";
import useSWR from "swr";
import SkeletonStatLoading from "./SkeletonStatLoading";
import { GetTicketMedio } from "../actions/GetTicketMedio";
import { ImTicket } from "react-icons/im";

export default function TicketMedio({ date }: { date: string }) {
  const { data, isLoading, error } = useSWR(["GetTicketMedio", date], () => GetTicketMedio(date));

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
      <div className="stat">
        <div className="stat-figure">
          <ImTicket fontSize={25} color="#FF4191" />
        </div>
        <div className="stat-title text-zinc-900">Ticket Médio</div>
        <div className="stat-value text-success " style={{ color: "#FF4191" }}>
          {data?.TicketMedio?.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      </div>
    </div>
  );
}
