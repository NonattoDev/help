"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export async function GetAlunosSemProfessor() {
  try {
    // Determina o início e o fim da semana (domingo anterior e domingo seguinte)
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week").add(1, "day");

    const alunos = await prisma.aluno.findMany({
      where: {
        ativo: true,
        AgendaAulas: {
          none: {}, // Verifica se o aluno não possui nenhuma aula marcada
        },
        createdAt: {
          gte: startOfWeek.toDate(),
          lt: endOfWeek.toDate(),
        },
      },
    });

    return {
      success: true,
      data: alunos.length,
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
