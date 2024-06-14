import bcrypt from "bcryptjs";
import prisma from "../../../../../../../prisma/prismaInstance";

export async function PUT(request: Request, params: any) {
  const { formData: userData, senhaAntiga, typeEdit, responsavelData } = await request.json();
  const userID = params.params.id;

  if (senhaAntiga !== userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  userData.email = userData.email.toLowerCase();
  userData.telefone = userData.telefone.replace(/\D/g, "");

  if (typeEdit !== "aluno") {
    userData.cpf = userData.cpf.replace(/\D/g, "");
  }

  try {
    let updatedUser;
    let updateResponsavel;

    if (typeEdit === "aluno") {
      updatedUser = await prisma.aluno.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
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

      let updateResponsavel = await prisma.responsavel.update({
        where: { id: responsavelData.id },
        data: responsavelData,
      });
    } else if (typeEdit === "professor") {
      updatedUser = await prisma.professor.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
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
          cargo: userData.cargo,
          telefone: userData.telefone,
          password: userData.password,
        },
      });
    }

    if (!updatedUser && !updateResponsavel) {
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
