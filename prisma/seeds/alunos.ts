import { PrismaClient } from "@prisma/client";
import moment from "moment";

export async function createAlunos(prisma: PrismaClient) {
  // Crie responsáveis primeiro
  const responsaveisData = [
    {
      nome: "Priscila de Santana",
      email: "pspibio@gmail.com",
      cpf: "79106455549",
      telefone: "71999157057",
      endereco: {
        rua: "Rua Poetisa Cora Coralina",
        numero: "45",
        bairro: "Bairro Ficticio",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "40261075",
        complemento: "Ed. Félix, Apt. 01",
        referencia: "Próximo à Escola Estadual Santa Rita",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
    },
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
      email: "adenilsonteste@gmail.com",
      data_nascimento: moment().toDate(),
      escola: "Mediterrâneo",
      ano_escolar: "9 ano",
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
        dia_vencimento: "05/24",
      },
    },
    {
      nome: "Aila Vitória Bispo Araujo",
      email: "aila@teste.com",
      data_nascimento: moment().toDate(),
      escola: "",
      ano_escolar: "3 Série do Ensino Médio",
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
        dia_vencimento: "05/24",
      },
      dificuldades: ["Matemática", "Espanhol", "Biologia", "Geografia"],
    },
    {
      nome: "Adam de Santana Soares Pinto Pereira",
      email: "",
      data_nascimento: moment().toDate(),
      escola: "Salesiano do Salvador",
      ano_escolar: "6 ano",
      telefone: "71999157057",
      endereco: {
        rua: "Rua Poetisa Cora Coralina",
        numero: "45",
        bairro: "Santa Teresa",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "40265070",
        complemento: "Ed. Félix, Apt. 01, Luiz Anselmo",
        referencia: "Próximo à Escola Estadual Santa Rita",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Ficticia",
      modalidade: {
        presencial: true,
        online: false,
      },
      responsavelId: responsavelMap["pspibio@gmail.com"],
      ativo: true,
      financeiro: {
        qtd_aulas: 8,
        valor: "400",
        dia_vencimento: "05/24",
      },
    },
  ];

  for (const aluno of alunosData) {
    // Crie alunos
    const alunoCriado = await prisma.aluno.create({
      data: aluno,
    });

    // Cria informacao financeiro

    await prisma.financeiroAluno.create({
      data: {
        diaVencimento: "05",
        qtdAulas: Number(aluno.financeiro.qtd_aulas),
        valor: parseFloat(aluno.financeiro.valor),
        alunoId: alunoCriado.id,
      },
    });
  }

  await prisma.$disconnect();

  console.log("Alunos Criados com suas informacoes financeiras");
}
