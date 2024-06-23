"use server";
import prisma from "@/utils/prismaInstance";
import { AgendaAulas } from "@prisma/client";
import moment from "moment";

export const GetProfessorAgenda = async (professorId: string, allPeriodo: boolean, mesAnoFiltro: boolean, onlyWeek: boolean, date?: string) => {
  let agendas: AgendaAulas[] = [];

  try {
    if (onlyWeek) {
      const startDate = moment().startOf("week").toDate();
      const endDate = moment().endOf("week").toDate();

      agendas = await prisma.agendaAulas.findMany({
        where: {
          professorId: professorId !== "all" ? professorId : undefined,
          data: {
            gte: startDate,
            lte: endDate,
          },
        },
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

      return {
        success: true,
        data: agendas,
      };
    }

    if (allPeriodo) {
      agendas = await prisma.agendaAulas.findMany({
        where: {
          professorId: professorId !== "all" ? professorId : undefined,
        },
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

      await prisma.$disconnect();
      return {
        success: true,
        data: agendas,
      };
    }

    if (date) {
      const formattedDate = moment(date, ["YYYY-MM-DD", "YYYY-MM"]).format("YYYY-MM-DD");
      const startDate = moment(formattedDate)
        .startOf(mesAnoFiltro ? "month" : "day")
        .toDate();
      const endDate = moment(formattedDate)
        .endOf(mesAnoFiltro ? "month" : "day")
        .toDate();

      agendas = await prisma.agendaAulas.findMany({
        where: {
          professorId: professorId !== "all" ? professorId : undefined,
          data: {
            gte: startDate,
            lte: endDate,
          },
        },
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

      return {
        success: true,
        data: agendas,
      };
    }

    return {
      error: "Nenhuma agenda encontrada para os critérios fornecidos",
    };
  } catch (error) {
    return {
      error: "Erro interno de servidor",
    };
  }
};
