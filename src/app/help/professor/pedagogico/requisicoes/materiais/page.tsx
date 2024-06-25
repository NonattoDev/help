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
      <h1 className="text-1xl font-semibold text-center">Requisições de Materiais não atendidas</h1>
      <AbrirRequisicao />
      <RequisicoesProfessor MateriaisRequisitados={MateriaisRequisitados} />
    </div>
  );
}
