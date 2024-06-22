import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import EditProfessor from "../../../../../components/EditForms/EditProfessor/EditProfessor";
import EditAluno from "../../../../../components/EditForms/EditAluno/EditAluno";
import EditResponsavel from "../../../../../components/EditForms/EditResponsavel/EditResponsavel";
import EditAdmin from "../../../../../components/EditForms/EditAdmin/EditAdmin";
import prisma from "@/utils/prismaInstance";

async function getUserData(id: string) {
  const session = await getServerSession(authOptions);

  let userData: any;
  let materias: any;
  let series: any;

  switch (session?.user?.accessLevel) {
    case "administrador":
    case "administrativo":
      userData = await prisma.usuarios.findUnique({
        where: { id: id },
      });
      break;
    case "aluno":
      userData = await prisma.aluno.findUnique({
        where: { id: id },
        include: {
          responsavel: true,
        },
      });
      materias = await prisma.materias.findMany();
      series = await prisma.series.findMany();
      break;
    case "responsavel":
      userData = await prisma.responsavel.findUnique({
        where: { id: id },
        include: {
          alunos: true,
        },
      });
      break;
    case "professor":
      userData = await prisma.professor.findUnique({
        where: { id: id },
      });
      materias = await prisma.materias.findMany();
      series = await prisma.series.findMany();
      break;
    default:
      break;
  }

  prisma.$disconnect();

  if (!userData) {
    redirect("/");
  }

  return { userData, materias, series };
}

export default async function configMeuperfilPage({ params }: { params: { id: string } }) {
  const { userData, materias, series } = await getUserData(params.id);

  return (
    <div>
      <p className="text-xl text-center mb-2">Olá, {userData.nome}! Esta é a página do seu perfil.</p>
      {userData.accessLevel === "professor" && <EditProfessor professor={userData} materias={materias} series={series} />}
      {userData.accessLevel === "aluno" && <EditAluno aluno={userData} series={series} materias={materias} />}
      {userData.accessLevel === "responsavel" && <EditResponsavel responsavel={userData} />}
      {(userData.accessLevel === "administrador" || userData.accessLevel === "administrativo") && <EditAdmin userData={userData} />}
    </div>
  );
}
