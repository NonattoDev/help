"use server";

import prisma from "@/utils/prismaInstance";
import moment from "moment";

export const CancelAula = async (id: string) => {
  const agendaCancelada = await prisma.agendaAulas.update({
    data: {
      cancelada: true,
    },
    where: {
      id,
    },
  });

  const horaAtual = new Date();
  const horaAula = new Date(agendaCancelada.data);
  horaAula.setHours(parseInt(agendaCancelada.horaInicio.split(":")[0]), parseInt(agendaCancelada.horaInicio.split(":")[1]));

  const diferencaHoras = (horaAula.getTime() - horaAtual.getTime()) / (1000 * 60 * 60);

  let financeiroCancelada;
  const valorTransporte = await prisma.valores.findFirst({
    where: {
      nome: "TRANSPORTE PÚBLICO",
    },
  });

  if (agendaCancelada.modalidade === "ONLINE" && diferencaHoras < 1) {
    console.log("Cancelamento de aula ONLINE menor que 1 hora antes do horário da aula.");
    const valor = await prisma.valores.findFirst({
      where: {
        nome: "AULA CANCELADA ONLINE",
      },
    });
    financeiroCancelada = await prisma.financeiroProfessor.create({
      data: {
        professorId: agendaCancelada.professorId,
        aulaId: agendaCancelada.id,
        valor: valor ? valor.valor : 0.0,
        valor_transporte: 0.0,
        status_aula: "CANCELADA",
        referenciaSemana: "0",
        dataPagamento: moment()
          .day(moment().day() > 5 ? 12 : 5)
          .toDate(),
        status: "PAGAMENTO PENDENTE",
      },
    });
  } else if (agendaCancelada.modalidade === "PRESENCIAL" && diferencaHoras < 2) {
    console.log("Cancelamento de aula PRESENCIAL menor que 2 horas antes do horário da aula.");
    const valor = await prisma.valores.findFirst({
      where: {
        nome: "AULA CANCELADA PRESENCIAL",
      },
    });
    financeiroCancelada = await prisma.financeiroProfessor.create({
      data: {
        professorId: agendaCancelada.professorId,
        aulaId: agendaCancelada.id,
        valor: valor ? valor.valor : 0.0,
        valor_transporte: valorTransporte ? valorTransporte.valor : 0.0,
        status_aula: "CANCELADA",
        referenciaSemana: "0",
        dataPagamento: moment()
          .day(moment().day() > 5 ? 12 : 5)
          .toDate(),
        status: "PAGAMENTO PENDENTE",
      },
    });
  } else {
    const valor = await prisma.valores.findFirst({
      where: {
        nome: agendaCancelada.modalidade === "PRESENCIAL" ? "AULA CANCELADA PRESENCIAL" : "AULA CANCELADA ONLINE",
      },
    });
    financeiroCancelada = await prisma.financeiroProfessor.create({
      data: {
        professorId: agendaCancelada.professorId,
        aulaId: agendaCancelada.id,
        valor: 0.0,
        valor_transporte: 0.0,
        status_aula: "CANCELADA",
        referenciaSemana: "0",
        dataPagamento: moment()
          .day(moment().day() > 5 ? 12 : 5)
          .toDate(),
        status: "PAGAMENTO PENDENTE",
      },
    });
  }

  console.log(agendaCancelada, financeiroCancelada);

  return agendaCancelada;
};
