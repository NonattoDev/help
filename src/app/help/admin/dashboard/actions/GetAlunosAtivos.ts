"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export async function GetAlunosAtivos(date?: string) {
  try {
    const targetDate = date ? moment(date) : moment();
    const startDate = targetDate.startOf("month").toDate();
    const endDate = targetDate.endOf("month").toDate();

    const alunos = await prisma.aluno.findMany({
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
      data: alunos.length,
      alunos,
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
