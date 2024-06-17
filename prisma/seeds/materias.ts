import { PrismaClient } from "@prisma/client/extension";

export async function createMaterias(prisma: PrismaClient) {
  const materias = await prisma.materias.createMany({
    data: [
      { materia: "Matemática" },
      { materia: "Linguagens" },
      { materia: "Português" },
      { materia: "Redação" },
      { materia: "História" },
      { materia: "Geografia" },
      { materia: "Ciências" },
      { materia: "Física" },
      { materia: "Química" },
      { materia: "Biologia" },
      { materia: "Inglês I" },
      { materia: "Inglês II" },
      { materia: "Inglês III" },
      { materia: "Espanhol" },
      { materia: "Filosofia" },
      { materia: "Sociologia" },
      { materia: "Artes" },
      { materia: "Acompanhamento Geral" },
    ],
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  console.log("Materias criadas:", materias);
}
