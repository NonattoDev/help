"use server";
import prisma from "@/utils/prismaInstance";

// Defina o tipo para o campo financeiro
type Financeiro = {
  valor: string; // Ajuste para refletir o tipo correto conforme armazenado no JSON
  qtd_aulas: number;
  dia_vencimento: string;
};

export const GetValoresReceber = async () => {
  try {
    const alunosAtivos = await prisma.aluno.findMany({
      where: {
        ativo: true,
      },
    });

    const aReceber = alunosAtivos.reduce((acc, curr) => {
      if (curr.financeiro) {
        const financeiro: Financeiro = curr.financeiro as unknown as Financeiro;
        const valorNumerico = parseFloat(financeiro.valor);
        return acc + valorNumerico;
      }
      return acc;
    }, 0);

    return {
      success: true,
      data: aReceber,
    };
  } catch (error: any) {
    return {
      success: false,
      data: 0,
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
};
