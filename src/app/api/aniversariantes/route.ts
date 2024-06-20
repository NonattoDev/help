// app/api/cron/route.ts
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prismaInstance";
import moment from "moment";

// Esse cron rodará todos os dias as 00:00
export async function GET() {
  const dataAtualMesDia = moment().format("MM-DD");

  // Enviar felicitações de aniversários de professores, alunos e funcionários do sistema
  const professores = await prisma.professor.findMany({
    where: {
      data_nascimento: {
        gte: moment().startOf("day").toDate(),
        lte: moment().endOf("day").toDate(),
      },
    },
    select: {
      id: true,
      nome: true,
      email: true,
      data_nascimento: true,
    },
  });

  const alunos = await prisma.aluno.findMany({
    where: {
      data_nascimento: {
        gte: moment().startOf("day").toDate(),
        lte: moment().endOf("day").toDate(),
      },
    },
    select: {
      id: true,
      nome: true,
      email: true,
      data_nascimento: true,
    },
  });

  const usuarios = await prisma.usuarios.findMany({
    where: {
      data_nascimento: {
        gte: moment().startOf("day").toDate(),
        lte: moment().endOf("day").toDate(),
      },
    },
    select: {
      id: true,
      nome: true,
      email: true,
      data_nascimento: true,
    },
  });

  const aniversariantes = {
    professores,
    alunos,
    usuarios,
  };

  console.log("Aniversariantes encontrados", aniversariantes);

  // Aqui você pode adicionar a lógica para enviar as felicitações

  return NextResponse.json({ message: "Aniversariantes encontrados", aniversariantes });
}
