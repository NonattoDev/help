"use server";
import prisma from "@/utils/prismaInstance";
import { Usuarios, UsuariosFinanceiro } from "@prisma/client";
import { hashSync } from "bcryptjs";

export const UpdateColaborador = async (formData: Usuarios & { financeiro: UsuariosFinanceiro }, senhaAtual: string) => {
  if (formData.password !== senhaAtual) {
    formData.password = hashSync(formData.password, 12);
  }
  try {
    const updatedColaborador = await prisma.usuarios.update({
      where: {
        id: formData.id,
      },
      data: {
        ...formData,
        financeiro: {
          update: {
            valor: parseFloat(formData.financeiro.valor.toString()),
            diaPagamento: formData.financeiro.diaPagamento,
          },
        },
      },
    });

    return {
      success: true,
      message: "Dados atualizados com sucesso",
      updatedColaborador,
    };
  } catch (error) {
    console.error("UpdateColaborador", error);
    return {
      success: false,
      message: "Erro ao atualizar dados",
    };
  }
};
