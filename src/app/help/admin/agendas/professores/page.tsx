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

  return (
    <Suspense fallback={<>Loading...</>}>
      <AgendaProfessores professores={professores} />
    </Suspense>
  );
}
