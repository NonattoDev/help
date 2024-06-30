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
      dadosFinanceiro: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  if (alunos && alunos.length > 0) {
    alunos.forEach((aluno) => {
      if (aluno.dadosFinanceiro && aluno.dadosFinanceiro.length > 0) {
        aluno.dadosFinanceiro = aluno.dadosFinanceiro[0] as unknown as any;
      }
    });
  }

  await prisma.$disconnect();
  return { alunos };
};

export default async function Match() {
  const { alunos } = await getMatchDados();

  return <MatchApp alunos={alunos} />;
}
