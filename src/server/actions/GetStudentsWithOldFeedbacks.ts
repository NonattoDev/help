"use server";

import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { getServerSession } from "next-auth";
import moment from "moment";

export const GetStudentsWithOldFeedbacks = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  try {
    // Buscar todos os alunos que têm agenda com o professor e cujas aulas estão finalizadas
    const students = await prisma.aluno.findMany({
      where: {
        AgendaAulas: {
          some: {
            professorId: session.user.id,
            finalizada: true,
          },
        },
      },
    });

    const threeMonthsAgo = moment().subtract(3, "months");

    // Filtrar os alunos cujos feedbacks têm mais de 3 meses
    const studentsWithOldFeedbacks = [];

    for (const student of students) {
      const feedbacks = await prisma.feedbacks.findMany({
        where: {
          alunoId: student.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1, // Pega apenas o último feedback
      });

      if (feedbacks.length > 0) {
        const lastFeedbackDate = moment(feedbacks[0].createdAt);
        if (lastFeedbackDate.isBefore(threeMonthsAgo)) {
          studentsWithOldFeedbacks.push(student);
        }
      } else {
        // Se não há feedbacks, considere o aluno
        studentsWithOldFeedbacks.push(student);
      }
    }

    return {
      success: true,
      studentsWithOldFeedbacks,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao buscar alunos",
    };
  } finally {
    await prisma.$disconnect();
  }
};
