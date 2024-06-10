import { authOptions } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { EditProfessor } from "./Components/EditProfessor";
import EditAluno from "./Components/EditAluno";
import EditResponsavel from "./Components/EditResponsavel";

async function getUserData(id: string) {
  const prisma = new PrismaClient();

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
      {userData.accessLevel === "professor" && <EditProfessor professor={userData} materias={materias} />}
      {userData.accessLevel === "aluno" && <EditAluno aluno={userData} series={series} materias={materias} />}
      {userData.accessLevel === "responsavel" && <EditResponsavel responsavel={userData} />}
    </div>
  );
}
