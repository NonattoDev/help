import prisma from "@/utils/prismaInstance";

const getRequisicoesMateriais = async () => {
  const MateriaisRequisitados = await prisma.materiaisRequisitados.findMany();

  return { MateriaisRequisitados };
};

export default async function Materiais() {
  const { MateriaisRequisitados } = await getRequisicoesMateriais();
  // Aqui vai haver cards com todas as requisicoes e ao clicar no card abrirá um modal com um big text campo , e com opcao de inserir uma imagem nesse campo. 
  return (
    <div>
      <h1>Requisições de Materiais</h1>
    </div>
  );
}
