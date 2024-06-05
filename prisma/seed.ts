const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const materias = await prisma.materias.createMany({
    data: [
      { materia: "Matemática" },
      { materia: "Português" },
      { materia: "História" },
      { materia: "Geografia" },
      { materia: "Ciências" },
      { materia: "Física" },
      { materia: "Química" },
      { materia: "Biologia" },
      { materia: "Inglês" },
      { materia: "Espanhol" },
      { materia: "Filosofia" },
      { materia: "Sociologia" },
      { materia: "Artes" },
      { materia: "Educação Física" },
    ],
  });

  console.log("Materias criadas:", materias);

  const adminUsers = await prisma.admin.createMany({
    data: [
      {
        nome: "Lara",
        email: "larahelp@gmail.com",
        password: "$2a$12$5W560EE67wL8IDJ.baAoZOVVuCOZzsXvq7Z7vYCf.7Lwrd/CTvddK",
        cpf: "00000000000",
      },
      {
        nome: "Robson Nonato",
        email: "robsonnonatoiii@gmail.com",
        password: "$2a$12$10oHNPbBg./ixfTqV2KPneC0Z78ivt9Ko/6cIcRL7KoKtqjPemNeq",
        cpf: "08362023503",
      },
    ],
  });

  console.log("Admins criados:", adminUsers);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
