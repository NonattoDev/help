import { authOptions } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { EditProfessor } from "./Components/EditProfessor";

async function getUserData(id: string) {
  const prisma = new PrismaClient();

  const session = await getServerSession(authOptions);

  let userData;

  switch (session?.user?.accessLevel) {
    case "administrador":
    case "administrativo":
      userData = await prisma.usuarios.findUnique({
        where: {
          id: id,
        },
      });
      break;
    case "aluno":
      userData = await prisma.aluno.findUnique({
        where: {
          id: id,
        },
      });
      break;
    case "responsavel":
      userData = await prisma.responsavel.findUnique({
        where: {
          id: id,
        },
      });
      break;
    case "professor":
      userData = await prisma.professor.findUnique({
        where: {
          id: id,
        },
      });
      break;
    default:
      break;
  }

  prisma.$disconnect();

  if (!userData) {
    redirect("/");
  }

  return userData;
}

export default async function configMeuperfilPage({ params }: { params: { id: string } }) {
  const userData = await getUserData(params.id);

  return (
    <div>
      <p className="text-xl text-center mb-11">Olá, {userData.nome}! Esta é a página do seu perfil.</p>
      {userData.accessLevel === "professor" && <EditProfessor professor={userData} />}
    </div>
  );
}
