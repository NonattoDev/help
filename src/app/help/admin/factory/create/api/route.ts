import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prismaInstance";
import bcrypt from "bcryptjs";

export async function POST(request: Request, params: any) {
  let { formData: userData, typeEdit } = await request.json();

  userData.cpf = userData.cpf.replace(/\D/g, "");
  userData.password = bcrypt.hashSync(userData.password, 10);
  userData.telefone = userData.telefone.replace(/\D/g, "");
  userData.email = userData.email.toLowerCase();

  try {
    // Consulta para verificar a existência do usuário em várias tabelas
    const [professorExists, alunoExists, administrativoExists, usuarioExists] = await Promise.all([
      prisma.professor.findFirst({
        where: {
          OR: [{ email: userData.email }, { cpf: userData.cpf }],
        },
      }),
      prisma.aluno.findFirst({
        where: { email: userData.email },
      }),
      prisma.usuarios.findFirst({
        where: {
          OR: [{ email: userData.email }, { cpf: userData.cpf }],
        },
      }),
      prisma.responsavel.findFirst({
        where: {
          OR: [{ email: userData.email }, { cpf: userData.cpf }],
        },
      }),
    ]);

    if (professorExists || alunoExists || administrativoExists || usuarioExists) {
      return NextResponse.json({ message: "Usuário já cadastrado no sistema!" }, { status: 409 });
    }

    // Criação do usuário
    if (typeEdit === "professor") {
      await prisma.professor.create({
        data: userData,
      });
    } else if (typeEdit === "aluno") {
      await prisma.aluno.create({
        data: userData,
      });
    }

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao criar professor" }, { status: 500 });
  }
}
