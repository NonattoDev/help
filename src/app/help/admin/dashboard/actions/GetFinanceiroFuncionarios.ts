"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetFinanceiroFuncionarios = async (date?: string) => {
  try {
    const targetDate = date ? moment(date) : moment();
    const startDate = targetDate.startOf("month").toDate();
    const endDate = targetDate.endOf("month").toDate();

    const aPagarFuncionarios = await prisma.usuarios.findMany({
      include: {
        financeiro: {
          orderBy: {
            createdAt: "desc",
          },
          where: {
            createdAt: {
              lte: endDate,
            },
          },
        },
      },
    });

    const aPagar = aPagarFuncionarios.reduce((acc, curr) => {
      // Encontrar o último registro financeiro antes do fim do mês
      const financeiroDoMes = curr.financeiro.find((financeiro) => new Date(financeiro.createdAt) <= endDate);
      if (financeiroDoMes) {
        return acc + financeiroDoMes.valor;
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
