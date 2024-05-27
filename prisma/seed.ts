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
      { materia: "Informática" },
    ],
    skipDuplicates: true, // Ignora duplicados se já existirem
  });

  console.log("Materias criadas:", materias);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
