"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetProfessoresTotal = async (date?: string) => {
  try {
    const targetDate = date ? moment(date) : moment();
    const startOfMonth = targetDate.startOf("month").toDate();
    const endOfMonth = targetDate.endOf("month").toDate();

    const ProfessoresAtivos = await prisma.professor.count({
      where: {
        ativo: true,
      },
    });

    const ProfessoresDesativados = await prisma.professor.count({
      where: {
        ativo: false,
      },
    });

    return {
      success: true,
      ProfessoresAtivos,
      ProfessoresDesativados,
    };
  } catch (error: any) {
    return {
      success: false,
      ProfessoresAtivos: 0,
      ProfessoresDesativados: 0,
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
