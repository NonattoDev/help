"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetAlunosDesativadosMensal = async (date?: string) => {
  const targetDate = date ? moment(date) : moment();
  const startOfMonth = targetDate.startOf("month").toDate();
  const endOfMonth = targetDate.endOf("month").toDate();

  try {
    const alunosDesativadosMes = await prisma.controleAlunos.findMany({
      where: {
        desativadoEm: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      distinct: ["alunoId"],
    });

    return {
      success: true,
      AlunosDesativados: alunosDesativadosMes.length,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      AlunosDesativados: 0,
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
