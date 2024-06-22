"use server";

import prisma from "@/utils/prismaInstance";
import moment from "moment";

// Função de busca de dados
export const fetchDadosFinancas = async () => {
  console.log("entrei aqui");
  const startOfWeek = moment().startOf("week").toDate();
  const endOfWeek = moment().endOf("week").toDate();

  const aulasRealizadas = await prisma.agendaAulas.findMany({
    where: { finalizada: true },
  });

  const aulasCanceladasComValor = await prisma.agendaAulas.findMany({
    where: {
      cancelada: true,
      valor_aula: { not: 0 },
    },
  });

  const totalAulasRealizadas = await prisma.agendaAulas.findMany({
    where: {
      data: { gte: startOfWeek, lte: endOfWeek },
    },
    include: { aluno: true, professor: true },
  });

  return {
    success: true,
    data: {
      aulasRealizadas,
      aulasCanceladasComValor,
      totalAulasRealizadas,
    },
  };
};
