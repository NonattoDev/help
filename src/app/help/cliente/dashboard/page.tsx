import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import PainelAluno from "./PainelAluno";
import PainelResponsavel from "./PainelResponsavel";

export const metadata: Metadata = {
  title: "Help - Dashboard",
};

async function getData() {
  const session = await getServerSession(authOptions);

  let user: any = null;

  switch (session?.user?.accessLevel) {
    case "aluno":
      user = await prisma.aluno.findUnique({
        where: {
          email: session?.user?.email ?? undefined,
        },
        include: {
          AgendaAulas: {
            include: {
              professor: true,
              aluno: true,
            },
          },
        },
      });
      break;
    case "responsavel":
      user = await prisma.responsavel.findUnique({
        where: {
          email: session?.user?.email ?? undefined,
        },
        include: {
          alunos: {
            include: {
              AgendaAulas: {
                include: {
                  professor: true,
                  aluno: true,
                },
              },
            },
          },
        },
      });
  }

  await prisma.$disconnect();
  return { user };
}

export default async function ClientePage() {
  const { user } = await getData();

  // Extracting AgendaAulas for "aluno" and "responsavel"
  let agendaAulas: any[] = [];
  if (user?.accessLevel === "aluno") {
    agendaAulas = user?.AgendaAulas ?? [];
  } else if (user?.accessLevel === "responsavel") {
    user?.alunos.forEach((aluno: any) => {
      agendaAulas = agendaAulas.concat(aluno.AgendaAulas ?? []);
    });
  }

  return (
    <div>
      <h2 className="text-center text-2xl">Olá {user?.nome}</h2>
      {user?.accessLevel === "aluno" && <PainelAluno AgendaAluno={agendaAulas} />}
      {user?.accessLevel === "responsavel" && <PainelResponsavel AgendaAluno={agendaAulas} />}
    </div>
  );
}
