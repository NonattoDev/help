import { Suspense } from "react";
import AgendaAlunos from "./AgendaAlunos";
import prisma from "@/utils/prismaInstance";

async function getAllAlunos() {
  const alunosNome = await prisma.aluno.findMany({
    where: {
      ativo: true,
    },
  });

  if (!alunosNome) {
    return [];
  }

  return alunosNome;
}
export default async function AlunosAgenda() {
  const alunos = await getAllAlunos();

  const fallBackLoading = <div className="flex flex-col justify-center items-center skeleton w-full h-32"></div>;

  return (
    <Suspense fallback={fallBackLoading}>
      <AgendaAlunos alunos={alunos} />
    </Suspense>
  );
}
