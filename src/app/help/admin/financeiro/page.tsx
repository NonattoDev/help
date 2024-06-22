import moment from "moment";
import prisma from "../../../../../prisma/prismaInstance";

const getDadosFinancas = async () => {
  const startOfWeek = moment().startOf("week").toDate(); // Domingo desta semana
  const endOfWeek = moment().endOf("week").toDate(); // Sábado desta semana

  // Verifica no banco de agendamentos de aulas no momento que entrar na página, as aulas que já aconteceram e não foram pagas
  const aulasRealizadas = await prisma.agendaAulas.findMany({
    where: {
      finalizada: true,
    },
  });

  const aulasCanceladasComValor = await prisma.agendaAulas.findMany({
    where: {
      cancelada: true,
      valor_aula: {
        not: 0,
      },
    },
  });

  const totalAulasRealizadas = await prisma.agendaAulas.findMany({
    where: {
      data: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
    include: {
      aluno: true,
      professor: true,
    },
  });

  return {
    aulasRealizadas,
    aulasCanceladasComValor,
    totalAulasRealizadas,
  };
};

export default async function FinanceiroPage() {
  const { aulasRealizadas, aulasCanceladasComValor, totalAulasRealizadas } = await getDadosFinancas();
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
              <tr>
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
