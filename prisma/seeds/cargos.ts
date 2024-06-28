import { PrismaClient } from "@prisma/client";

export async function createCargos(prisma: PrismaClient) {
  const cargos = await prisma.cargos.createMany({
    data: [
      { cargo: "CEO" },
      { cargo: "Pedagógico e Recursos Humanos" },
      { cargo: "Atendimento e Comercial" },
      { cargo: "Financeiro" },
      { cargo: "Tecnologia e Suporte" },
      { cargo: "Marketing e Comunicação" },
      { cargo: "Logística e Operações" },
      { cargo: "Controle de Qualidade" },
      { cargo: "Desenvolvimento de Produtos" },
      { cargo: "Relacionamento com Clientes" },
      { cargo: "Social Media" },
      { cargo: "Gestor de Tráfego" },
      { cargo: "Estrategista Digital" },
    ],
    skipDuplicates: true,
  });

  await prisma.$disconnect();

  console.log("Cargos criados:", cargos);
}
