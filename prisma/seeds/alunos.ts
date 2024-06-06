import { PrismaClient } from "@prisma/client";

export async function createAlunos(prisma: PrismaClient) {
  // Crie um responsável primeiro
  const responsavel = await prisma.responsavel.create({
    data: {
      nome: "Responsavel Ficticio",
      email: "responsavelficticio@gmail.com",
      cpf: "11111111111",
      telefone: "00000000000",
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
      password: "123456",
    },
  });

  // Agora crie o aluno usando os IDs dos registros criados
  const aluno = await prisma.aluno.create({
    data: {
      nome: "Aluno Ficticio",
      email: "emailficticio@gmail.com",
      escola: "Escola Ficticia",
      ano_escolar: "1º Ano",
      telefone: "00000000000",
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
      password: "123456",
      ficha: "Ficha Ficticia",
      modalidade: "Presencial",
      qtd_aulas: 10,
      data_inicio: new Date(),
      responsavelId: responsavel.id,
      ativo: true,
    },
  });

  console.log("Aluno Criado:", aluno);
  console.log("Responsavel Criado:", responsavel);
}
