"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetTicketMedio = async (date?: string) => {
  const targetDate = date ? moment(date) : moment();
  const startOfMonth = targetDate.startOf("month").toDate();
  const endOfMonth = targetDate.endOf("month").toDate();

  try {
    const FaturamentoMensal = await prisma.aluno.findMany({
      where: {
        ativo: true,
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
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

    let quantidadeAlunos = FaturamentoMensal.length;

    const ValorTotalFaturamento = FaturamentoMensal.reduce((acc, aluno) => {
      // Encontrar o último registro financeiro antes do fim do mês
      const financeiroDoMes = aluno.dadosFinanceiro.find((financeiro) => new Date(financeiro.createdAt) <= endOfMonth);
      if (financeiroDoMes) {
        return acc + financeiroDoMes.valor;
      }
      return acc;
    }, 0);

    const TicketMedio = quantidadeAlunos > 0 ? ValorTotalFaturamento / quantidadeAlunos : 0;

    return {
      success: true,
      TicketMedio,
    };
  } catch (error: any) {
    return {
      success: false,
      TicketMedio: 0,
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
