import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import EditColaborador from "@/components/EditForms/EditColaborador/EditColaborador";
import { Usuarios, UsuariosFinanceiro } from "@prisma/client";

async function getDados(id: string) {
  let session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const colaborador = await prisma.usuarios.findUnique({
    where: {
      id: id,
    },
    include: {
      financeiro: true,
    },
  });

  await prisma.$disconnect();

  if (colaborador) {
    return { colaborador, session };
  }

  redirect("/");
}

export default async function adminEditProfessor({ params }: { params: { id: string } }) {
  const { colaborador, session } = await getDados(params.id);

  return <EditColaborador colaborador={colaborador as Usuarios & { financeiro: UsuariosFinanceiro }} accessLevel={session?.user.accessLevel} />;
}
