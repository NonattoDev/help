"use server";

import moment from "moment";
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

  const valor = await prisma.valores.findFirst({
    where: {
      nome: finalizarAula.modalidade === "PRESENCIAL" ? "AULA PRESENCIAL" : "AULA ONLINE",
    },
  });

  const insertFinanceiro = await prisma.financeiroProfessor.create({
    data: {
      professorId: finalizarAula.professorId,
      valor: valor ? valor.valor : 0.0,
      status_aula: "FINALIZADA",
      referenciaSemana: moment(finalizarAula.data).week().toString(),
      dataPagamento: moment()
        .day(moment().day() > 5 ? 12 : 5)
        .toDate(),
      status: "PENDENTE",
    },
  });

  return {
    success: `A aula do aluno ${finalizarAula.aluno.nome} com o professor ${finalizarAula.professor.nome} foi finalizada com sucesso!`,
    data: finalizarAula,
  };
};
