// app/api/admin/financeiro.ts
import { NextResponse } from "next/server";
import moment from "moment";
import prisma from "@/utils/prismaInstance";
import "moment/locale/pt-br";
import { transporter } from "@/utils/Nodemailer";
import ExcelJS from "exceljs";
import fs from "fs";

let responsaveisFinanceiros = ["reforcoescolarhelp01@gmail.com", "laraalopes1@hotmail.com", "robsonnonatoiii@gmail.com"];

// Esta rota será acessada todos os dias às 00:00
export async function GET() {
  // Definir mês e ano atuais
  let mesAtual = moment().format("MMMM"); // mês escrito
  const anoAtual = moment().year().toString(); // ano numérico
  const diaAtual = moment().format("DD"); // dia numérico

  mesAtual = mesAtual.charAt(0).toUpperCase() + mesAtual.slice(1);

  try {
    // Obter todos os alunos ativos
    const alunosAtivos = await prisma.aluno.findMany({
      where: {
        ativo: true,
        dadosFinanceiro: {
          some: {
            diaVencimento: {
              lt: diaAtual,
            },
          },
        },
        PagamentosAluno: {
          none: {
            mesReferencia: mesAtual,
            anoReferencia: anoAtual,
          },
        },
      },
      include: {
        dadosFinanceiro: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        PagamentosAluno: true,
      },
    });

    if (alunosAtivos.length === 0) {
      transporter.sendMail({
        from: process.env.PROVEDOR_EMAIL,
        to: responsaveisFinanceiros,
        html: `<p>Foi verificado hoje que não há alunos inadimplentes com o pagamento para mês de ${mesAtual} </p>`,
      });

      return NextResponse.json({
        message: "Não há alunos inadimplentes.",
      });
    }

    const alunosInadimplentesHTML = alunosAtivos
      .map(
        (aluno) => `
      <tr>
        <td style="padding: 10px;">${aluno.nome}</td>
        <td style="padding: 10px;">${aluno.dadosFinanceiro[0].diaVencimento}</td>
        <td style="padding: 10px;">${aluno.dadosFinanceiro[0].valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}</td>
      </tr>
    `
      )
      .join("");

    // Gerar arquivo Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Alunos Inadimplentes");

    worksheet.columns = [
      { header: "Nome do Aluno", key: "nome", width: 30 },
      { header: "Dia de Vencimento", key: "diaVencimento", width: 15 },
      { header: "Valor da Mensalidade", key: "valor", width: 20 },
    ];

    alunosAtivos.forEach((aluno) => {
      worksheet.addRow({
        nome: aluno.nome,
        diaVencimento: aluno.dadosFinanceiro[0].diaVencimento,
        valor: aluno.dadosFinanceiro[0].valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const filePath = "/tmp/AlunosInadimplentes.xlsx";
    fs.writeFileSync(filePath, Buffer.from(buffer));

    transporter.sendMail({
      from: process.env.PROVEDOR_EMAIL,
      to: responsaveisFinanceiros,
      subject: `Alunos inadimplentes - ${mesAtual} ${anoAtual}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #d9534f;">Tabela de alunos inadimplentes</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Nome do Aluno</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Dia de Vencimento</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Valor da Mensalidade</th>
              </tr>
            </thead>
            <tbody>
              ${alunosInadimplentesHTML}
            </tbody>
          </table>
        </div>
      `,
      attachments: [
        {
          filename: "AlunosInadimplentes.xlsx",
          path: filePath,
        },
      ],
    });

    return NextResponse.json({
      message: "Transações financeiras obtidas com sucesso.",
      inadimplentes: alunosAtivos,
    });
  } catch (error) {
    console.log("Erro ao obter as transações financeiras:", error);
    return NextResponse.error();
  } finally {
    await prisma.$disconnect();
  }
}
