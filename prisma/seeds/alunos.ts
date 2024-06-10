import { PrismaClient } from "@prisma/client";

export async function createAlunos(prisma: PrismaClient) {
  // Crie um responsável primeiro
  const responsavel = await prisma.responsavel.create({
    data: {
      nome: "Priscila de Santana",
      email: "responsavelficticio@gmail.com",
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
  });

  // Agora crie o aluno usando os IDs dos registros criados
  const aluno = await prisma.aluno.create({
    data: {
      nome: "Adam de Santana Soares Pinto Pereira",
      email: "adampereira@gmail.com",
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
      responsavelId: responsavel.id,
      ativo: true,
    },
  });
}
