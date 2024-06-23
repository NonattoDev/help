import * as ExcelJS from "exceljs";
import moment from "moment";
import { AgendaAulas, Aluno, Professor } from "@prisma/client";

interface Aula extends AgendaAulas {
  aluno: Aluno;
  professor: Professor;
}

export const exportExcel = async (aulas: Aula[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("TabelaFinanceiro");

  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Aluno", key: "aluno", width: 32 },
    { header: "Professor", key: "professor", width: 32 },
    { header: "Data da aula", key: "data", width: 15 },
    { header: "Hora", key: "hora", width: 10 },
    { header: "Duração", key: "duracao", width: 10 },
    { header: "Valor da Aula", key: "valor_aula", width: 15 },
    { header: "Modalidade", key: "modalidade", width: 15 },
    { header: "Matéria", key: "materia", width: 15 },
    { header: "Finalizada", key: "finalizada", width: 10 },
    { header: "Cancelada", key: "cancelada", width: 10 }
  ];

  aulas.forEach((aula) => {
    worksheet.addRow({
      id: aula.id,
      aluno: aula.aluno.nome,
      professor: aula.professor.nome,
      data: moment(aula.data).format("DD/MM/YYYY"),
      hora: aula.horaInicio,
      duracao: aula.duracao,
      valor_aula: aula.valor_aula.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      modalidade: aula.modalidade,
      materia: aula.materia,
      finalizada: aula.finalizada ? "Sim" : "Não",
      cancelada: aula.cancelada ? "Sim" : "Não"
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "tabela_financeiro.xlsx";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
