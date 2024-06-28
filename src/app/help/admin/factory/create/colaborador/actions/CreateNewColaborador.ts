"use server";

import prisma from "@/utils/prismaInstance";
import { Usuarios, FinanceiroUsuarios } from "@prisma/client";

export const CreateNewColaborador = async (colaborador: Usuarios & { financeiro: FinanceiroUsuarios }) => {
  let { email, cpf } = colaborador;
  cpf = cpf.replace(/\D/g, "");
  console.log(colaborador);

  try {
    // Verifica se o email ou CPF já existem em qualquer uma das tabelas
    let userExists =
      (await prisma.usuarios.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      })) ||
      (await prisma.professor.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      })) ||
      (await prisma.responsavel.findFirst({
        where: {
          OR: [{ email }, { cpf }],
        },
      })) ||
      (await prisma.aluno.findFirst({
        where: {
          email,
        },
      }));

    if (userExists) {
      return {
        success: false,
        message: "Usuário já cadastrado no sistema",
      };
    }

    // Cria o colaborador
    await prisma.usuarios.create({
      data: {
        ...colaborador,
        cpf,
        telefone: colaborador.telefone.replace(/\D/g, ""),
        financeiro: {
          create: {
            diaPagamento: colaborador.financeiro.diaPagamento,
            valor: colaborador.financeiro.valor,
            createdAt: new Date(),
          },
        },
      },
    });

    return {
      success: true,
      message: "Colaborador criado com sucesso",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Erro ao criar colaborador",
    };
  } finally {
    await prisma.$disconnect();
  }
};
