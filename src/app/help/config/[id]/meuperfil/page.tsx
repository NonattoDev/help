import bcrypt from "bcryptjs";
import prisma from "@/utils/prismaInstance";
import moment from "moment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function PUT(request: Request, params: any) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Usuário não autenticado" }), { status: 401 });
  }

  const { formData: userData, senhaAntiga, typeEdit, responsavelData, accessLevel } = await request.json();
  const userID = params.params.id;

  // Verifica e criptografa a senha, se necessário
  if (senhaAntiga !== userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  // Normaliza email e telefone
  userData.email = userData.email.toLowerCase();
  userData.telefone = userData.telefone.replace(/\D/g, "");

  // Normaliza CPF se o tipo não for "aluno"
  if (typeEdit !== "aluno") {
    userData.cpf = userData.cpf.replace(/\D/g, "");
  }

  try {
    let updatedUser;

    // Atualização do tipo "aluno"
    if (typeEdit === "aluno") {
      const controleAluno = await prisma.aluno.findFirst({ where: { id: userID } });

      if (controleAluno && controleAluno.ativo !== userData.ativo && !userData.ativo && (accessLevel === "administrador" || accessLevel === "administrativo")) {
        await prisma.controleAlunos.create({
          data: {
            alunoId: controleAluno.id,
            desativadoEm: moment().toDate(),
            desativadoPor: session.user.nome,
          },
        });
      }
      updatedUser = await prisma.aluno.update({
        where: { id: userID },
        data: {
          ativo: userData.ativo,
          nome: userData.nome,
          escola: userData.escola,
          email: userData.email,
          ano_escolar: userData.ano_escolar,
          telefone: userData.telefone,
          endereco: userData.endereco,
          ficha: userData.ficha,
          password: userData.password,
          modalidade: userData.modalidade,
          dificuldades: userData.dificuldades,
          data_nascimento: moment(userData.data_nascimento).toDate(),
        },
      });

      // Se os dados financeiros mudarem, isso significa que precisar adicionar um novo registro na tabela financeiroAluno
      const currentFinanceiro = await prisma.financeiroAluno.findFirst({
        where: { alunoId: userID },
        orderBy: { createdAt: "desc" },
      });

      const novoValor = parseFloat(String(userData.dadosFinanceiro.valor).replace(/[^\d]/g, "")) / 100;

      if (
        currentFinanceiro &&
        (currentFinanceiro.valor !== novoValor || currentFinanceiro.qtdAulas !== userData.dadosFinanceiro.qtdAulas || currentFinanceiro.diaVencimento !== userData.dadosFinanceiro.diaVencimento)
      ) {
        // Adicionar um novo registro financeiro com início no próximo mês
        await prisma.financeiroAluno.create({
          data: {
            alunoId: userID,
            valor: novoValor,
            qtdAulas: userData.dadosFinanceiro.qtdAulas,
            diaVencimento: userData.dadosFinanceiro.diaVencimento,
            createdAt: moment().add(1, "month").startOf("month").toDate(), // Data de início no próximo mês
          },
        });
      }

      // Atualizar dados do responsável
      await prisma.responsavel.update({
        where: { id: responsavelData.id },
        data: responsavelData,
      });
    }
    // Atualização do tipo "professor"
    else if (typeEdit === "professor") {
      const controleProfessor = await prisma.professor.findFirst({ where: { id: userID } });

      if (controleProfessor && controleProfessor.ativo !== userData.ativo && !userData.ativo && (accessLevel === "administrador" || accessLevel === "administrativo")) {
        await prisma.controleProfessores.create({
          data: {
            professorId: controleProfessor.id,
            desativadoEm: moment().toDate(),
            desativadoPor: session.user.nome,
          },
        });
      }
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
    }
    // Atualização do tipo "responsavel"
    else if (typeEdit === "responsavel") {
      updatedUser = await prisma.responsavel.update({
        where: { id: userID },
        data: {
          nome: userData.nome,
          telefone: userData.telefone,
          password: userData.password,
          endereco: userData.endereco,
        },
      });
    }
    // Atualização do tipo "admin"
    else if (typeEdit === "admin") {
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

    // Verificação final se o usuário foi atualizado
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
