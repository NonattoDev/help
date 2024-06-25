"use server";
import prisma from "@/utils/prismaInstance";

export const GetProfessores = async () => {
  const professores = await prisma.professor.findMany({
    where: {
      ativo: true,
    },
  });

  await prisma.$disconnect();

  return {
    success: true,
    data: professores,
  };
};
