import { PrismaClient } from "@prisma/client";

export async function createAlunos(prisma: PrismaClient) {
  // Crie responsáveis primeiro
  const responsaveisData = [
    {
      nome: "Priscila de Santana",
      email: "responsavelficticio1@gmail.com",
      cpf: "11111111111",
      telefone: "71999157057",
      endereco: {
        rua: "Rua Ficticia",
        numero: "000",
        bairro: "Bairro Ficticio",
        cidade: "Cidade Ficticia",
        estado: "Estado Ficticio",
        cep: "00000000",
        complemento: "Complemento Ficticio",
        referencia: "Referencia Ficticia",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
    },
    {
      nome: "Carlos de Oliveira",
      email: "responsavelficticio2@gmail.com",
      cpf: "22222222222",
      telefone: "71999157058",
      endereco: {
        rua: "Rua Exemplo",
        numero: "001",
        bairro: "Bairro Exemplo",
        cidade: "Cidade Exemplo",
        estado: "Estado Exemplo",
        cep: "00000001",
        complemento: "Complemento Exemplo",
        referencia: "Referencia Exemplo",
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
      nome: "Adam de Santana Soares Pinto Pereira",
      email: "adampereira1@gmail.com",
      escola: "Escola Ficticia",
      ano_escolar: "1º Ano",
      telefone: "71999157057",
      endereco: {
        rua: "Rua Ficticia",
        numero: "000",
        bairro: "Bairro Ficticio",
        cidade: "Cidade Ficticia",
        estado: "Estado Ficticio",
        cep: "00000000",
        complemento: "Complemento Ficticio",
        referencia: "Referencia Ficticia",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Ficticia",
      modalidade: {
        presencial: true,
        online: true,
      },
      qtd_aulas: 10,
      data_inicio: new Date(),
      responsavelId: responsavelMap["responsavelficticio1@gmail.com"],
      ativo: true,
    },
    {
      nome: "Bruna de Oliveira",
      email: "brunaoliveira1@gmail.com",
      escola: "Escola Exemplo",
      ano_escolar: "2º Ano",
      telefone: "71999157059",
      endereco: {
        rua: "Rua Exemplo",
        numero: "001",
        bairro: "Bairro Exemplo",
        cidade: "Cidade Exemplo",
        estado: "Estado Exemplo",
        cep: "00000001",
        complemento: "Complemento Exemplo",
        referencia: "Referencia Exemplo",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: true,
        online: false,
      },
      qtd_aulas: 8,
      data_inicio: new Date(),
      responsavelId: responsavelMap["responsavelficticio2@gmail.com"],
      ativo: true,
    },
  ];

  // Crie alunos
  const alunos = await prisma.aluno.createMany({
    data: alunosData,
    skipDuplicates: true,
  });

  console.log("Alunos Criados: " + alunos);
}
