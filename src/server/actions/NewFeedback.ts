"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { Feedbacks } from "@prisma/client";
import { getServerSession } from "next-auth";

export const NewFeedback = async (feedBack: Feedbacks) => {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const feedback = await prisma.feedbacks.create({
    data: {
      alunoId: feedBack.alunoId,
      professorId: session.user.id,
      autonomia: feedBack.autonomia,
      comentarios: feedBack.comentarios,
      concentracao: feedBack.concentracao,
      desenvolvimento: feedBack.desenvolvimento,
      interpretacao: feedBack.interpretacao,
      materiaisSugeridos: feedBack.materiaisSugeridos,
      proximosPassos: feedBack.proximosPassos,
    },
  });
};
