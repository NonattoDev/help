"use server";
import prisma from "@/utils/prismaInstance";

export const GetProfessores = async () => {
  const professores = await prisma.professor.findMany({
    where: {
      ativo: true,
    },
  });

  return {
    success: true,
    data: professores,
  };
};
