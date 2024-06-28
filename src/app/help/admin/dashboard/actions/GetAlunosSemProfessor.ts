"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export async function GetAlunosSemProfessor(date?: string) {
  try {
    const targetDate = date ? moment(date) : moment();
    const startOfWeek = targetDate.startOf("week").toDate();
    const endOfWeek = targetDate.endOf("week").add(1, "day").toDate();

    const alunos = await prisma.aluno.findMany({
      where: {
        ativo: true,
        AND: [
          {
            OR: [
              {
                AgendaAulas: {
                  none: {}, // Verifica se o aluno não possui nenhuma aula marcada
                },
              },
              {
                AgendaAulas: {
                  every: {
                    cancelada: true, // Verifica se todas as aulas foram canceladas
                    finalizada: false, // Verifica se nenhuma aula foi finalizada
                  },
                },
              },
            ],
          },
          {
            createdAt: {
              gte: startOfWeek,
              lt: endOfWeek,
            },
          },
        ],
      },
    });

    return {
      success: true,
      quantidadeAlunos: alunos.length,
      listaAlunos: alunos,
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
