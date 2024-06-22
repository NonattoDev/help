"use client";
import moment from "moment";
import useSWR from "swr";
import { fetchDadosFinancas } from "./actions/GetFinancas";

export default function FinanceiroPage() {
  const { data, error } = useSWR("dadosFinancas", fetchDadosFinancas, {
    refreshInterval: 5000, // Atualiza a cada 1 segundo
  });

  if (!data) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados.</div>;

  const { aulasRealizadas, aulasCanceladasComValor, totalAulasRealizadas } = data.data;

  return (
    <div>
      <h1>Financeiro works!!</h1>
      <div>Existem {aulasRealizadas.length} aulas realizadas que ainda não foram pagas.</div>
      <div>Existem {aulasCanceladasComValor.length} aulas que foram canceladas após o prazo limite</div>
      <div>Existe uma previsão de pagamento de {totalAulasRealizadas.length} aulas até o final da semana</div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Aluno</th>
              <th>Professor</th>
              <th>Data da aula</th>
              <th>Hora</th>
              <th>Duração</th>
              <th>Valor da Aula</th>
              <th>Modalidade</th>
              <th>Finalizada</th>
              <th>Cancelada</th>
            </tr>
          </thead>
          <tbody>
            {totalAulasRealizadas.map((aula) => (
              <tr key={aula.id}>
                <td>{aula.id}</td>
                <td>{aula.aluno.nome}</td>
                <td>{aula.professor.nome}</td>
                <td>{moment(aula.data).format("DD/MM/YYYY")}</td>
                <td>{aula.horaInicio}</td>
                <td>{aula.duracao}</td>
                <td>{aula.valor_aula}</td>
                <td>{aula.modalidade}</td>
                <td>{aula.finalizada ? "Sim" : "Não"}</td>
                <td>{aula.cancelada ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
