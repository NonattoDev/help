import prisma from "@/utils/prismaInstance";
import MatchApp from "./components/MatchApp";

export const metadata = {
  title: "Help - Match",
};

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

  await prisma.$disconnect();
  return { alunos };
};

export default async function Match() {
  const { alunos } = await getMatchDados();

  return <MatchApp alunos={alunos} />;
}
