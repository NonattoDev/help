// app/api/cron/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prismaInstance";

// Esse cron rodará todos os dias as 00:00
export async function GET() {
  // Enviar felicitaçoes de aniversarios de professor e de aluno
  const professores = await prisma.professor.findMany();
  const alunos = await prisma.aluno.findMany();

  return NextResponse.json({ message: "Hello World" });
}
