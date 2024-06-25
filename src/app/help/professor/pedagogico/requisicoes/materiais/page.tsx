import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { MateriaisRequisitados } from "@prisma/client";
import { getServerSession } from "next-auth";
import AbrirRequisicao from "./AbrirRequisicao";
import RequisicoesProfessor from "./RequisicoesProfessor";

export const metadata = {
  title: "Requisições de Materiais",
};
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
  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Requisições de Materiais</h1>
      {/* Aqui havéra um client component que o professor poderá solicitar materiais para o pedagógico. */}
      <AbrirRequisicao />
      {/* Mostrar em cards os materiais que professor já solicitou e o status de cada um, podendo também cancelar a solicitação. */}
      <RequisicoesProfessor  MateriaisRequisitados={MateriaisRequisitados}/>
    </div>
  );
}
