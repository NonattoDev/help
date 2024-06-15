import { createMaterias } from "./materias";
import { createAlunos } from "./alunos";
import { createUsuarios } from "./usuarios";
import { createProfessor } from "./professor";
import { createSeries } from "./series";
import prisma from "../prismaInstance";

async function main() {
  await createSeries(prisma);
  await createMaterias(prisma);
  await createAlunos(prisma);
  await createUsuarios(prisma);
  await createProfessor(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
