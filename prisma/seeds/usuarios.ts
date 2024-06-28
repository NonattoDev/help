import { PrismaClient } from "@prisma/client/extension";

export async function createUsuarios(prisma: PrismaClient) {
  const usuariosData = [
    {
      nome: "Lara",
      email: "larahelp@gmail.com",
      password: "$2a$12$5W560EE67wL8IDJ.baAoZOVVuCOZzsXvq7Z7vYCf.7Lwrd/CTvddK",
      telefone: "71991858460",
      cargo: "CEO",
      data_nascimento: new Date("1997-08-17"),
      cpf: "00000000000",
      accessLevel: "administrador",
      financeiro: {
        valor: 470,
        diaPagamento: "05",
      },
    },
    {
      nome: "Robson Nonato",
      email: "robsonnonatoiii@gmail.com",
      password: "$2a$12$10oHNPbBg./ixfTqV2KPneC0Z78ivt9Ko/6cIcRL7KoKtqjPemNeq",
      telefone: "71997439650",
      cargo: "Desenvolvedor",
      data_nascimento: new Date("1997-08-17"),
      cpf: "08362023503",
      accessLevel: "administrador",
      financeiro: {
        valor: 340,
        diaPagamento: "05",
      },
    },
  ];

  for (const userData of usuariosData) {
    const { financeiro, ...user } = userData;

    // Cria o usuário
    const createdUser = await prisma.usuarios.create({
      data: user,
    });

    // Cria a informação financeira associada
    await prisma.usuariosFinanceiro.create({
      data: {
        usuarioId: createdUser.id,
        valor: financeiro.valor,
        diaPagamento: financeiro.diaPagamento,
      },
    });
  }

  await prisma.$disconnect();

  console.log("Usuários e informações financeiras criadas com sucesso");
}
