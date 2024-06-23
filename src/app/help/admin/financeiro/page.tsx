"use client";
import moment from "moment";
import useSWR from "swr";
import { fetchDadosFinancas } from "./actions/GetFinancas";
import "moment/locale/pt-br";
import Status from "./components/Status";

moment.locale("pt-br");

export default function FinanceiroPage() {
  const { data, error } = useSWR("dadosFinancas", fetchDadosFinancas, {
    refreshInterval: 5000,
  });

  if (!data) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados.</div>;

  const { totalAulasRealizadas } = data.data;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Financeiro</h1>
      <h2 className="text-1xl font-bold my-6 text-center">Visão Geral</h2>
      <div className="flex justify-center">
        <Status />
      </div>

      <div className="overflow-x-auto my-8">
        <table className="table-auto w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Aluno</th>
              <th className="px-4 py-2">Professor</th>
              <th className="px-4 py-2">Data da aula</th>
              <th className="px-4 py-2">Hora</th>
              <th className="px-4 py-2">Duração</th>
              <th className="px-4 py-2">Valor da Aula</th>
              <th className="px-4 py-2">Modalidade</th>
              <th className="px-4 py-2">Finalizada</th>
              <th className="px-4 py-2">Cancelada</th>
            </tr>
          </thead>
          <tbody>
            {totalAulasRealizadas.map((aula) => (
              <tr key={aula.id} className="border-t">
                <td className="px-4 py-2">{aula.id}</td>
                <td className="px-4 py-2">{aula.aluno.nome}</td>
                <td className="px-4 py-2">{aula.professor.nome}</td>
                <td className="px-4 py-2">{moment(aula.data).format("DD/MM/YYYY")}</td>
                <td className="px-4 py-2">{aula.horaInicio}</td>
                <td className="px-4 py-2">{aula.duracao}</td>
                <td className="px-4 py-2">{aula.valor_aula.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td className="px-4 py-2">{aula.modalidade}</td>
                <td className="px-4 py-2">{aula.finalizada ? "Sim" : "Não"}</td>
                <td className="px-4 py-2">{aula.cancelada ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
