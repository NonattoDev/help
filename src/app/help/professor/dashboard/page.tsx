import { authOptions } from "@/app/lib/auth";
import prisma from "@/utils/prismaInstance";
import { AgendaAulas } from "@prisma/client";
import { getServerSession } from "next-auth";
import PainelProfessor from "./PainelProfessor";
import { redirect } from "next/navigation";

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

  return { AgendaProfessor, idProfessor: session?.user?.id };
};
export default async function professorDashboard() {
  const { AgendaProfessor, idProfessor } = await getDados();

  return (
    <div>
      <h1 className="text-center font-semibold text-2xl my-4">Dashboard do professor</h1>
      <PainelProfessor AgendaProfessor={AgendaProfessor} professorId={idProfessor!} />
    </div>
  );
}
