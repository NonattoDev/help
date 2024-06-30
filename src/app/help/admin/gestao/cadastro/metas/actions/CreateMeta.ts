"use server";

import prisma from "@/utils/prismaInstance";
import { Metas } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export const CreateMeta = async (meta: Metas, atualizar: boolean) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return {
        success: false,
        message: "Usuário não autenticado",
      };
    }

    if (session?.user.accessLevel !== "administrador") {
      return {
        success: false,
        message: "Usuário não autorizado",
      };
    }

    const metaExistente = await prisma.metas.findFirst({
      where: {
        mesAno: meta.mesAno,
      },
    });

    if (metaExistente && !atualizar) {
      return {
        success: false,
        message: "Meta já cadastrada",
      };
    }

    if (atualizar && metaExistente) {
      const atualizarMeta = await prisma.metas.update({
        where: {
          mesAno: meta.mesAno,
        },
        data: {
          faturamento: parseFloat(meta.faturamento.toString()),
          vendas: Number(meta.vendas),
          alunosAtivos: Number(meta.alunosAtivos),
        },
      });

      if (!atualizarMeta) {
        return {
          success: false,
          message: "Erro ao atualizar meta",
        };
      }

      return {
        success: true,
        message: "Meta atualizada com sucesso",
      };
    }

    const createMeta = await prisma.metas.create({
      data: {
        faturamento: parseFloat(meta.faturamento.toString()),
        vendas: Number(meta.vendas),
        alunosAtivos: Number(meta.alunosAtivos),
        mesAno: meta.mesAno,
      },
    });

    if (!createMeta) {
      return {
        success: false,
        message: "Erro ao cadastrar meta",
      };
    }

    return {
      success: true,
      message: "Meta cadastrada com sucesso",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Erro ao cadastrar meta",
    };
  } finally {
    await prisma.$disconnect();
  }
};
