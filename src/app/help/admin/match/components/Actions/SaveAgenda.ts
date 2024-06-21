"use server";
import { AgendaAulas } from "@prisma/client";
import prisma from "../../../../../../../prisma/prismaInstance";
import moment from "moment";

export const saveAgenda = async (agenda: AgendaAulas) => {
  try {
    // Verifica se já existe uma agenda para o professor e aluno com essa data e no intervalo entre horaInicio e horaFinal
    const agendaExistsForProfessorAndAluno = await prisma.agendaAulas.findFirst({
      where: {
        data: moment(agenda.data).toDate(),
        professorId: agenda.professorId,
        alunoId: agenda.alunoId,
        OR: [
          {
            horaInicio: {
              lte: agenda.horaFinal,
            },
            horaFinal: {
              gte: agenda.horaInicio,
            },
          },
        ],
      },
    });

    if (agendaExistsForProfessorAndAluno) {
      return {
        error: "Já existe uma aula agendada para esse professor e aluno nesse horário",
      };
    }

    // Verifica se já existe uma agenda para o aluno com essa data e no intervalo entre horaInicio e horaFinal
    const agendaExistsForAluno = await prisma.agendaAulas.findFirst({
      where: {
        data: moment(agenda.data).toDate(),
        alunoId: agenda.alunoId,
        OR: [
          {
            horaInicio: {
              lte: agenda.horaFinal,
            },
            horaFinal: {
              gte: agenda.horaInicio,
            },
          },
        ],
      },
    });

    if (agendaExistsForAluno) {
      return {
        error: "O aluno já tem uma aula agendada nesse horário com outro professor",
      };
    }

    const insertAgenda = await prisma.agendaAulas.create({
      data: {
        ...agenda,
        data: moment(agenda.data).toDate(),
      },
      include: {
        aluno: {
          select: {
            nome: true,
            endereco: true,
          },
        },
        professor: {
          select: {
            nome: true,
            endereco: true,
          },
        },
      },
    });

    console.log(insertAgenda);

    return {
      success: "Agenda salva com sucesso",
      data: insertAgenda,
    };
  } catch (error) {
    console.error("Erro ao salvar a agenda:", error);
    return {
      error: "Erro ao salvar a agenda",
    };
  }
};
