"use server";

import prisma from "@/utils/prismaInstance";

export const getAllMetas = async (mesAno: string) => {
  try {
    const allMetas = await prisma.metas.findMany({
      where: {
        mesAno: mesAno,
      },
    });

    if (!allMetas || allMetas.length <= 0)
      return {
        success: false,
        message: "Erro ao buscar metas",
        allMetas: [],
      };

    return {
      success: true,
      allMetas,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao buscar metas",
      allMetas: [],
    };
  } finally {
    await prisma.$disconnect();
  }
};
