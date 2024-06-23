"use server";
import prisma from "@/utils/prismaInstance";
import { AgendaAulas } from "@prisma/client";
import moment from "moment";

export const GetAlunosAgenda = async (alunoId: string, mesAnoFiltro: boolean, onlyWeek: boolean, date?: string) => {
  let agendas: AgendaAulas[] = [];

  try {
    let whereClause: any = {};

    if (alunoId !== "all") {
      whereClause.alunoId = alunoId;
    }

    if (onlyWeek) {
      const startDate = moment().startOf("week").toDate();
      const endDate = moment().endOf("week").toDate();
      whereClause.data = {
        gte: startDate,
        lte: endDate,
      };
    } else if (date) {
      const formattedDate = moment(date, ["YYYY-MM-DD", "YYYY-MM"]).format("YYYY-MM-DD");
      const startDate = moment(formattedDate)
        .startOf(mesAnoFiltro ? "month" : "day")
        .toDate();
      const endDate = moment(formattedDate)
        .endOf(mesAnoFiltro ? "month" : "day")
        .toDate();
      whereClause.data = {
        gte: startDate,
        lte: endDate,
      };
    }

    agendas = await prisma.agendaAulas.findMany({
      where: whereClause,
      include: {
        professor: {
          select: {
            nome: true,
            endereco: true,
          },
        },
        aluno: {
          select: {
            nome: true,
            endereco: true,
          },
        },
      },
      orderBy: {
        data: "asc", // Ordenar por data em ordem ascendente
      },
    });

    if (agendas.length > 0) {
      await prisma.$disconnect();
      return {
        success: true,
        data: agendas,
      };
    } else {
      return {
        error: "Nenhuma agenda encontrada para os critérios fornecidos",
      };
    }
  } catch (error) {
    return {
      error: "Erro interno de servidor",
    };
  }
};
