import prisma from "../../../../../../../prisma/prismaInstance";
import CreateAluno from "./CreateAluno";

async function getDados() {
  let materias = await prisma.materias.findMany();
  let series = await prisma.series.findMany();

  await prisma.$disconnect();

  return { materias, series };
}

export default async function createNewAluno() {
  const { materias, series } = await getDados();
  return <CreateAluno materias={materias} series={series} />;
}
