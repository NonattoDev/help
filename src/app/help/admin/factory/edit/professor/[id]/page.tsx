import EditProfessor from "@/app/help/config/[id]/meuperfil/Components/EditProfessor";
import prisma from "../../../../../../../../prisma/prismaInstance";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

async function getDados(id: string) {
  let session = await getServerSession(authOptions);
  let materias = await prisma.materias.findMany();
  let professor: any = await prisma.professor.findUnique({
    where: {
      id,
    },
  });

  await prisma.$disconnect();
  if (professor) {
    return { professor, materias, session };
  }

  redirect("/");
}

export default async function createNewProfessor({ params }: { params: { id: string } }) {
  const { professor, materias, session } = await getDados(params.id);

  return <EditProfessor professor={professor} materias={materias} accessLevel={session?.user.accessLevel} />;
}
