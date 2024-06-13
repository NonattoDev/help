import prisma from "../../../../../../../../prisma/prismaInstance";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import EditAluno from "@/app/help/config/[id]/meuperfil/Components/EditAluno";

async function getDados(id: string) {
  let session = await getServerSession(authOptions);
  let materias = await prisma.materias.findMany();
  let series = await prisma.series.findMany();
  let aluno: any = await prisma.aluno.findUnique({
    where: {
      id,
    },
    include: {
      responsavel: true,
    },
  });

  await prisma.$disconnect();
  if (aluno) {
    console.log(aluno);
    return { aluno, materias, session, series };
  }

  redirect("/");
}

export default async function adminEditAluno({ params }: { params: { id: string } }) {
  const { aluno, materias, session, series } = await getDados(params.id);

  return <EditAluno aluno={aluno} materias={materias} series={series} accessLevel={session?.user.accessLevel} />;
}
