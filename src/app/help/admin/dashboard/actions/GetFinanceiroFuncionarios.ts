"use server";
import prisma from "@/utils/prismaInstance";

export const GetFinanceiroFuncionarios = async () => {
  try {
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

    return {
      success: true,
      data: aPagar,
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
