import bcrypt from "bcryptjs";
import prisma from "../../../../../../../prisma/prismaInstance";
import moment from "moment";
import parseCurrency from "@/utils/FormatCurrency";

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
      if (userData.financeiro && typeof userData.financeiro.valor === "string") {
        userData.financeiro.valor = parseCurrency(userData.financeiro.valor);
      }
      updatedUser = await prisma.aluno.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
          escola: userData.escola,
          email: userData.email,
          ano_escolar: userData.ano_escolar,
          telefone: userData.telefone,
          endereco: userData.endereco,
          financeiro: userData.financeiro,
          ficha: userData.ficha,
          password: userData.password,
          modalidade: userData.modalidade,
          dificuldades: userData.dificuldades,
          data_nascimento: moment(userData.data_nascimento).toDate(),
        },
      });

      await prisma.responsavel.update({
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
          data_nascimento: moment(userData.data_nascimento).toDate(),
          ficha: userData.ficha,
          modalidade: userData.modalidade,
          password: userData.password,
          materias: userData.materias,
          turmas_habilitadas: userData.turmas_habilitadas,
          img_url: userData.img_url,
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
          data_nascimento: moment(userData.data_nascimento).toDate(),
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
