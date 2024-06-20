import prisma from "../../../../../prisma/prismaInstance";
import MatchApp from "./components/MatchApp";

const getMatchDados = async () => {
  const alunos = await prisma.aluno.findMany({
    where: {
      ativo: true,
    },
    include: {
      responsavel: true,
      dadosFinanceiro: true,
      AgendaAulas: true,
    },
  });

  return { alunos };
};

export default async function Match() {
  const { alunos } = await getMatchDados();

  return <MatchApp alunos={alunos} />;
}
