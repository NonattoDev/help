import moment from "moment";
import { fetchDadosFinancas } from "../actions/GetFinancas";
import useSWR from "swr";

export default function TabelaFinanceiro() {
  const { data, error } = useSWR("dadosFinancas", fetchDadosFinancas, {
    refreshInterval: 5000,
  });

  if (!data)
    return (
      <div>
        Carregando tabela... <span className="spinner"></span>
      </div>
    );
  if (error) return <div>Erro ao carregar os dados.</div>;

  const { totalAulasRealizadas } = data.data;

  return (
    <div className="overflow-x-auto my-8">
      <table className="table w-full">
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
  );
}
