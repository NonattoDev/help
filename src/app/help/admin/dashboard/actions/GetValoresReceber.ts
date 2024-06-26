"use server";
import prisma from "@/utils/prismaInstance";

export const GetValoresReceber = async () => {
  try {
    const alunosAtivos = await prisma.aluno.findMany({
      where: {
        ativo: true,
      },
      include: {
        dadosFinanceiro: true,
      },
    });

    const aReceber = alunosAtivos.reduce((acc, curr) => {
      if (curr.dadosFinanceiro) {
        const valorNumerico = curr.dadosFinanceiro.valor;
        return acc + valorNumerico;
      }
      return acc;
    }, 0);

    return {
      success: true,
      data: aReceber,
    };
  } catch (error: any) {
    return {
      success: false,
      data: 0,
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
