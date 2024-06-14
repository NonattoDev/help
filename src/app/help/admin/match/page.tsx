// O app do matcher é responsável por gerenciar as configurações de match entre os professores e alunos, gerenciando também a agenda de ambos para que não haja conflitos. O app é composto por 3 páginas: a primeira é a página de configuração de match, onde o administrador pode definir as regras de match, como por exemplo, a quantidade de alunos que um professor pode atender, a quantidade de professores que um aluno pode ter, entre outras. A segunda página é a página de match, onde o administrador pode visualizar os matchs que foram feitos e a terceira página é a página de agenda, onde o administrador pode visualizar a agenda dos professores e alunos e verificar se há algum conflito de horário.

import prisma from "../../../../../prisma/prismaInstance";

const getMatchDados = async () => {
  const alunos = await prisma.aluno.findMany({
    include: {
      responsavel: true,
      AgendaAulas: true,
      dadosFinanceiro: true,
    },
  });

  return { alunos };
};

export default async function MatchApp() {
  const { alunos } = await getMatchDados();
  return <div>MatchApp</div>;
}
