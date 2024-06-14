import prisma from "../../../../../../../../prisma/prismaInstance";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import EditAluno from "@/components/EditForms/EditAluno/EditAluno";

async function getDados(id: string) {
  const session = await getServerSession(authOptions);
  const materias = await prisma.materias.findMany();
  const series = await prisma.series.findMany();
  const aluno: any = await prisma.aluno.findUnique({
    where: {
      id,
    },
    include: {
      responsavel: true,
    },
  });

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
