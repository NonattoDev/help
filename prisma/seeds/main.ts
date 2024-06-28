import prisma from "../../src/utils/prismaInstance";
import { createMaterias } from "./materias";
import { createAlunos } from "./alunos";
import { createUsuarios } from "./usuarios";
import { createProfessor } from "./professor";
import { createSeries } from "./series";
import { createValores } from "./valores";
import { createCargos } from "./cargos";
import { createNiveisAcesso } from "./accessLevel";

async function main() {
  await createCargos(prisma);
  await createNiveisAcesso(prisma);
  await createSeries(prisma);
  await createMaterias(prisma);
  await createAlunos(prisma);
  await createUsuarios(prisma);
  await createProfessor(prisma);
  await createValores(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
