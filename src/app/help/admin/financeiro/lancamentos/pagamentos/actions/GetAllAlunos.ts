"use server";

import prisma from "@/utils/prismaInstance";

export const GetAllAlunos = async () => {
  try {
    const alunos = await prisma.aluno.findMany();

    return {
      success: true,
      message: "Alunos encontrados com sucesso",
      alunos,
    };
  } catch (error) {
    return {
      success: false,
      alunos: [],
      message: "Erro ao buscar alunos",
    };
  } finally {
    await prisma.$disconnect();
  }
};
