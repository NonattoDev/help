"use server";

import prisma from "@/utils/prismaInstance";
import bcrypt from "bcryptjs";

export const ChangePasswordForgot = async (email: string, password: string) => {
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

  return {
    success: true,
    message: "Senha alterada com sucesso!",
  };
};
