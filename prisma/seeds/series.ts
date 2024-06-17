import { PrismaClient } from "@prisma/client/extension";

export async function createSeries(prisma: PrismaClient) {
  const series = await prisma.series.createMany({
    data: [
      { serie: "1 ano" },
      { serie: "2 ano" },
      { serie: "3 ano" },
      { serie: "4 ano" },
      { serie: "5 ano" },
      { serie: "6 ano" },
      { serie: "7 ano" },
      { serie: "8 ano" },
      { serie: "9 ano" },
      { serie: "1 Série do Ensino Médio" },
      { serie: "2 Série do Ensino Médio" },
      { serie: "3 Série do Ensino Médio" },
    ],
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  console.log("Series criadas:", series);
}
