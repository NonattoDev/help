"use server";
import { AgendaAulas } from "@prisma/client";
import prisma from "../../../../../../../prisma/prismaInstance";
import moment from "moment";

export const GetProfessorAgenda = async (professorId: string, allPeriodo: boolean, mesAnoFiltro: boolean, onlyWeek: boolean, date?: string) => {
  let agendas: AgendaAulas[] = [];

  try {
    if (onlyWeek) {
      const startDate = moment().startOf("week").toDate();
      const endDate = moment().endOf("week").toDate();

      if (professorId === "all") {
        agendas = await prisma.agendaAulas.findMany({
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        });
      } else {
        agendas = await prisma.agendaAulas.findMany({
          where: {
            professorId: professorId,
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        });
      }
    }

    if (allPeriodo) {
      if (professorId === "all") {
        agendas = await prisma.agendaAulas.findMany();
      } else {
        agendas = await prisma.agendaAulas.findMany({
          where: {
            professorId: professorId,
          },
        });
      }
    } else {
      if (date) {
        const formattedDate = moment(date, ["YYYY-MM-DD", "YYYY-MM"]).format("YYYY-MM-DD");
        const startDate = moment(formattedDate)
          .startOf(mesAnoFiltro ? "month" : "day")
          .toDate();
        const endDate = moment(formattedDate)
          .endOf(mesAnoFiltro ? "month" : "day")
          .toDate();

        if (professorId === "all") {
          agendas = await prisma.agendaAulas.findMany({
            where: {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          });
        } else {
          agendas = await prisma.agendaAulas.findMany({
            where: {
              professorId: professorId,
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          });
        }
      }
    }

    if (agendas.length === 0) {
      return {
        error: "Não há agendas para este professor",
      };
    }

    console.log(agendas);
    return {
      success: true,
      data: agendas,
    };
  } catch (error) {
    return {
      error: "Erro interno de servidor",
    };
  }
};
