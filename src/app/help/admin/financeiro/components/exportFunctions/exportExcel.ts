import * as XLSX from "xlsx";
import moment from "moment";
import { AgendaAulas, Aluno, Professor } from "@prisma/client";

interface Aula extends AgendaAulas {
  aluno: Aluno;
  professor: Professor;
}

export const exportExcel = (aulas: Aula[]) => {
  const ws = XLSX.utils.json_to_sheet(
    aulas.map((aula) => ({
      ID: aula.id,
      Aluno: aula.aluno.nome,
      Professor: aula.professor.nome,
      "Data da aula": moment(aula.data).format("DD/MM/YYYY"),
      Hora: aula.horaInicio,
      Duração: aula.duracao,
      "Valor da Aula": aula.valor_aula.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      Modalidade: aula.modalidade,
      Matéria: aula.materia,
      Finalizada: aula.finalizada ? "Sim" : "Não",
      Cancelada: aula.cancelada ? "Sim" : "Não",
    }))
  );
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "TabelaFinanceiro");
  XLSX.writeFile(wb, "tabela_financeiro.xlsx");
};
