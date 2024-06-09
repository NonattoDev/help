import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request: Request, params: any) {
  const professorAtualizado = await request.json();
  const idProfessor = params.params.id;

  try {
    const professor = await prisma.professor.update({
      where: { id: idProfessor },
      data: {
        nome: professorAtualizado.nome,
        email: professorAtualizado.email,
        cpf: professorAtualizado.cpf,
        telefone: professorAtualizado.telefone,
        endereco: professorAtualizado.endereco,
        areaFormacao: professorAtualizado.areaFormacao,
        ativo: professorAtualizado.ativo,
        disponibilidade: professorAtualizado.disponibilidade,
        ficha: professorAtualizado.ficha,
        modalidade: professorAtualizado.modalidade,
        password: professorAtualizado.password,
        materias: professorAtualizado.materias,
      },
    });

    if (!professor) {
      await prisma.$disconnect();
      NextResponse.json({ error: "Professor não encontrado" }, { status: 404 });
    }

    await prisma.$disconnect();
    NextResponse.json(professor, { status: 200 });
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    NextResponse.json({ error: "Erro interno do servidor!" }, { status: 500 });
  }
}
