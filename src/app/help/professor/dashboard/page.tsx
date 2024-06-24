import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { AgendaAulas } from "@prisma/client";
import { getServerSession } from "next-auth";
import PainelProfessor from "./PainelProfessor";

export const metadata = {
  title: "Help - Professor",
};

const getDados = async () => {
  const session = await getServerSession(authOptions);

  const AgendaProfessor = await prisma.agendaAulas.findMany({
    where: {
      professorId: session?.user?.id,
    },
    include: {
      aluno: true,
      professor: true,
    },
  });

  if (AgendaProfessor.length === 0) {
    return { AgendaProfessor: [] as AgendaAulas[] };
  }

  await prisma.$disconnect();

  return { AgendaProfessor };
};
export default async function professorDashboard() {
  const { AgendaProfessor } = await getDados();

  return (
    <div>
      <h1 className="text-center font-semibold text-2xl">Dashboard do professor</h1>
      <PainelProfessor AgendaProfessor={AgendaProfessor} />
    </div>
  );
}
