import { PrismaClient } from "@prisma/client/extension";

export async function createUsuarios(prisma: PrismaClient) {
  const Usuarios = await prisma.usuarios.createMany({
    data: [
      {
        nome: "Lara",
        email: "larahelp@gmail.com",
        password: "$2a$12$5W560EE67wL8IDJ.baAoZOVVuCOZzsXvq7Z7vYCf.7Lwrd/CTvddK",
        cargo: "Diretora",
        cpf: "00000000000",
        accessLevel: "administrador",
      },
      {
        nome: "Robson Nonato",
        email: "robsonnonatoiii@gmail.com",
        password: "$2a$12$10oHNPbBg./ixfTqV2KPneC0Z78ivt9Ko/6cIcRL7KoKtqjPemNeq",
        cargo: "Desenvolvedor",
        cpf: "08362023503",
        accessLevel: "administrador",
      },
      {
        nome: "Enzo Goncalves",
        email: "enzogoncalves@gmail.com",
        password: "$2a$12$9hFJsSApGhK8Bv98iOyK1eAEqw2ydWWbzQYkIvtTOJPQa2bVZr9XC",
        cargo: "Financeiro",
        cpf: "1234123123141",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Usuários criados:", Usuarios);
}
