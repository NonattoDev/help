import RequisicoesProfessor from "@/app/help/professor/pedagogico/requisicoes/materiais/RequisicoesProfessor";
import prisma from "@/utils/prismaInstance";

export const metadata = {
  title: "Materiais Requisitados",
};

const getRequisicoesMateriais = async () => {
  const MateriaisRequisitados = await prisma.materiaisRequisitados.findMany({
    where: {
      status: "pendente",
    },
  });

  await prisma.$disconnect();

  return { MateriaisRequisitados };
};

export default async function Materiais() {
  const { MateriaisRequisitados } = await getRequisicoesMateriais();
  // Aqui vai haver cards com todas as requisicoes e ao clicar no card abrirá um modal com um big text campo , e com opcao de inserir uma imagem nesse campo.
  return (
    <div>
      <h1 className="text-1xl font-semibold text-center">Requisições de Materiais não atendidas</h1>
      <RequisicoesProfessor MateriaisRequisitados={MateriaisRequisitados} />
    </div>
  );
}
