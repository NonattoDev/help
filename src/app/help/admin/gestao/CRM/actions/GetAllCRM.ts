"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetAllCRM = async (date?: string) => {
  try {
    let allCRM = [];
    if (date) {
      allCRM = await prisma.cRM.findMany({
        where: {
          atendimentos: {
            some: {
              dataAtendimento: moment(date).toDate(),
            },
          },
        },
        include: {
          atendimentos: true,
        },
      });
    } else {
      allCRM = await prisma.cRM.findMany({
        include: {
          atendimentos: true,
        },
      });
    }

    if (!allCRM || allCRM.length === 0) {
      return {
        success: false,
        message: "Nenhum CRM encontrado",
        allCRM: [],
      };
    }

    return {
      success: true,
      message: "CRMs encontrados com sucesso",
      allCRM,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao buscar CRM",
      allCRM: [],
    };
  } finally {
    await prisma.$disconnect();
  }
};
