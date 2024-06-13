import { PrismaClient } from "@prisma/client";

export async function createAlunos(prisma: PrismaClient) {
  // Crie responsáveis primeiro
  const responsaveisData = [
    {
      nome: "Laís Sônia Rezende",
      email: "laissoniarezende@vuyu.es",
      cpf: "94641339457",
      telefone: "66999629620",
      endereco: {
        rua: "Avenida das Acácias",
        numero: "546",
        bairro: "Setor Residencial Sul",
        cidade: "Sinop",
        estado: "MT",
        cep: "78550059",
        complemento: "Complemento Ficticio",
        referencia: "Referencia Ficticia",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
    },
    {
      nome: "Raul Ricardo Breno Farias",
      email: "raul-farias70@netwis.com.br",
      cpf: "53501568029",
      telefone: "27987441439",
      endereco: {
        rua: "Rua Ivo Beltrame",
        numero: "379",
        bairro: "Boa Vista",
        cidade: "São Mateus",
        estado: "ES",
        cep: "29931270",
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
      nome: "Mirella Esther Rodrigues",
      email: "mirella-rodrigues94@gmailo.com",
      escola: "Escola Mundo e Criação",
      ano_escolar: "1º Ano",
      telefone: "44986975139",
      endereco: {
        rua: "Avenida Prefeito Antônio Teodoro de Oliveira",
        numero: "631",
        bairro: "Jardim Santa Cruz",
        cidade: "Campo Mourão",
        estado: "PR",
        cep: "87309596",
        complemento: "Complemento Ficticio",
        referencia: "Referencia Ficticia",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Ficticia",
      modalidade: {
        presencial: true,
        online: true,
      },
      responsavelId: responsavelMap["raul-farias70@netwis.com.br"],
      ativo: true,
      financeiro: {
        qtd_aulas: 7,
        valor: "445",
        dta_vencimento: "10/12",
      },
    },
    {
      nome: "Tomás Kaique Lima",
      email: "tomas_lima@live.co.uk",
      escola: "Marista",
      ano_escolar: "2º Ano",
      telefone: "71999157059",
      endereco: {
        rua: "Rua Otacílio Colaço da Costa",
        numero: "610",
        bairro: "Monte Santo",
        cidade: "Campina Grande",
        estado: "PB",
        cep: "58400815",
        complemento: "Complemento Exemplo",
        referencia: "Referencia Exemplo",
      },
      password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      ficha: "Ficha Exemplo",
      modalidade: {
        presencial: true,
        online: false,
      },
      responsavelId: responsavelMap["laissoniarezende@vuyu.es"],
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
