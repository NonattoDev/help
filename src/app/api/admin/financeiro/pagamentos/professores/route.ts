// app/api/admin/financeiro.ts
import { NextResponse } from "next/server";
import moment from "moment";
import prisma from "@/utils/prismaInstance";

// Esta rota será acessada toda sexta-feira
export async function GET() {
  try {
    // Ao entrar na sexta feira ele vai buscar na agendaAulas todas as aulas que foram feitas naquela semana
    const startOfWeek = moment().day(6).startOf("day"); // Sábado
    const endOfWeek = moment()
      .day(5 + 7)
      .endOf("day");

    const agendaAulas = await prisma.agendaAulas.findMany({
      where: {
        cancelada: false,
        finalizada: true,
        createdAt: {
          gte: startOfWeek.toDate(),
          lte: endOfWeek.toDate(),
        },
      },
      include: {
        professor: true,
        aluno: true,
      },
    });

    console.log("Aulas da semana:", agendaAulas);
    await prisma.$disconnect();

    // Para cada aula que o professor tiver que for confirmada ele vai adicionar o valor da aula na tabela PagamentosProfessor

    // const transacoes = await prisma.financeiro.createMany();

    return NextResponse.json({ message: "Transações financeiras obtidas com sucesso." });
  } catch (error) {
    console.log("Erro ao obter as transações financeiras:", error);
    return NextResponse.error();
  }
}
