import prisma from "@/utils/prismaInstance";
import MatchApp from "./components/MatchApp";

const getMatchDados = async () => {
  const alunos = await prisma.aluno.findMany({
    where: {
      ativo: true,
    },
    include: {
      responsavel: true,
      AgendaAulas: true,
    },
  });

  return { alunos };
};

export default async function Match() {
  const { alunos } = await getMatchDados();

  return <MatchApp alunos={alunos} />;
}
