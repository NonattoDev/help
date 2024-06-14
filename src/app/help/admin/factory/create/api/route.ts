import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../prisma/prismaInstance";
import bcrypt from "bcryptjs";

export async function POST(request: Request, params: any) {
  let { formData: userData, typeEdit, alunoData, responsavelData } = await request.json();

  if (typeEdit === "professor") {
    userData.cpf = userData.cpf.replace(/\D/g, "");
    userData.password = bcrypt.hashSync(userData.password, 10);
    userData.telefone = userData.telefone.replace(/\D/g, "");
    userData.email = userData.email.toLowerCase();
  }

  if (typeEdit === "aluno") {
    alunoData.email = alunoData.email.toLowerCase();
    alunoData.telefone = alunoData.telefone.replace(/\D/g, "");
    alunoData.password = bcrypt.hashSync(alunoData.password, 10);
    responsavelData.email = responsavelData.email.toLowerCase();
    responsavelData.telefone = responsavelData.telefone.replace(/\D/g, "");
    responsavelData.cpf = responsavelData.cpf.replace(/\D/g, "");
    responsavelData.password = bcrypt.hashSync(responsavelData.password, 10);
  }

  try {
    // Consulta para verificar a existência do usuário em várias tabelas
    const [professorExists, alunoExists, administrativoExists, usuarioExists] = await Promise.all([
      prisma.professor.findFirst({
        where: {
          OR: [{ email: userData?.email }, { cpf: userData?.cpf }, { email: alunoData?.email }, { email: responsavelData?.email }, { cpf: responsavelData?.cpf }],
        },
      }),
      prisma.aluno.findFirst({
        where: {
          OR: [{ email: userData?.email }, { email: responsavelData?.email }, { email: alunoData?.cpf }],
        },
      }),
      prisma.usuarios.findFirst({
        where: {
          OR: [{ email: userData?.email }, { email: alunoData?.email }, { email: responsavelData?.email }, { cpf: userData?.cpf }, { cpf: responsavelData?.cpf }],
        },
      }),
      prisma.responsavel.findFirst({
        where: {
          OR: [{ email: userData?.email }, { email: alunoData?.email }, { email: responsavelData?.email }, { cpf: userData?.cpf }, { cpf: responsavelData?.cpf }],
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
      const responsavel = await prisma.responsavel.create({
        data: responsavelData,
      });

      alunoData.responsavelId = responsavel.id;

      await prisma.aluno.create({
        data: alunoData,
      });
    }

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro ao criar professor" }, { status: 500 });
  }
}
