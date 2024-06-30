"use server";

import prisma from "@/utils/prismaInstance";
import moment from "moment";

// Função de busca de dados
export const fetchDadosFinancas = async (professorId?: string | null) => {
  console.log(`FetchDadosFinancas foi chamado e ${professorId ? `professorId é ${professorId}` : "professorId é nulo"}`);
  const startOfWeek = moment().day(6).startOf("day").toDate(); // Sábado
  const endOfWeek = moment()
    .day(5 + 7)
    .endOf("day")
    .toDate();

  // Ajuste as consultas com base na presença do professorId
  const whereClause = professorId ? { finalizada: true, professorId } : { finalizada: true };

  const aulasRealizadas = await prisma.agendaAulas.findMany({
    where: whereClause,
    include: {
      FinanceiroProfessor: true,
    },
  });

  const aulasComValor = await prisma.agendaAulas.findMany({
    where: {
      cancelada: true,
      data: { gte: startOfWeek, lte: endOfWeek },
      ...(professorId && { professorId }),
    },
    include: {
      FinanceiroProfessor: true,
    },
  });

  const aulasCanceladasComValor = aulasComValor.filter((aula) => aula.FinanceiroProfessor.some((financeiro) => financeiro.valor !== 0));

  const totalAulasRealizadas = await prisma.agendaAulas.findMany({
    where: {
      data: { gte: startOfWeek, lte: endOfWeek },
      ...(professorId && { professorId }),
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
