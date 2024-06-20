"use server";
import { AgendaAulas } from "@prisma/client";
import prisma from "../../../../../../../prisma/prismaInstance";

export const updateAula = async (agenda: AgendaAulas) => {
  try {
    // Verifica se já existe uma agenda para o professor e aluno com essa data e no intervalo entre horaInicio e horaFinal, ignorando a própria aula
    const agendaExistsForProfessorAndAluno = await prisma.agendaAulas.findFirst({
      where: {
        id: { not: agenda.id },
        data: agenda.data,
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

    // Verifica se já existe uma agenda para o aluno com essa data e no intervalo entre horaInicio e horaFinal, ignorando a própria aula
    const agendaExistsForAluno = await prisma.agendaAulas.findFirst({
      where: {
        id: { not: agenda.id },
        data: agenda.data,
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

    const updatedAgenda = await prisma.agendaAulas.update({
      where: {
        id: agenda.id,
      },
      data: {
        alunoId: agenda.alunoId,
        professorId: agenda.professorId,
        data: agenda.data,
        horaInicio: agenda.horaInicio,
        horaFinal: agenda.horaFinal,
        local: agenda.local,
        duracao: agenda.duracao,
        modalidade: agenda.modalidade,
        finalizada: agenda.finalizada,
        cancelada: agenda.cancelada,
        createdAt: agenda.createdAt,
        updatedAt: new Date(), // Atualiza o campo updatedAt para o momento atual
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

    return {
      success: "Aula atualizada com sucesso",
      data: updatedAgenda,
    };
  } catch (error) {
    console.error("Erro ao salvar a agenda:", error);
    return {
      error: "Erro ao salvar a agenda",
    };
  }
};
