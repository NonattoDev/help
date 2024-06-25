"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { getServerSession } from "next-auth";

export const OpenRequisicao = async (requisicao: { alunoId: string; requisicaoMaterial: string; tituloRequisicao: string }) => {
  const session = await getServerSession(authOptions);

  if (!session) return { success: false, data: null, message: "Usuário não autenticado." };

  const openRequisicao = await prisma.materiaisRequisitados.create({
    data: {
      alunoId: requisicao.alunoId,
      professorId: session?.user.id,
      titulo: requisicao?.tituloRequisicao,
      material: requisicao?.requisicaoMaterial,
    },
  });

  if (!openRequisicao) return { success: false, data: null, message: "Erro ao abrir requisição." };

  return { success: true, data: openRequisicao, message: "Requisição aberta com sucesso, aguarde até 48horas para a requisição ser atendida." };
};
