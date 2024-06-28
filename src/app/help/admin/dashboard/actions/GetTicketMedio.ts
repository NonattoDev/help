"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetTicketMedio = async () => {
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");

  const FaturamentoMensal = await prisma.aluno.findMany({
    where: {
      ativo: true,
      createdAt: {
        gte: moment(startOfMonth).toDate(),
        lte: moment(endOfMonth).toDate(),
      },
    },
    include: {
      dadosFinanceiro: true,
    },
  });

  let quantidadeAlunos = FaturamentoMensal.length;

  const ValorTotalFaturamento = FaturamentoMensal.reduce((acc, aluno) => {
    return acc + (aluno.dadosFinanceiro?.valor || 0);
  }, 0);

  const TicketMedio = ValorTotalFaturamento / quantidadeAlunos;

  try {
    return {
      success: true,
      TicketMedio,
    };
  } catch (error: any) {
    return {
      success: false,
      GetTicketMedio: 0,
    };
  } finally {
    await prisma.$disconnect();
  }
};
