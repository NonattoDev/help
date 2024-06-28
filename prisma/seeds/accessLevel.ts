import { PrismaClient } from "@prisma/client";

export async function createNiveisAcesso(prisma: PrismaClient) {
  const niveisAcesso = await prisma.niveisAcesso.createMany({
    data: [{ accessLevel: "administrador" }, { accessLevel: "responsavel" }, { accessLevel: "aluno" }, { accessLevel: "professor" }, { accessLevel: "administrativo" }],
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  console.log("Níveis de acesso criados:", niveisAcesso);
}
