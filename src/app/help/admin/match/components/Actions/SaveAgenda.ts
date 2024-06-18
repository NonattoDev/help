"use server";
import { AgendaAulas } from "@prisma/client";
import prisma from "../../../../../../../prisma/prismaInstance";

export const saveAgenda = async (agenda: AgendaAulas) => {
  console.log(agenda);

  try {
    const insertAgenda = await prisma.agendaAulas.create({
      data: agenda,
    });
  } catch (error) {
    console.error("Erro ao salvar a agenda:", error);
  }
};
