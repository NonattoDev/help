import bcrypt from "bcryptjs";
import prisma from "../../../../../../../prisma/prismaInstance";

export async function PUT(request: Request, params: any) {
  const { formData: userData, senhaAntiga, typeEdit } = await request.json();
  const userID = params.params.id;

  if (senhaAntiga !== userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  try {
    let updatedUser;

    if (typeEdit === "aluno") {
      updatedUser = await prisma.aluno.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
          email: userData.email,
          escola: userData.escola,
          ano_escolar: userData.ano_escolar,
          telefone: userData.telefone,
          endereco: userData.endereco,
          ficha: userData.ficha,
          password: userData.password,
          modalidade: userData.modalidade,
          dificuldades: userData.dificuldades,
        },
      });
    } else if (typeEdit === "professor") {
      updatedUser = await prisma.professor.update({
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
    } else if (typeEdit === "responsavel") {
      updatedUser = await prisma.responsavel.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
          email: userData.email,
          cpf: userData.cpf,
          telefone: userData.telefone,
          password: userData.password,
          endereco: userData.endereco,
        },
      });
    } else if (typeEdit === "admin") {
      updatedUser = await prisma.usuarios.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
          email: userData.email,
          cpf: userData.cpf,
          cargo: userData.cargo,
          telefone: userData.telefone,
          password: userData.password,
        },
      });
    }

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "Usuário não encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Erro ao atualizar o usuário" }), { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
