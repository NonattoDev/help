"use server";
import { Usuarios } from "@prisma/client";

export const UpdateColaborador = async (formData: Usuarios) => {
  console.log("UpdateColaborador", formData);

  return {
    success: true,
    message: "Dados atualizados com sucesso",
  };
};
