// app/api/cron/route.ts
import { NextResponse } from "next/server";
import moment from "moment";
import { transporter } from "@/utils/Nodemailer";
import prisma from "@/utils/prismaInstance";

// Esse cron rodará todos os dias as 00:00
export async function GET() {
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

  return NextResponse.json({ message: "Aniversariantes encontrados" });

  // Fazer para Alunos
  for (const aluno of alunos) {
    const mailOptions = {
      from: process.env.PROVEDOR_EMAIL,
      to: aluno.email,
      subject: `Feliz Aniversário ${aluno.nome}`,
      text: `Olá ${aluno.nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center;">
          <h1 style="color: #4CAF50;">Feliz Aniversário, ${aluno.nome}!</h1>
          <p>Desejamos a você um dia repleto de alegria e felicidade. Continue brilhando nos seus estudos e alcançando grandes conquistas!</p>
          <img src="https://img.elo7.com.br/product/zoom/4C987BB/tags-para-presente-parabens-feliz-aniversario-tag-o-aniversario-e-seu-mas-voce-e-meu-maior-presente.jpg" alt="Bolo de Aniversário" style="width: 100%; max-width: 300px; height: auto; margin-top: 20px;">
          <p>Com carinho,<br>Sua equipe de Reforço Escolar</p>
        </div>
      `,
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
      from: process.env.PROVEDOR_EMAIL,
      to: prof.email,
      subject: `Feliz Aniversário ${prof.nome}`,
      text: `Olá ${prof.nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center;">
          <h1 style="color: #4CAF50;">Feliz Aniversário, ${prof.nome}!</h1>
          <p>Obrigado por todo o seu esforço e dedicação. Você faz a diferença na vida de muitos alunos. Que seu dia seja tão especial quanto você!</p>
          <img src="https://img.elo7.com.br/product/zoom/4C987BB/tags-para-presente-parabens-feliz-aniversario-tag-o-aniversario-e-seu-mas-voce-e-meu-maior-presente.jpg" alt="Bolo de Aniversário" style="width: 100%; max-width: 300px; height: auto; margin-top: 20px;">
          <p>Com admiração,<br>Sua equipe de Reforço Escolar</p>
        </div>
      `,
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
      from: process.env.PROVEDOR_EMAIL,
      to: user.email,
      subject: `Feliz Aniversário ${user.nome}`,
      text: `Olá ${user.nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center;">
          <h1 style="color: #4CAF50;">Feliz Aniversário, ${user.nome}!</h1>
          <p>Hoje é um dia especial e queremos celebrar com você! Desejamos um ano cheio de realizações e momentos inesquecíveis.</p>
          <img src="https://img.elo7.com.br/product/zoom/4C987BB/tags-para-presente-parabens-feliz-aniversario-tag-o-aniversario-e-seu-mas-voce-e-meu-maior-presente.jpg" alt="Bolo de Aniversário" style="width: 100%; max-width: 300px; height: auto; margin-top: 20px;">
          <p>Com carinho,<br>Sua equipe de Reforço Escolar</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email enviado: " + info.response);
      }
    });
  }

  await prisma.$disconnect();

  return NextResponse.json({ message: "Aniversariantes encontrados" });
}
