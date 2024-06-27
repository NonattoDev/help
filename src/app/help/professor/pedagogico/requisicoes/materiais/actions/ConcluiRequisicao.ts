"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { getServerSession } from "next-auth";

export const ConcluiRequisicao = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      success: false,
      message: "Você não está autenticado!",
    };
  }

  try {
    const Concluir = await prisma.materiaisRequisitados.update({
      where: {
        id,
      },
      data: {
        status: "concluido",
        concluidoPor: session.user.nome,
      },
    });

    return {
      success: true,
      data: Concluir,
    };
  } catch (error) {
    return {
      success: false,
      message: "Erro ao concluir a requisição.",
    };
  } finally {
    await prisma.$disconnect();
  }
};
