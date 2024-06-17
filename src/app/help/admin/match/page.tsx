import prisma from "../../../../../prisma/prismaInstance";
import MatchApp from "./components/MatchApp";

const getMatchDados = async () => {
  const alunos = await prisma.aluno.findMany({
    where: {
      AgendaAulas: {
        none: {}, // Isso significa que estamos procurando alunos sem nenhuma AgendaAulas relacionada.
      },
    },
    include: {
      responsavel: true,
      dadosFinanceiro: true,
    },
  });

  return { alunos };
};

export default async function Match() {
  const { alunos } = await getMatchDados();

  return <MatchApp alunos={alunos} />;
}
