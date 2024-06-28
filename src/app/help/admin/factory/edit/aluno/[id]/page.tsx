import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import EditAluno from "@/components/EditForms/EditAluno/EditAluno";
import prisma from "@/utils/prismaInstance";

async function getDados(id: string) {
  let session = await getServerSession(authOptions);
  let materias = await prisma.materias.findMany();
  let series = await prisma.series.findMany();

  let aluno = await prisma.aluno.findUnique({
    where: {
      id,
    },
    include: {
      responsavel: true,
      dadosFinanceiro: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      AgendaAulas: true,
    },
  });

  await prisma.$disconnect();

  if (aluno) {
    if (aluno.dadosFinanceiro && aluno.dadosFinanceiro.length > 0) {
      aluno.dadosFinanceiro = aluno.dadosFinanceiro[0] as unknown as any;
    }

    return { aluno, materias, session, series };
  }

  redirect("/");
}

export default async function adminEditAluno({ params }: { params: { id: string } }) {
  const { aluno, materias, session, series } = await getDados(params.id);

  return <EditAluno aluno={aluno as any} materias={materias} series={series} accessLevel={session?.user.accessLevel} />;
}
