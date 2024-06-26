"use server";
import prisma from "@/utils/prismaInstance";

export const GetLucroTotal = async () => {
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

    const aPagarFuncionarios = await prisma.usuarios.findMany({
      include: {
        financeiro: true,
      },
    });

    const aPagar = aPagarFuncionarios.reduce((acc, curr) => {
      if (curr.financeiro) {
        return acc + curr.financeiro.valor;
      }
      return acc;
    }, 0);

    const LucroTotal = aReceber - aPagar;

    return {
      success: true,
      LucroTotal,
    };
  } catch (error: any) {
    return {
      success: false,
      LucroTotal: 0,
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
