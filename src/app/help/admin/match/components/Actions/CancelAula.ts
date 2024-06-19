"use server";

import prisma from "../../../../../../../prisma/prismaInstance";

export const CancelAula = async (id: string) => {
  const agendaCancelada = await prisma.agendaAulas.update({
    data: {
      cancelada: true,
    },
    where: {
      id,
    },
  });

  return agendaCancelada;
};
