import prisma from "../../../../../../prisma/prismaInstance";
import { Suspense } from "react";
import AgendaProfessores from "./AgendaProfessor";

export async function getAllProfessores() {
  const professoresNome = await prisma.professor.findMany({
    where: {
      ativo: true,
    },
  });

  if (!professoresNome) {
    return [];
  }

  return professoresNome;
}
export default async function ProfessoresAgendas() {
  const professores = await getAllProfessores();

  const fallBackLoading = <div className="flex flex-col justify-center items-center skeleton w-full h-32"></div>;

  return (
    <Suspense fallback={fallBackLoading}>
      <AgendaProfessores professores={professores} />
    </Suspense>
  );
}
