"use client";
import useSWR from "swr";
import SkeletonStatLoading from "./SkeletonStatLoading";
import { GetProfessoresTotal } from "../actions/GetProfessoresTotal";
import { GiTeacher } from "react-icons/gi";

export default function ProfessoresTotal({ date }: { date: string }) {
  const { data, isLoading, error } = useSWR(["GetProfessoresTotal", date], () => GetProfessoresTotal(date));

  if (error) return <div>Erro ao carregar os dados</div>;
  if (isLoading) return <SkeletonStatLoading />;

  return (
    <div className="stats shadow text-primary-content bg-slate-300 p-4 ">
      <div className="stat flex flex-col items-center">
        <div className="stat-figure text-primary mb-2">
          <GiTeacher fontSize={30} color="#00A96E" />
        </div>
        <div className="stat-title text-center mb-2 text-sm">Nossos Professores</div>
        <div className="flex w-full justify-between">
          <div className="flex flex-col justify-center items-center">
            <div className="stat-value text-success text-lg">{data?.ProfessoresAtivos}</div>
            <div className="stat-desc text-xs">Ativos</div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="stat-value text-error text-lg">{data?.ProfessoresDesativados}</div>
            <div className="stat-desc text-xs">Desativados</div>
          </div>
        </div>
      </div>
    </div>
  );
}
