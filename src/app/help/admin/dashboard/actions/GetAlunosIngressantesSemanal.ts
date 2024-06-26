"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export async function GetAlunosIngressantesSemanal() {
  try {
    // Determina o início e o fim da semana (domingo anterior e domingo seguinte)
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week").add(1, "day");

    const alunos = await prisma.aluno.findMany({
      where: {
        ativo: true,
        createdAt: {
          gte: startOfWeek.toDate(),
          lt: endOfWeek.toDate(),
        },
      },
    });

    return {
      success: true,
      qtdAlunosNovos: alunos.length,
      alunosNovos: alunos
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
