"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export async function GetAlunosIngressantesSemanal(date?: string) {
  try {
    const targetDate = date ? moment(date) : moment();

    // Se uma data for fornecida, retorna dados do mês da data
    if (date) {
      const startDate = targetDate.startOf("month").toDate();
      const endDate = targetDate.endOf("month").toDate();

      const alunosDoMes = await prisma.aluno.findMany({
        where: {
          ativo: true,
          createdAt: {
            gte: startDate,
            lt: endDate,
          },
        },
      });

      return {
        success: true,
        qtdAlunosNovos: alunosDoMes.length,
        alunosNovos: alunosDoMes,
      };
    }

    // Se nenhuma data for fornecida, retorna dados da semana atual
    const startOfWeek = moment().startOf("week").toDate();
    const endOfWeek = moment().endOf("week").add(1, "day").toDate();

    const alunosDaSemana = await prisma.aluno.findMany({
      where: {
        ativo: true,
        createdAt: {
          gte: startOfWeek,
          lt: endOfWeek,
        },
      },
    });

    return {
      success: true,
      qtdAlunosNovos: alunosDaSemana.length,
      alunosNovos: alunosDaSemana,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}
