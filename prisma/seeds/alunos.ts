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
<<<<<<< HEAD
      telefone: "71999157057",
=======
      telefone: "44986975139",
      data_nascimento: new Date("2013-06-06"),
>>>>>>> 5cfaa06a58bdcafb95b8206e8046f609cfc2c3a6
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
        online: false,
      },
      qtd_aulas: 8,
      data_inicio: new Date(),
      responsavelId: responsavelMap["adampereira1@gmail.com"],
      ativo: true,
    },
    {
      nome: "Adenilson Augusto Leal Neto",
      email: "",
      escola: "Mediterrâneo",
      ano_escolar: "9º Ano",
      telefone: "71991773362",
      endereco: {
        rua: "Rua das pitangueiras",
        numero: "20",
        bairro: "Matatu de Brotas",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "40255-436",
        complemento: "",
        referencia: "Ao lado da rádio piatã FM",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: false,
        online: true,
      },
      qtd_aulas: 10,
      data_inicio: new Date(),
      responsavelId: responsavelMap["responsavelficticio1@gmail.com"],
      ativo: true,
      financeiro: {
        qtd_aulas: 7,
        valor: "445",
        dta_vencimento: "10/12",
      },
    },
    {
      nome: "Bruna de Oliveira",
      email: "brunaoliveira1@gmail.com",
      escola: "Escola Exemplo",
      ano_escolar: "2º Ano",
<<<<<<< HEAD
      telefone: "71988032139",
=======
      telefone: "71999157059",
      data_nascimento: new Date("2013-06-06"),
>>>>>>> 5cfaa06a58bdcafb95b8206e8046f609cfc2c3a6
      endereco: {
        rua: "Rua Amazonas",
        numero: "78",
        bairro: "Cabula",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "41192065",
        complemento: "Vila Arboreto torre 2 AP 801",
        referencia: "Na rua do posto",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: true,
        online: false,
      },
      qtd_aulas: 8,
      data_inicio: new Date(),
      responsavelId: responsavelMap["Amandasabrina_@hotmail.com"],
      ativo: true,
    },
    {
      nome: "Amanda Dantas Alves Silva",
      email: "",
      escola: "Colegio Apoio - Vilas",
      ano_escolar: "1º Ano do Ensino Médio",
      telefone: "71988032139",
      endereco: {
        rua: "Av Santos Dumont",
        numero: "1893",
        bairro: "Centro",
        cidade: "Lauro de Freitas",
        estado: "Bahia",
        cep: "42702400",
        complemento: "Ap 904 - Ed Bella - Cond Supremo Family",
        referencia: "Em frente ao Hospital Aeroporto",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: false,
        online: true,
      },
      qtd_aulas: 8,
      data_inicio: new Date(),
      responsavelId: responsavelMap[""],
      ativo: true,
    },
    {
      nome: "Ana Beatriz Ribeiro De Azevedo",
      email: "",
      escola: "Salesino Dom Bosco",
      ano_escolar: "2º Ano do Ensino Médio",
      telefone: "71991988959",
      endereco: {
        rua: "Rua da Gratidão",
        numero: "",
        bairro: "Piatã",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "41650195",
        complemento: "Condomínio Colinas de Piatã, Edifício Turmalina, Apt 805",
        referencia: "",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: true,
        online: false,
      },
      qtd_aulas: 8,
      data_inicio: new Date(),
      responsavelId: responsavelMap["alineribeiro.social@gmail.com"],
      ativo: true,
    },
    {
      nome: "Ana Clara Lima Batista",
      email: "",
      escola: "Colégio Análise",
      ano_escolar: "2º Ano do Ensino Médio",
      telefone: "71999002728",
      endereco: {
        rua: "Avenida São Roque",
        numero: "364",
        bairro: "Uruguai",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "40450-355",
        complemento: "",
        referencia: "Em cima da Creche de Nilda",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: false,
        online: true,
      },
      qtd_aulas: 12,
      data_inicio: new Date(),
      responsavelId: responsavelMap[""],
      ativo: true,
    },
    {
      nome: "Ana Luisa Oliveira Pereira",
      email: "",
      escola: "Sartre",
      ano_escolar: "4º Ano",
      telefone: "71981010886",
      endereco: {
        rua: "Rua Embira",
        numero: "149",
        bairro: "Patamares",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "41680-113",
        complemento: "",
        referencia: "Greenville ",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: true,
        online: false,
      },
      qtd_aulas: 4,
      data_inicio: new Date(),
      responsavelId: responsavelMap[""],
      ativo: true,
    },
    {
      nome: "Ana Luiza Leão",
      email: "",
      escola: "Tempo de Criança",
      ano_escolar: "5º Ano",
      telefone: "7191841308",
      endereco: {
        rua: "Rua hilton Rodrigues",
        numero: "158",
        bairro: "Pituba",
        cidade: "Salvador",
        estado: "Bahia",
        cep: "41830630",
        complemento: "apt 702 edf portal do bosque",
        referencia: "Próximo ao hiper ideal",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: true,
        online: false,
      },
      qtd_aulas: 8,
      data_inicio: new Date(),
      responsavelId: responsavelMap[""],
      ativo: true,
    },
    {
      nome: "Ana Valentina Guedes Barbosa",
      email: "adv.marinalvaguedes@hotmail.com",
      escola: "Gurilandia",
      ano_escolar: "4º Ano",
      telefone: "71999255964",
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
      financeiro: {
        qtd_aulas: 4,
        valor: "245",
        dta_vencimento: "10/12",
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
