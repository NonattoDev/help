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

  // Após finalizar a aula, é necessário inserir na tabela de financeiros

  const valores = await prisma.valores.findFirst();
  console.log(valores);

  return {
    success: `A aula do aluno ${finalizarAula.aluno.nome} com o professor ${finalizarAula.professor.nome} foi finalizada com sucesso!`,
    data: finalizarAula,
  };
};
