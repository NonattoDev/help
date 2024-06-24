"use server";

import prisma from "@/utils/prismaInstance";
import { Aluno } from "@prisma/client";

export const GetAlunos = async () => {
  const alunos = await prisma.aluno.findMany({
    where: {
      ativo: true,
    },
  });

  if (alunos.length === 0) {
    return {
      success: false,
      data: [] as Aluno[],
      message: "Nenhum aluno encontrado.",
    };
  }

  await prisma.$disconnect();

  return {
    success: true,
    data: alunos,
  };
};
