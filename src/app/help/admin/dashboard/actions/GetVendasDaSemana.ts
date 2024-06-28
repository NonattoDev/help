"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetVendasDaSemana = async () => {
  const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
  const endOfWeek = moment().endOf("week").format("YYYY-MM-DD");
  
  try {
    const VendasDaSemana = await prisma.aluno.findMany({
      where: {
        createdAt: {
          gte: moment(startOfWeek).toDate(),
          lte: moment(endOfWeek).toDate(),
        },
        ativo: true,
      },
      include: {
        dadosFinanceiro: true,
      },
    });

    const ValorTotalDasVendas = VendasDaSemana.reduce((acc, aluno) => {
      return acc + (aluno.dadosFinanceiro?.valor || 0);
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
    };
  } finally {
    await prisma.$disconnect();
  }
};
