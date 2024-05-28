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
    skipDuplicates: true, // Ignora duplicados se já existirem
  });

  console.log("Materias criadas:", materias);

  const adminUsers = await prisma.admin.createMany({
    data: [
      {
        nome: "Lara",
        email: "larahelp@gmail.com",
        password: "Lara123!",
        cpf: "00000000000",
      },
      {
        nome: "Robson Nonato",
        email: "robsonnonatoiii@gmail.com",
        password: "Robson123!",
        cpf: "08362023503",
      },
    ],
    skipDuplicates: true,
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
