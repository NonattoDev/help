import { authOptions } from "@/app/lib/auth";
import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Help - Cliente",
};

const prisma = new PrismaClient();

async function getData() {
  const session = await getServerSession(authOptions);

  let user = null;

  switch (session?.user?.accessLevel) {
    case "aluno":
      user = await prisma.aluno.findUnique({
        where: {
          email: session?.user?.email ?? undefined,
        },
      });
      break;
    case "responsavel":
      user = await prisma.responsavel.findUnique({
        where: {
          email: session?.user?.email ?? undefined,
        },
      });
  }

  return user;
}

export default async function ClientePage() {
  const data = await getData();
  return <h1>Página de Alunos e Responsaveis, Works!</h1>;
}
