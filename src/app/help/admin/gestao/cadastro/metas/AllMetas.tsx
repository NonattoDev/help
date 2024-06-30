"use client";
import useSWR from "swr";
import { getAllMetas } from "./actions/GetAllMetas";
import { Metas } from "@prisma/client";
import moment from "moment";
import "moment/locale/pt-br";

export default function AllMetas({ date }: { date: string }) {
  const { data, error, isLoading } = useSWR(["metas", date], () => getAllMetas(date));

  if (isLoading) return <div className="table skeleton w-full h-32"></div>;
  if (error) return <div>Erro ao carregar</div>;

  const allMetas: Metas[] | undefined = data?.allMetas;
  const accessLevel = data?.accessLevel;

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl text-center font-bold mb-4">Metas de {moment(date).format("MMMM")}</h1>
      <table className="table w-full">
        <thead>
          <tr>
            {accessLevel === "administrador" && <th>Faturamento</th>}
            <th>Vendas</th>
            <th>Alunos Ativos</th>
            <th>Mês/Ano</th>
          </tr>
        </thead>
        <tbody>
          {allMetas?.map((meta) => (
            <tr key={meta.id}>
              {accessLevel === "administrador" && (
                <td>
                  {meta.faturamento.toLocaleString("pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              )}
              <td>{meta.vendas}</td>
              <td>{meta.alunosAtivos}</td>
              <td>{moment(meta.mesAno).format("MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
