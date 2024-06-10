import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function PUT(request: Request, params: any) {
  const { formData: userData, senhaAntiga, typeEdit } = await request.json();
  const userID = params.params.id;

  if (senhaAntiga !== userData.password) {
    // criptografa a senha nova
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  try {
    if (typeEdit === "aluno") {
      const aluno = await prisma.aluno.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
          email: userData.email,
          escola: userData.escola,
          ano_escolar: userData.ano_escolar,
          telefone: userData.telefone,
          endereco: userData.endereco,
          ficha: userData.ficha,
          modalidade: userData.modalidade,
          dificuldades: userData.dificuldades,
        },
      });

      if (!aluno) {
        await prisma.$disconnect();
        return new Response(JSON.stringify({ error: "Aluno não encontrado" }), { status: 404 });
      }

      await prisma.$disconnect();

      return new Response(JSON.stringify(aluno), { status: 200 });
    }

    if (typeEdit === "professor") {
      const professor = await prisma.professor.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
          email: userData.email,
          cpf: userData.cpf,
          telefone: userData.telefone,
          endereco: userData.endereco,
          areaFormacao: userData.areaFormacao,
          ativo: userData.ativo,
          disponibilidade: userData.disponibilidade,
          ficha: userData.ficha,
          modalidade: userData.modalidade,
          password: userData.password,
          materias: userData.materias,
        },
      });

      if (!professor) {
        await prisma.$disconnect();
        return new Response(JSON.stringify({ error: "Professor não encontrado" }), { status: 404 });
      }

      await prisma.$disconnect();
      return new Response(JSON.stringify(professor), { status: 200 });
    }
  } catch (error) {
    await prisma.$disconnect();
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar o usuário" }), { status: 500 });
  }
}
