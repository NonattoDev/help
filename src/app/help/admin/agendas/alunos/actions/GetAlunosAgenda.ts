"use server";
import { AgendaAulas } from "@prisma/client";
import prisma from "../../../../../../../prisma/prismaInstance";
import moment from "moment";

export const GetAlunosAgenda = async (alunoId: string, allPeriodo: boolean, mesAnoFiltro: boolean, onlyWeek: boolean, date?: string) => {
  let agendas: AgendaAulas[] = [];

  try {
    if (onlyWeek) {
      const startDate = moment().startOf("week").toDate();
      const endDate = moment().endOf("week").toDate();

      if (alunoId === "all") {
        agendas = await prisma.agendaAulas.findMany({
          where: {
            createdAt: {
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
        });

        return {
          success: true,
          data: agendas,
        };
      } else {
        agendas = await prisma.agendaAulas.findMany({
          where: {
            alunoId: alunoId,
            createdAt: {
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
        });

        return {
          success: true,
          data: agendas,
        };
      }
    }

    if (allPeriodo) {
      if (alunoId === "all") {
        agendas = await prisma.agendaAulas.findMany({
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
        });

        return {
          success: true,
          data: agendas,
        };
      } else {
        agendas = await prisma.agendaAulas.findMany({
          where: {
            alunoId: alunoId,
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
        });

        return {
          success: true,
          data: agendas,
        };
      }
    }

    if (date) {
      const formattedDate = moment(date, ["YYYY-MM-DD", "YYYY-MM"]).format("YYYY-MM-DD");
      const startDate = moment(formattedDate)
        .startOf(mesAnoFiltro ? "month" : "day")
        .toDate();
      const endDate = moment(formattedDate)
        .endOf(mesAnoFiltro ? "month" : "day")
        .toDate();

      if (alunoId === "all") {
        agendas = await prisma.agendaAulas.findMany({
          where: {
            createdAt: {
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
        });

        return {
          success: true,
          data: agendas,
        };
      } else {
        agendas = await prisma.agendaAulas.findMany({
          where: {
            alunoId: alunoId,
            createdAt: {
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
        });

        return {
          success: true,
          data: agendas,
        };
      }
    }

    console.log(agendas);

    return {
      error: "Nenhuma agenda encontrada para os critérios fornecidos",
    };
  } catch (error) {
    return {
      error: "Erro interno de servidor",
    };
  }
};
