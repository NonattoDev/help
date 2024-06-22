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
    </div>
  );
}
