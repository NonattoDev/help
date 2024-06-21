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

  // const insertAula = await prisma.financeiro.create({
  //   data: {
  //     alunoId: finalizarAula.aluno.id,
  //     professorId: finalizarAula.professor.id,
  //     valor: finalizarAula.valor,
  //     tipo: "Aula",
  //     data: new Date(),
  //     aulaId: finalizarAula.id,
  //   },
  // });

  return {
    success: `A aula do aluno ${finalizarAula.aluno.nome} com o professor ${finalizarAula.professor.nome} foi finalizada com sucesso!`,
    data: finalizarAula,
  };
};
