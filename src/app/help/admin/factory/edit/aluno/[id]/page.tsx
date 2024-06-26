import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import EditAluno from "@/components/EditForms/EditAluno/EditAluno";
import prisma from "@/utils/prismaInstance";
import Aluno from "@/interfaces/aluno.interface";

async function getDados(id: string) {
  let session = await getServerSession(authOptions);
  let materias = await prisma.materias.findMany();
  let series = await prisma.series.findMany();
  let aluno: Aluno = (await prisma.aluno.findUnique({
    where: {
      id,
    },
    include: {
      responsavel: true,
      dadosFinanceiro: true,
      AgendaAulas: true,
    },
  })) as Aluno;

  await prisma.$disconnect();
  if (aluno) {
    return { aluno, materias, session, series };
  }

  redirect("/");
}

export default async function adminEditAluno({ params }: { params: { id: string } }) {
  const { aluno, materias, session, series } = await getDados(params.id);

  return <EditAluno aluno={aluno} materias={materias} series={series} accessLevel={session?.user.accessLevel} />;
}
