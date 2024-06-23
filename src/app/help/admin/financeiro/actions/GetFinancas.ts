"use server";

import prisma from "@/utils/prismaInstance";
import moment from "moment";

// Função de busca de dados
export const fetchDadosFinancas = async (professorId?: string) => {
  const startOfWeek = moment().startOf("week").toDate();
  const endOfWeek = moment().endOf("week").toDate();
  console.log(startOfWeek, endOfWeek);

  const aulasRealizadas = await prisma.agendaAulas.findMany({
    where: { finalizada: true },
    include: {
      FinanceiroProfessor: true,
    },
  });

  const aulasComValor = await prisma.agendaAulas.findMany({
    where: {
      cancelada: true,
      data: { gte: startOfWeek, lte: endOfWeek },
    },
    include: {
      FinanceiroProfessor: true,
    },
  });

  const aulasCanceladasComValor = aulasComValor.filter((aula) => aula.FinanceiroProfessor.some((financeiro) => financeiro.valor !== 0));

  const totalAulasRealizadas = await prisma.agendaAulas.findMany({
    where: {
      data: { gte: startOfWeek, lte: endOfWeek },
    },
    include: { aluno: true, professor: true, FinanceiroProfessor: true },
  });

  let valorTransporteAtual = await prisma.valores.findFirst({
    where: { nome: "TRANSPORTE PÚBLICO" },
  });

  await prisma.$disconnect();

  return {
    success: true,
    data: {
      aulasRealizadas,
      aulasCanceladasComValor,
      totalAulasRealizadas,
      valorTransporteAtual,
    },
  };
};
