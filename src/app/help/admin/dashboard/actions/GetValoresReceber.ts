"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetValoresReceber = async (date?: string) => {
  const targetDate = date ? moment(date) : moment();
  const startDate = targetDate.startOf("month").toDate();
  const endDate = targetDate.endOf("month").toDate();

  try {
    const alunosAtivos = await prisma.aluno.findMany({
      where: {
        ativo: true,
        dadosFinanceiro: {
          some: {
            createdAt: {
              lte: endDate,
            },
          },
        },
      },
      include: {
        dadosFinanceiro: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const aReceber = alunosAtivos.reduce((acc, aluno) => {
      // Encontrar o último registro financeiro antes do fim do mês
      const financeiroDoMes = aluno.dadosFinanceiro.find((financeiro) => new Date(financeiro.createdAt) <= endDate);
      if (financeiroDoMes) {
        return acc + financeiroDoMes.valor;
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
