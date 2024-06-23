import { AgendaAulas, Aluno, Professor } from "@prisma/client";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import moment from "moment";

interface Aula extends AgendaAulas {
  aluno: Aluno;
  professor: Professor;
}

export const exportPDF = (aulas: Aula[]) => {
  const doc = new jsPDF({
    orientation: "landscape",
  });
  (doc as any).autoTable({
    head: [["ID", "Aluno", "Professor", "Data da aula", "Hora", "Duração", "Valor da Aula", "Modalidade", "Matéria", "Finalizada", "Cancelada"]],
    body: aulas.map((aula) => [
      aula.id,
      aula.aluno.nome,
      aula.professor.nome,
      moment(aula.data).format("DD/MM/YYYY"),
      aula.horaInicio,
      aula.duracao,
      aula.valor_aula.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      aula.modalidade,
      aula.materia,
      aula.finalizada ? "Sim" : "Não",
      aula.cancelada ? "Sim" : "Não",
    ]),
  });
  doc.save("tabela_financeiro.pdf");
};
