import useSWR from "swr";
import { fetchDadosFinancas } from "../actions/GetFinancas";
import moment from "moment";

export default function Status({ professorId }: { professorId: string | null }) {
  const { data, error } = useSWR(professorId ? ["dadosFinancas", professorId] : "dadosFinancas", () => fetchDadosFinancas(professorId), {
    refreshInterval: 5000,
  });

  if (!data) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados.</div>;

  const { aulasRealizadas, aulasCanceladasComValor, totalAulasRealizadas, valorTransporteAtual } = data.data;

  const totalAulasValor = aulasRealizadas.reduce((acc, aula) => {
    const valorAula = aula.modalidade === "PRESENCIAL" ? aula.valor_aula + valorTransporteAtual?.valor! : aula.valor_aula;
    return acc + valorAula;
  }, 0);

  return (
    <div className="flex justify-center">
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Aulas Realizadas</div>
          <div className="stat-value">{aulasRealizadas.length}</div>
          <div className="stat-desc">Aulas que ainda não foram pagas</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Aulas Canceladas</div>
          <div className="stat-value text-error">{aulasCanceladasComValor.length}</div>
          <div className="stat-desc">Aulas canceladas após o prazo limite</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Previsão de Pagamento</div>
          <div className="stat-value">{totalAulasRealizadas.length}</div>
          <div className="stat-desc">Aulas previstas para pagamento até o final da semana</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Valor do Transporte</div>
          <div className="stat-value">{valorTransporteAtual?.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
          <div className="stat-desc">Valor do transporte até {moment().format("DD/MM/YYYY")}</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-title">Total a Pagar Semanal</div>
          <div className="stat-value">{totalAulasValor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</div>
          <div className="stat-desc">Inclui transporte para aulas presenciais</div>
        </div>
      </div>
    </div>
  );
}
