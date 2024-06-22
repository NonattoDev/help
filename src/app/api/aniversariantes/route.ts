// app/api/cron/route.ts
import { NextResponse } from "next/server";
import moment from "moment";
import { transporter } from "@/utils/Nodemailer";
import prisma from "@/utils/prismaInstance";

// Esse cron rodará todos os dias as 00:00
export async function GET() {
  return NextResponse.json({ message: "Aniversariantes encontrados" });
  const dataAtualMesDia = moment().format("MM-DD");

  // Enviar felicitações de aniversários de professores, alunos e funcionários do sistema
  const professores = await prisma.professor.findMany({
    where: {
      data_nascimento: {
        gte: moment().startOf("day").toDate(),
        lte: moment().endOf("day").toDate(),
      },
    },
    select: {
      id: true,
      nome: true,
      email: true,
      data_nascimento: true,
    },
  });

  const alunos = await prisma.aluno.findMany({
    where: {
      data_nascimento: {
        gte: moment().startOf("day").toDate(),
        lte: moment().endOf("day").toDate(),
      },
    },
    select: {
      id: true,
      nome: true,
      email: true,
      data_nascimento: true,
    },
  });

  const usuarios = await prisma.usuarios.findMany({
    where: {
      data_nascimento: {
        gte: moment().startOf("day").toDate(),
        lte: moment().endOf("day").toDate(),
      },
    },
    select: {
      id: true,
      nome: true,
      email: true,
      data_nascimento: true,
    },
  });

  // Fazer para Alunos
  for (const aluno of alunos) {
    const mailOptions = {
      from: "devhelpreforcoescolar@gmail.com",
      to: "enzogoncalves@gmail.com",
      subject: "Feliz Aniversário",
      text: `Olá ${aluno.nome}`,
      html: `<h1>Olá ${aluno.nome}</h1>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });
  }

  // Fazer para Professores
  for (const prof of professores) {
    const mailOptions = {
      from: "devhelpreforcoescolar@gmail.com",
      to: "enzogoncalves@gmail.com",
      subject: "Feliz Aniversário",
      text: `Olá ${prof.nome}`,
      html: `<h1>Olá ${prof.nome}</h1>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });
  }

  // Fazer para Usuarios
  for (const user of usuarios) {
    const mailOptions = {
      from: "devhelpreforcoescolar@gmail.com",
      to: "enzogoncalves@gmail.com",
      subject: "Feliz Aniversário",
      text: `Olá ${user.nome}`,
      html: `<h1>Olá ${user.nome}</h1>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });
  }
  return NextResponse.json({ message: "Aniversariantes encontrados" });
}
