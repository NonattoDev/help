"use server";
import { AgendaAulas } from "@prisma/client";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const updateAula = async (agenda: AgendaAulas) => {
  console.log("Atualizando aula:", agenda);
  // Obter a aula original do banco de dados
  const originalAula = await prisma.agendaAulas.findUnique({
    where: { id: agenda.id },
  });

  if (!originalAula) {
    return {
      error: "Aula não encontrada",
    };
  }

  const originalData = moment(originalAula.data);
  const newData = moment(agenda.data);

  // Se a data original e a nova data estiverem no mesmo mês, não verifique o limite de aulas
  if (!originalData.isSame(newData, "month")) {
    // Obter o início e o fim do mês da nova data da aula
    const startOfMonth = newData.startOf("month").toDate();
    const endOfMonth = newData.endOf("month").toDate();

    // Verificar quantas aulas o aluno já tem no mês da nova data da aula
    const qtdAulasMes = await prisma.agendaAulas.count({
      where: {
        alunoId: agenda.alunoId,
        data: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    // Verificar o percentual de aulas do aluno
    const pctAulasAluno = await prisma.aluno.findFirst({
      where: {
        id: agenda.alunoId,
      },
      select: {
        dadosFinanceiro: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    if (!pctAulasAluno || !pctAulasAluno.dadosFinanceiro[0]) {
      return {
        error: "Aluno ou dados financeiros não encontrados",
      };
    }

    const dadosFinanceiro = pctAulasAluno.dadosFinanceiro[0];

    // Verificar se o aluno atingiu o limite de aulas no mês
    if (dadosFinanceiro.qtdAulas <= qtdAulasMes) {
      return {
        error: "O aluno já atingiu o limite de aulas no mês",
      };
    }
  }

  try {
    // Verifica se já existe uma agenda para o professor e aluno com essa data e no intervalo entre horaInicio e horaFinal, ignorando a própria aula
    const agendaExistsForProfessorAndAluno = await prisma.agendaAulas.findFirst({
      where: {
        id: { not: agenda.id },
        data: agenda.data,
        professorId: agenda.professorId,
        alunoId: agenda.alunoId,
        AND: [
          {
            horaInicio: {
              lte: agenda.horaFinal,
            },
          },
          {
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
        AND: [
          {
            horaInicio: {
              lte: agenda.horaFinal,
            },
          },
          {
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

    // Verifica se já existe uma agenda para o professor com essa data e no intervalo entre horaInicio e horaFinal, ignorando a própria aula
    const agendaExistsForProfessor = await prisma.agendaAulas.findFirst({
      where: {
        id: { not: agenda.id },
        data: agenda.data,
        professorId: agenda.professorId,
        AND: [
          {
            horaInicio: {
              lte: agenda.horaFinal,
            },
          },
          {
            horaFinal: {
              gte: agenda.horaInicio,
            },
          },
        ],
      },
    });

    if (agendaExistsForProfessor) {
      return {
        error: "O professor já tem uma aula agendada nesse horário",
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
        materia: agenda.materia,
        finalizada: agenda.finalizada,
        cancelada: agenda.cancelada,
        createdAt: agenda.createdAt,
        updatedAt: new Date(),
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
    await prisma.$disconnect();
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
