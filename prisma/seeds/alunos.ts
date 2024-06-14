import { PrismaClient } from "@prisma/client";
import moment from "moment";

export async function createAlunos(prisma: PrismaClient) {
  // Crie responsáveis primeiro
  const responsaveisData = [
    {
      nome: "Leina",
      email: "aniel2@gmail.com",
      cpf: "77659970500",
      telefone: "71991773362",
      endereco: {
        rua: "Rua das pitangueiras",
        numero: "20",
        bairro: "Brotas",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "40255436",
        complemento: "",
        referencia: "Ao lado da rádio piatã FM",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
    },
  ];

  // Crie responsáveis
  const responsaveis = await prisma.responsavel.createMany({
    data: responsaveisData,
    skipDuplicates: true,
  });

  // Busque os IDs dos responsáveis criados
  const responsaveisIds = await prisma.responsavel.findMany({
    where: {
      email: { in: responsaveisData.map((r) => r.email) },
    },
    select: { id: true, email: true },
  });

  // Mapeie os responsáveis pelo email para facilitar a associação
  const responsavelMap = Object.fromEntries(responsaveisIds.map((r) => [r.email, r.id]));

  // Dados dos alunos
  const alunosData = [
    {
      nome: "Adenilson Augusto Leal Neto",
      email: "",
      data_nascimento: moment().toDate(),
      escola: "Mediterrâneo",
      ano_escolar: "9º Ano",
      telefone: "71991773362",
      endereco: {
        rua: "Rua das pitangueiras",
        numero: "20",
        bairro: "Matatu",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "40255436",
        complemento: "",
        referencia: "Ao lado da rádio piatã FM",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: false,
        online: true,
      },
      responsavelId: responsavelMap["aniel2@gmail.com"],
      ativo: true,
      financeiro: {
        qtd_aulas: 8,
        valor: "890",
        dta_vencimento: "05/24",
      },
    },
    {
      nome: "Aila Vitória Bispo Araujo",
      email: "",
      data_nascimento: moment().toDate(),
      escola: "",
      ano_escolar: "3º Ano do Ensino Médio",
      telefone: "7192994794",
      endereco: {
        rua: "Tv. Albertino Cabral Henrique",
        numero: "212",
        bairro: "Pituaçu",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "41740870",
        complemento: "Condomínio Parque Tropical, torre Sol, aptº 101",
        referencia: "",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: true,
        online: false,
      },
      responsavelId: responsavelMap["aniel2@gmail.com"],
      ativo: true,
      financeiro: {
        qtd_aulas: 8,
        valor: "400",
        dta_vencimento: "05/24",
      },
    },
  ];

  // Crie alunos
  const alunos = await prisma.aluno.createMany({
    data: alunosData,
    skipDuplicates: true,
  });

  console.log("Alunos Criados: " + alunos);
}
