import { PrismaClient } from "@prisma/client";
import { createMaterias } from "./materias";
import { createAlunos } from "./alunos";
import { createUsuarios } from "./usuarios";

const prisma = new PrismaClient();

async function main() {
  await createMaterias(prisma);
  await createAlunos(prisma);
  await createUsuarios(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
