"use server";
import prisma from "@/utils/prismaInstance";

export const GetSelects = async () => {
  const [cargos, niveisAcesso] = await Promise.all([prisma.cargos.findMany(), prisma.niveisAcesso.findMany()]);

  if (!cargos || !niveisAcesso || cargos.length === 0 || niveisAcesso.length === 0) {
    return {
      success: false,
      cargos: [],
      niveisAcesso: [],
    };
  }

  return {
    success: true,
    cargos,
    niveisAcesso,
  };
};
