"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export async function GetAlunosAtivos(data: string) {
  try {
    const alunos = await prisma.aluno.findMany({
      where: {
        ativo: true,
        ...(data && { createdAt: moment(data).toDate() }),
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
