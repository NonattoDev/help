"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { PagamentosAluno } from "@prisma/client";
import { getServerSession } from "next-auth";

export const CreatePagamento = async (pagamento: PagamentosAluno) => {
  const session = await getServerSession(authOptions);

  if (!session) return { success: false, message: "Usuário não autenticado" };
  try {
    const pagamentoExists = await prisma.pagamentosAluno.findFirst({
      where: {
        OR: [
          {
            codigoIdentificador: pagamento.codigoIdentificador,
            alunoId: pagamento.alunoId,
          },
          { mesReferencia: pagamento.mesReferencia, anoReferencia: pagamento.anoReferencia, alunoId: pagamento.alunoId },
        ],
      },
    });

    if (pagamentoExists) {
      return {
        success: false,
        message: "Pagamento já foi cadastrado, e não pode ser duplicado!",
      };
    }

    const { id, ...pagamentoData } = pagamento;

    await prisma.pagamentosAluno.create({
      data: {
        ...pagamentoData,
        lancadoPor: session.user.id,
      },
    });

    return {
      success: true,
      message: "Pagamento cadastrado com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao cadastrar pagamento",
    };
  } finally {
    await prisma.$disconnect();
  }
};
