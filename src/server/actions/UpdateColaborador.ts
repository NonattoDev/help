"use server";
import prisma from "@/utils/prismaInstance";
import { Usuarios, FinanceiroUsuarios } from "@prisma/client";
import { hashSync } from "bcryptjs";
import moment from "moment";

export const UpdateColaborador = async (formData: Usuarios & { financeiro: FinanceiroUsuarios }, senhaAtual: string) => {
  if (formData.password !== senhaAtual) {
    formData.password = hashSync(formData.password, 12);
  }

  try {
    const currentFinanceiro = await prisma.financeiroUsuarios.findFirst({
      where: { usuarioId: formData.id },
      orderBy: { createdAt: "desc" },
    });

    const novoValor = parseFloat(formData.financeiro.valor.toString());
    const proximoMes = moment().add(1, "month").startOf("month").toDate();

    if (currentFinanceiro && (currentFinanceiro.valor !== novoValor || currentFinanceiro.diaPagamento !== formData.financeiro.diaPagamento)) {
      const proximoFinanceiro = await prisma.financeiroUsuarios.findFirst({
        where: { usuarioId: formData.id, createdAt: proximoMes },
      });

      if (proximoFinanceiro) {
        // Atualizar o registro financeiro do próximo mês
        await prisma.financeiroUsuarios.update({
          where: { id: proximoFinanceiro.id },
          data: {
            valor: novoValor,
            diaPagamento: formData.financeiro.diaPagamento,
          },
        });
      } else {
        // Adicionar um novo registro financeiro com início no próximo mês
        await prisma.financeiroUsuarios.create({
          data: {
            usuarioId: formData.id,
            valor: novoValor,
            diaPagamento: formData.financeiro.diaPagamento,
            status: "pendente",
            createdAt: proximoMes, // Data de início no próximo mês
          },
        });
      }
    }

    const updatedColaborador = await prisma.usuarios.update({
      where: {
        id: formData.id,
      },
      data: {
        nome: formData.nome,
        email: formData.email,
        cpf: formData.cpf,
        cargo: formData.cargo,
        telefone: formData.telefone,
        password: formData.password,
        accessLevel: formData.accessLevel,
        ativo: formData.ativo,
        data_nascimento: moment(formData.data_nascimento).toDate(),
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
