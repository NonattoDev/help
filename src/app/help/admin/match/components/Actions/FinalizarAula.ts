"use server";

import prisma from "@/utils/prismaInstance";
import moment from "moment";

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

  const valorTransporte = await prisma.valores.findFirst({
    where: {
      nome: "TRANSPORTE PÚBLICO",
    },
  });

  const insertFinanceiro = await prisma.financeiroProfessor.create({
    data: {
      professorId: finalizarAula.professorId,
      aulaId: finalizarAula.id,
      valor: valor ? valor.valor : 0.0,
      valor_transporte: finalizarAula.modalidade === "PRESENCIAL" ? (valorTransporte ? valorTransporte.valor : 0.0) : 0.0,
      status_aula: "FINALIZADA",
      referenciaSemana: moment(finalizarAula.data).week().toString(),
      dataPagamento: moment()
        .day(moment().day() > 5 ? 12 : 5)
        .toDate(),
      status: "PENDENTE",
    },
  });

  await prisma.$disconnect();

  return {
    success: `A aula do aluno ${finalizarAula.aluno.nome} com o professor ${finalizarAula.professor.nome} foi finalizada com sucesso!`,
    data: finalizarAula,
  };
};
