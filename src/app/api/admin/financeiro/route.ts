// app/api/admin/financeiro.ts
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/prismaInstance";
import moment from "moment";

// Esta rota será acessada toda sexta-feira
export async function GET() {
  try {
    // Ao entrar na sexta feira ele vai buscar na agendaAulas todas as aulas que foram feitas naquela semana
    const agendaAulas = await prisma.agendaAulas.findMany({
      where: {
        cancelada: false,
        finalizada: true,
        createdAt: {
          gte: moment().startOf("week").toDate(),
          lte: moment().endOf("week").toDate(),
        },
      },
      include: {
        professor: true,
        aluno: true,
      },
    });

    console.log("Aulas da semana:", agendaAulas);

    // Para cada aula que o professor tiver que for confirmada ele vai adicionar o valor da aula na tabela financeiro

    // const transacoes = await prisma.financeiro.createMany();

    return NextResponse.json({ message: "Transações financeiras obtidas com sucesso." });
  } catch (error) {
    console.log("Erro ao obter as transações financeiras:", error);
    return NextResponse.error();
  }
}
