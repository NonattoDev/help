import { PrismaClient } from "@prisma/client";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Help - Cliente",
};

const prisma = new PrismaClient();

async function getData() {
  const session = await getServerSession();

  console.log("Session:", session);

  const user = await prisma.usuarios.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  });

  console.log("User:", user);

  return session;
}

export default async function ClientePage() {
  const data = await getData();
  return <h1>Cliente Works</h1>;
}
