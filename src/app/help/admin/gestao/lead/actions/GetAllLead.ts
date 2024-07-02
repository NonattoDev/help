"use server";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const GetAllLead = async (date?: string) => {
  try {
    let allLeads = [];
    if (date && moment(date).format("YYYY-MM-DD") !== moment().format("YYYY-MM-DD")) {
      allLeads = await prisma.lead.findMany({
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
      allLeads = await prisma.lead.findMany({
        include: {
          atendimentos: true,
        },
      });
    }

    if (!allLeads || allLeads.length === 0) {
      return {
        success: false,
        message: "Nenhum lead encontrado",
        allLeads: [],
      };
    }

    return {
      success: true,
      message: "Leads encontrados com sucesso",
      allLeads,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao buscar Lead",
      allLeads: [],
    };
  } finally {
    await prisma.$disconnect();
  }
};
