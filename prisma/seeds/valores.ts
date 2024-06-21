import { PrismaClient } from "@prisma/client/extension";

export async function createValores(prisma: PrismaClient) {
  const Valores = await prisma.valores.createMany({
    data: [
      {
        nome: "AULA PRESENCIAL",
        valor: 20.0,
      },
      {
        nome: "AULA ONLINE",
        valor: 16.0,
      },
      {
        nome: "TRANSPORTE PÚBLICO",
        valor: 5.2,
      },
      {
        nome: "AULA CANCELADA ONLINE",
        valor: 8.0,
      },
      {
        nome: "AULA CANCELADA PRESENCIAL",
        valor: 10.0,
      },
    ],
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  console.log("Valores do sistema criados:", Valores);
}
