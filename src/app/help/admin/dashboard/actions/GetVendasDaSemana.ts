"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetVendasDaSemana = async (date?: string) => {
  const targetDate = date ? moment(date) : moment();
  const startOfWeek = targetDate.startOf("week").toDate();
  const endOfWeek = targetDate.endOf("week").add(1, "day").toDate();

  try {
    const VendasDaSemana = await prisma.aluno.findMany({
      where: {
        createdAt: {
          gte: startOfWeek,
          lt: endOfWeek,
        },
        ativo: true,
      },
      include: {
        dadosFinanceiro: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const ValorTotalDasVendas = VendasDaSemana.reduce((acc, aluno) => {
      // Encontrar o último registro financeiro antes do fim da semana
      const financeiroDaSemana = aluno.dadosFinanceiro.find((financeiro) => new Date(financeiro.createdAt) <= endOfWeek);
      if (financeiroDaSemana) {
        return acc + financeiroDaSemana.valor;
      }
      return acc;
    }, 0);

    return {
      success: true,
      VendasDaSemana,
      ValorTotalDasVendas,
    };
  } catch (error: any) {
    return {
      success: false,
      VendasDaSemana: [],
      ValorTotalDasVendas: 0,
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
