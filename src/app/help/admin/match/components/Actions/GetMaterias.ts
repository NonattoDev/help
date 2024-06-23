"use server";

import prisma from "@/utils/prismaInstance";

export const GetMaterias = async () => {
  const materias = await prisma.materias.findMany();

  return materias;
};
