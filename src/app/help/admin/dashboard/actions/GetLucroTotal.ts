"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetLucroTotal = async (date?: string) => {
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

    const aReceber = alunosAtivos.reduce((acc, curr) => {
      // Encontrar o último registro financeiro antes do fim do mês
      const financeiroDoMes = curr.dadosFinanceiro.find((financeiro) => new Date(financeiro.createdAt) <= endDate);
      if (financeiroDoMes) {
        return acc + financeiroDoMes.valor;
      }
      return acc;
    }, 0);

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
      const financeiroDoMes = curr.financeiro.find((financeiro) => new Date(financeiro.createdAt) <= endDate);
      if (financeiroDoMes) {
        return acc + financeiroDoMes.valor;
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
