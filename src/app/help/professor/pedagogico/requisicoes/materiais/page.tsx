import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { MateriaisRequisitados } from "@prisma/client";
import { getServerSession } from "next-auth";

const getRequisicoesMateriais = async () => {
  const session = await getServerSession(authOptions);

  const MateriaisRequisitados = await prisma.materiaisRequisitados.findMany({
    where: {
      professorId: session?.user?.id,
    },
  });

  if (MateriaisRequisitados.length === 0) {
    return { MateriaisRequisitados: [] as MateriaisRequisitados[] };
  }

  await prisma.$disconnect();

  return { MateriaisRequisitados };
};

export default async function Materiais() {
  const { MateriaisRequisitados } = await getRequisicoesMateriais();
  // Aqui vai haver cards com todas as requisicoes e ao clicar no card abrirá um modal com um big text campo , e com opcao de inserir uma imagem nesse campo.
  return (
    <div>
      <h1>Requisições de Materiais</h1>
      <div>
        {MateriaisRequisitados.map((requisicao) => (
          <div key={requisicao.id}>
            <h2>{requisicao.material}</h2>
            <p>{requisicao.concluidoPor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
