import prisma from "../../../../../../../prisma/prismaInstance";
import CreateProfessor from "../Components/CreateProfessor/CreateProfessor";

async function getDados() {
  let materias = await prisma.materias.findMany();

  return materias;
}

export default async function createNewProfessor() {
  const materias = await getDados();

  return <CreateProfessor materias={materias} />;
}
