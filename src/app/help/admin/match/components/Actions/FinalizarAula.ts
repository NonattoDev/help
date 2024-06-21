"use server";

import prisma from "../../../../../../../prisma/prismaInstance";

export const FinalizarAula = async (aulaId: string) => {
  const finalizarAula = await prisma.agendaAulas.update({
    where: {
      id: aulaId,
    },
    data: {
      finalizada: true,
    },
    include: {
      aluno: true,
      professor: true,
    },
  });

  return {
    success: `A aula do aluno ${finalizarAula.aluno.nome} com o professor ${finalizarAula.professor.nome} foi finalizada com sucesso!`,
    data: finalizarAula,
  };
};
