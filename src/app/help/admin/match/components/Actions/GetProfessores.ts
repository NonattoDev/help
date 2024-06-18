"use server";
import { Professor } from "@/interfaces/professor.interface";
import prisma from "../../../../../../../prisma/prismaInstance";
import { Client } from "@googlemaps/google-maps-services-js";
import Aluno from "@/interfaces/aluno.interface";

export interface ProfessoresMatch extends Professor {
  distanciaEmKm: number;
}

const client = new Client({});
// Regras de match:
// Dominio do conteúdo e série
// Disponíbilidade de horário
// Já estar próximo da região do aluno

export const getProfessores = async (aluno: Aluno) => {
  const professores = await prisma.professor.findMany({
    where: {
      ativo: true,
      turmas_habilitadas: {
        has: aluno.ano_escolar,
      },
    },
    include: {
      // Esse include é necessário para que vejamos a agenda do professor e possamos mostrar o calendário de disponibilidade com datas desabilitadas
      AgendaAulas: true,
    },
  });

  if (!professores) return [];
  let professoresFiltrados = professores.filter((professor) => professor.materias.some((materia) => aluno.dificuldades.includes(materia)));

  if (professoresFiltrados.length === 0) return [];

  for (let prof of professoresFiltrados) {
    const professor = prof as unknown as ProfessoresMatch;
    // const distancia = await calcularDistancia(aluno?.endereco?.cep, professor.endereco?.cep);
    // professor.distanciaEmKm = distancia;
    professor.distanciaEmKm = 20;
  }

  return professoresFiltrados as unknown as ProfessoresMatch[];
};

const calcularDistancia = async (enderecoAluno: string, enderecoProfessor: string): Promise<number> => {
  try {
    const response = await client.distancematrix({
      params: {
        origins: [enderecoAluno],
        destinations: [enderecoProfessor],
        key: process.env.GOOGLE_MAPS_API_KEY as string,
      },
      timeout: 1000,
    });

    const distanciaEmMetros = response.data.rows[0].elements[0].distance.value;
    return parseFloat((distanciaEmMetros / 1000).toFixed(1));
  } catch (error) {
    console.error("Erro ao calcular distância:", error);
    return 0;
  }
};
