"use server";

import prisma from "@/utils/prismaInstance";
import bcrypt from "bcryptjs";

export const ChangePasswordForgot = async (email: string, password: string) => {
  try {
    const userExists = await prisma.usuarios.findFirst({
      where: { email },
    });

    if (!userExists) {
      return {
        success: false,
        message: "Email não encontrado",
      };
    }

    await prisma.usuarios.update({
      where: {
        email,
      },
      data: {
        password: bcrypt.hashSync(password, 12),
      },
    });

    // Encontra o token para pegar o id ele será o unico que nao foi utilizado
    const token = await prisma.tokenRecuperacao.findFirst({
      where: {
        email,
        utilizado: false,
      },
    });

    if (!token) {
      return {
        success: false,
        message: "Token não encontrado, solicite novamente a recuperação de senha!",
      };
    }

    // Atualizou remove o token
    await prisma.tokenRecuperacao.update({
      where: {
        id: token.id,
      },
      data: {
        utilizado: true,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return {
    success: true,
    message: "Senha alterada com sucesso!",
  };
};
