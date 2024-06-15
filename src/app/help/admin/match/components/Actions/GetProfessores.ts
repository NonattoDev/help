"use server";
import { Professor } from "@/interfaces/professor.interface";
import prisma from "../../../../../../../prisma/prismaInstance";
import { Aluno } from "@prisma/client";

// Regras de match:

// Dominio do conteúdo e série
// Disponíbilidade de horário
// Já estar próximo da região do aluno

export const getProfessores = async (aluno: Aluno) => {
  const professores = await prisma.professor.findMany({
    where: {
      turmas_habilitadas: {
        has: aluno.ano_escolar,
      },
    },
  });

  console.log(professores);

  const professoresFiltrados = professores.filter((professor) => professor.materias.some((materia) => aluno.dificuldades.includes(materia)));

  console.log(professoresFiltrados);

  return professores as unknown as Professor[];
};
