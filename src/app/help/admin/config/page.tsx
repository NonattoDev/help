import prisma from "@/utils/prismaInstance";
import EditValores from "./EditValores";

const getDados = async () => {
  const valores = await prisma.valores.findMany();

  await prisma.$disconnect();

  return { valores };
};

export default async function Config() {
  const { valores } = await getDados();

  return (
    <div>
      <h1>Configurações de valores do sistema</h1>
      <EditValores valores={valores} />
    </div>
  );
}
