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
    {
      nome: "Lorena Fabiana Alana Rezende",
      email: "lorena-rezende88@cassianoricardo.com.br",
      cpf: "10854372059",
      telefone: "91985288330",
      endereco: {
        rua: "Travessa We-29",
        numero: "330",
        bairro: "Cidade Nova",
        cidade: "Ananindeua",
        estado: "PA",
        cep: "67133088",
        complemento: "teste",
        referencia: "teste",
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
      id: "clxza5wad0003rg6it5aj39wk",
      nome: "Carolina Alessandra Kamilly Jesus",
      email: "carolina.alessandra.jesus@sadefem.com.br",
      escola: "Marista",
      ano_escolar: "7 ano",
      data_nascimento: "1948-03-20T06:00:00.000Z",
      telefone: "85998203043",
      endereco: {
        cep: "60421104",
        rua: "Rua Edite Braga",
        bairro: "Itaoca",
        cidade: "Fortaleza",
        estado: "CE",
        numero: "657",
        referencia: "teste",
        complemento: "teste",
      },
      ficha: "Aluno é deficiente",
      modalidade: { online: true, presencial: false },
      password: "$2a$10$G1RKW4M8Xo4MQQUNkcBE2O/HBsVoEIukdSIrRAyVO6OspHO./Hz06",
      financeiro: {
        diaVencimento: "05",
        qtdAulas: 4,
        valor: 670,
      },
      dataInicioAulas: "2024-07-02T06:00:00.000Z",
      dificuldades: ["Geografia", "Matemática", "Português", "História"],
      accessLevel: "aluno",
      responsavelId: responsavelMap["lorena-rezende88@cassianoricardo.com.br"],
      ativo: true,
    },
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
        qtdAulas: 8,
        valor: 890,
        diaVencimento: "05",
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
        qtdAulas: 8,
        valor: 400,
        diaVencimento: "05",
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
        qtdAulas: 8,
        valor: 400,
        diaVencimento: "05",
      },
    },
  ];

  for (const aluno of alunosData) {
    let { financeiro, ...alunoDataWithoutFin } = aluno;
    // Crie alunos
    const alunoCriado = await prisma.aluno.create({
      data: alunoDataWithoutFin,
    });

    // Cria informacao financeiro

    await prisma.financeiroAluno.create({
      data: {
        diaVencimento: "05",
        qtdAulas: aluno.financeiro.qtdAulas,
        valor: aluno.financeiro.valor,
        alunoId: alunoCriado.id,
      },
    });
  }

  await prisma.$disconnect();

  console.log("Alunos Criados com suas informacoes financeiras");
}
