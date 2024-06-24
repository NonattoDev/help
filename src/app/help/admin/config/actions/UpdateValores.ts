"use server";

import prisma from "@/utils/prismaInstance";
import { Valores } from "@prisma/client";

export async function UpdateValores(valores: Valores[]) {
  const updatePromises = valores.map((valor) =>
    prisma.valores.update({
      where: { id: valor.id },
      data: {
        nome: valor.nome,
        valor: valor.valor,
        updatedAt: new Date(), // Atualize o campo updatedAt manualmente se necessário
      },
    })
  );

  const updateResults = await Promise.all(updatePromises);

  await prisma.$disconnect();

  return {
    success: true,
    message: "Valores atualizados com sucesso!",
    data: updateResults,
  };
}
