"use server";

import { transporter } from "@/utils/Nodemailer";
import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const SendRecoveryEmail = async (email: string) => {
  let userExists =
    (await prisma.usuarios.findFirst({
      where: { email },
    })) ||
    (await prisma.professor.findFirst({
      where: { email },
    })) ||
    (await prisma.responsavel.findFirst({
      where: { email },
    })) ||
    (await prisma.aluno.findFirst({
      where: { email },
    }));

  if (!userExists) {
    return {
      success: false,
      message: "Email não encontrado",
    };
  }

  const tokenExists = await prisma.tokenRecuperacao.findFirst({
    where: {
      email,
      validoAte: {
        gte: moment().toDate(),
      },
      utilizado: false,
    },
  });

  if (tokenExists) {
    return {
      success: false,
      message: "Já existe um código de recuperação para este email, verifique sua caixa de entrada.",
    };
  }

  const tokenCreated = await prisma.tokenRecuperacao.create({
    data: {
      token: Math.random().toString(36).substring(2, 15),
      email,
      validoAte: moment().add(15, "minutes").toDate(),
      utilizado: false,
    },
  });

  await transporter.sendMail({
    to: "robsonnonatoiii@gmail.com",
    subject: "Recuperação de senha",
    html: `
      <h1>Recuperação de senha</h1>
      <p>Olá, ${userExists.nome}, você solicitou a recuperação de senha. Seu link de recuperação é:</p>
      <a href='${process.env.NEXTAUTH_URL}help/forgot-password/${tokenCreated.token}'>Clique aqui para recuperar sua senha</a>
    `,
  });

  await prisma.$disconnect();

  return {
    success: true,
    message: "Email enviado com sucesso",
  };
};
