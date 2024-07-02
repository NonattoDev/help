"use server";

import prisma from "@/utils/prismaInstance";
import { Atendimentos, Lead } from "@prisma/client";

export const CreateNewLead = async (lead: Lead, atendimento: Atendimentos) => {
  try {
    console.log(lead);
    // Significa que é um novo Lead, ou seja um novo cliente.
    if (lead.id === "novoCliente") {
      const addCRM = await prisma.lead.create({
        data: {
          nomeCliente: lead.nomeCliente,
          telefoneCliente: lead.telefoneCliente,
          emailCliente: lead.emailCliente,
          atendimentos: {
            create: {
              descricaoAtendimento: atendimento.descricaoAtendimento,
              dataAtendimento: atendimento.dataAtendimento,
              tipoAtendimento: atendimento.tipoAtendimento,
            },
          },
        },
      });

      return {
        success: true,
        message: "Lead criado com sucesso!",
        Lead: addCRM,
      };
    }

    // Significa que é um atendimento para um Lead já existente.

    const addAtendimento = await prisma.atendimentos.create({
      data: {
        descricaoAtendimento: atendimento.descricaoAtendimento,
        dataAtendimento: atendimento.dataAtendimento,
        tipoAtendimento: atendimento.tipoAtendimento,
        clienteId: lead.id,
      },
    });

    return {
      success: true,
      message: "Atendimento criado com sucesso!",
      Atendimento: addAtendimento,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Erro ao criar Lead",
    };
  } finally {
    await prisma.$disconnect();
  }
};
