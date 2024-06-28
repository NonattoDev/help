import { Aluno, Feedbacks, Professor } from "@prisma/client";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const generatePDF = (feedback: Feedbacks & { aluno: Aluno; professor: Professor }) => {
  const pdf = new jsPDF();

  // Add custom font
  pdf.setFont("helvetica");

  // Add a title with styling
  pdf.setFontSize(20);
  pdf.setTextColor(40, 40, 40);
  pdf.text("Feedback do Aluno", 10, 10);

  pdf.setFontSize(12);
  pdf.setTextColor(60, 60, 60);

  // Add a line under the title
  pdf.setDrawColor(0, 0, 0);
  pdf.setLineWidth(0.5);
  pdf.line(10, 15, 200, 15);

  // Add student and professor information
  pdf.text(`Nome do Aluno: ${feedback.aluno.nome}`, 10, 25);
  pdf.text(`Nome do Professor: ${feedback.professor.nome}`, 10, 35);
  pdf.text(`ID do Feedback: ${feedback.id}`, 10, 45);

  // Create a table for the performance metrics
  (pdf as any).autoTable({
    startY: 75,
    head: [["Métrica", "Avaliação"]],
    body: [
      ["Autonomia", feedback.autonomia],
      ["Concentração", feedback.concentracao],
      ["Interpretação", feedback.interpretacao],
    ],
    theme: "grid",
    headStyles: { fillColor: [22, 160, 133] },
    alternateRowStyles: { fillColor: [238, 238, 238] },
  });

  // Add comments and suggestions with a box around
  let finalY = (pdf as any).lastAutoTable.finalY;

  pdf.setFontSize(12);
  pdf.setTextColor(40, 40, 40);
  pdf.text("Desenvolvimento:", 10, finalY + 10);
  pdf.setFontSize(10);
  pdf.setTextColor(80, 80, 80);
  pdf.rect(10, finalY + 15, 190, 20); // Adding a border for the textbox
  pdf.text(feedback.desenvolvimento, 12, finalY + 25, { maxWidth: 186 });

  finalY += 40; // Adjust the finalY position after adding the desenvolvimento box

  pdf.setFontSize(12);
  pdf.setTextColor(40, 40, 40);
  pdf.text("Comentários:", 10, finalY + 10);
  pdf.setFontSize(10);
  pdf.setTextColor(80, 80, 80);
  pdf.rect(10, finalY + 15, 190, 20); // Adding a border for the textbox
  pdf.text(feedback.comentarios, 12, finalY + 25, { maxWidth: 186 });

  finalY += 40;

  pdf.setFontSize(12);
  pdf.setTextColor(40, 40, 40);
  pdf.text("Materiais Sugeridos:", 10, finalY + 10);
  pdf.setFontSize(10);
  pdf.setTextColor(80, 80, 80);
  pdf.rect(10, finalY + 15, 190, 20); // Adding a border for the textbox
  pdf.text(feedback.materiaisSugeridos, 12, finalY + 25, { maxWidth: 186 });

  finalY += 40;

  pdf.setFontSize(12);
  pdf.setTextColor(40, 40, 40);
  pdf.text("Próximos Passos:", 10, finalY + 10);
  pdf.setFontSize(10);
  pdf.setTextColor(80, 80, 80);
  pdf.rect(10, finalY + 15, 190, 20); // Adding a border for the textbox
  pdf.text(feedback.proximosPassos, 12, finalY + 25, { maxWidth: 186 });

  finalY += 40;

  // Add the creation and update dates
  pdf.setFontSize(10);
  pdf.setTextColor(40, 40, 40);
  pdf.text(`Criado em: ${feedback.createdAt.toLocaleDateString()}`, 10, finalY + 10);
  pdf.text(`Atualizado em: ${feedback.updatedAt.toLocaleDateString()}`, 10, finalY + 20);

  pdf.save(`${feedback.aluno.nome}.pdf`);
};
