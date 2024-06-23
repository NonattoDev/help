// app/api/admin/financeiro.ts
import { NextResponse } from "next/server";
import moment from "moment";
import prisma from "@/utils/prismaInstance";

// Esta rota será acessada toda sexta-feira
export async function GET() {
  try {
    return NextResponse.json({ message: "Rota de transações financeiras." });
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
    await prisma.$disconnect();

    // Para cada aula que o professor tiver que for confirmada ele vai adicionar o valor da aula na tabela financeiro

    // const transacoes = await prisma.financeiro.createMany();

    return NextResponse.json({ message: "Transações financeiras obtidas com sucesso." });
  } catch (error) {
    console.log("Erro ao obter as transações financeiras:", error);
    return NextResponse.error();
  }
}
