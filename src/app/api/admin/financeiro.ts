// app/api/admin/financeiro.ts
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prismaInstance";

// Esta rota será acessada toda sexta-feira
export async function GET() {
  try {
    const transacoes = await prisma.financeiro.findMany();
    // Faça o que desejar com as transações obtidas do Prisma

    return NextResponse.json({ message: "Transações financeiras obtidas com sucesso.", transacoes });
  } catch (error) {
    console.log("Erro ao obter as transações financeiras:", error);
    return NextResponse.error();
  }
}
