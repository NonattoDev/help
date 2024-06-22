import prisma from "@/utils/prismaInstance";
import CreateProfessor from "./CreateProfessor";

async function getDados() {
  let materias = await prisma.materias.findMany();
  let series = await prisma.series.findMany();

  await prisma.$disconnect();

  return { materias, series };
}

export default async function createNewProfessor() {
  const { materias, series } = await getDados();

  return <CreateProfessor materias={materias} series={series} />;
}
