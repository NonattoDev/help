"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { getServerSession } from "next-auth";

export const getAllMetas = async (mesAno: string) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return {
        success: false,
        message: "Usuário não autenticado",
        allMetas: [],
        accessLevel: "",
      };
    }

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
        accessLevel: session.user.accessLevel,
      };

    return {
      success: true,
      allMetas,
      accessLevel: session.user.accessLevel,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao buscar metas",
      allMetas: [],
      accessLevel: "",
    };
  } finally {
    await prisma.$disconnect();
  }
};
