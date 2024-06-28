"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetProfessoresDesativadosMensal = async () => {
  try {
    const startOfMonth = moment().startOf("month").toDate();
    const endOfMonth = moment().endOf("month").toDate();

    const ProfessoresDesativados = await prisma.controleProfessores.findMany({
      where: {
        desativadoEm: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      distinct: ["professorId"],
    });

    return {
      success: true,
      ProfessoresDesativados: ProfessoresDesativados.length,
    };
  } catch (error: any) {
    return {
      success: false,
      ProfessoresDesativados: 0,
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
