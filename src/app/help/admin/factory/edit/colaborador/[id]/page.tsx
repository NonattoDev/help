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
      financeiro: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });

  await prisma.$disconnect();

  if (colaborador) {
    // Garantir que estamos retornando apenas o objeto financeiro mais recente
    const colaboradorComFinanceiro = {
      ...colaborador,
      financeiro: colaborador.financeiro[0], // Pega o primeiro (e único) elemento do array
    };

    return { colaborador: colaboradorComFinanceiro, session };
  }

  redirect("/");
}

export default async function adminEditProfessor({ params }: { params: { id: string } }) {
  const { colaborador, session } = await getDados(params.id);

  return <EditColaborador colaborador={colaborador as Usuarios & { financeiro: UsuariosFinanceiro }} accessLevel={session?.user.accessLevel} />;
}
