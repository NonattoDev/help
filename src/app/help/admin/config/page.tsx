import prisma from "@/utils/prismaInstance";
import EditValores from "./EditValores";

export const metadata = {
  title: "Help - Configurações do sistema",
};

const getDados = async () => {
  const valores = await prisma.valores.findMany();

  await prisma.$disconnect();

  return { valores };
};

export default async function Config() {
  const { valores } = await getDados();

  return (
    <div>
      <EditValores valores={valores} />
    </div>
  );
}
