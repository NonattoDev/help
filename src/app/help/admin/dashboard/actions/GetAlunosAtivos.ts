"use server";

import prisma from "@/utils/prismaInstance";
import moment from "moment";

export async function GetAlunosAtivos(data: any) {
  try {
    const alunos = await prisma.aluno.findMany({
      where: {
        ativo: true,
        ...(data && { createdAt: moment(data).toDate() }),
      },
    });

    const alunosAtivos = await prisma.aluno.findMany({
      where: {
        ativo: true,
      },
    });

    let comparativoMeses = 0;

    return {
      success: true,
      data: alunos.length,
      comparativoMeses,
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
