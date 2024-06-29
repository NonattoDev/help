"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export async function GetAlunosAtivos(date?: string) {
  try {
    const targetDate = date ? moment(date) : moment();
    const startDate = targetDate.startOf("month").toDate();
    const endDate = targetDate.endOf("month").toDate();

    const prevMonthStartDate = targetDate.clone().subtract(1, "month").startOf("month").toDate();
    const prevMonthEndDate = targetDate.clone().subtract(1, "month").endOf("month").toDate();

    const alunosCurrentMonth = await prisma.aluno.findMany({
      where: {
        ativo: true,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    const alunosPrevMonth = await prisma.aluno.findMany({
      where: {
        ativo: true,
        createdAt: {
          gte: prevMonthStartDate,
          lt: prevMonthEndDate,
        },
      },
    });

    const currentMonthCount = alunosCurrentMonth.length;
    const prevMonthCount = alunosPrevMonth.length;

    let porcentagemAmaisqueMesAnterior;
    if (prevMonthCount === 0) {
      porcentagemAmaisqueMesAnterior = currentMonthCount > 0 ? 100 : 0;
    } else {
      porcentagemAmaisqueMesAnterior = ((currentMonthCount - prevMonthCount) / prevMonthCount) * 100;
    }

  

    return {
      success: true,
      data: currentMonthCount,
      alunos: alunosCurrentMonth,
      porcentagemAmaisqueMesAnterior,
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
