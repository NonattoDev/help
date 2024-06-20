import { PrismaClient } from "@prisma/client/extension";

export async function createUsuarios(prisma: PrismaClient) {
  const Usuarios = await prisma.usuarios.createMany({
    data: [
      {
        nome: "Lara",
        email: "larahelp@gmail.com",
        password: "$2a$12$5W560EE67wL8IDJ.baAoZOVVuCOZzsXvq7Z7vYCf.7Lwrd/CTvddK",
        telefone: "71991858460",
        cargo: "CEO",
        data_nascimento: new Date("1997-08-17"),
        cpf: "00000000000",
        accessLevel: "administrador",
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
      },
      {
        nome: "Enzo Goncalves",
        email: "enzogoncalves@gmail.com",
        password: "$2a$12$9hFJsSApGhK8Bv98iOyK1eAEqw2ydWWbzQYkIvtTOJPQa2bVZr9XC",
        telefone: "71987997331",
        cargo: "Financeiro",
        data_nascimento: new Date("1997-08-17"),
        cpf: "1234123123141",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  console.log("Usuários criados:", Usuarios);
}
