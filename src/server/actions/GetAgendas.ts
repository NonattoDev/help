"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { AgendaAulas } from "@prisma/client";
import moment from "moment";
import { getServerSession } from "next-auth";

export const GetAgendas = async (date: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return {
      success: false,
      message: "Usuário não autenticado",
    };
  }

  const { accessLevel, id } = session.user;

  if (accessLevel === "responsavel") {
    const responsavel = await prisma.responsavel.findUnique({
      where: {
        id,
      },
      include: {
        alunos: {
          include: {
            AgendaAulas: {
              where: {
                data: moment(date).toDate(),
              },
              include: {
                professor: true,
                aluno: true,
              },
            },
          },
        },
      },
    });

    if (!responsavel) {
      return {
        success: false,
        message: "Responsável não encontrado",
      };
    }

    await prisma.$disconnect();

    let AgendaAulas: AgendaAulas[] = [];

    responsavel.alunos.map((aluno) => {
      AgendaAulas.push(...aluno.AgendaAulas);
    });

    if (AgendaAulas.length === 0) {
      return {
        success: false,
        message: "Nenhuma aula encontrada para essa data",
      };
    }

    return {
      success: true,
      data: AgendaAulas,
    };
  }

  const Agenda = await prisma.agendaAulas.findMany({
    where: {
      data: moment(date).toDate(),
      ...(accessLevel === "professor" ? { professorId: id } : { alunoId: id }),
    },
    include: {
      professor: true,
      aluno: true,
    },
  });

  await prisma.$disconnect();

  if (Agenda.length === 0) {
    return {
      success: false,
      message: "Nenhuma aula encontrada para essa data",
    };
  }

  return { success: true, data: Agenda };
};
