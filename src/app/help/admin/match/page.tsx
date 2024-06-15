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

  console.log(alunos);

  return { alunos };
};

export default async function Match() {
  const { alunos } = await getMatchDados();

  return (
    <div>
      <h2 className="text-center text-2xl text-bold text-black">MatchApp</h2>
      <MatchApp alunos={alunos} />
    </div>
  );
}
