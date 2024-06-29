"use client";

import { Aluno, Feedbacks, Professor } from "@prisma/client";
import Modal from "../Modal/Modal";
import { useState } from "react";
import Image from "next/image";
import pdfSVG from "@/assets/pdf.svg";
import { generatePDF } from "./GeneratePDF";

const getRatingValue = (interpretacao: string) => {
  switch (interpretacao) {
    case "Ruim":
      return 1;
    case "Regular":
      return 2;
    case "Excelente":
      return 3;
    default:
      return 0;
  }
};

export default function FeedbackCard({ feedback }: { feedback: Feedbacks & { aluno: Aluno; professor: Professor } }) {
  const [showModal, setShowModal] = useState(false);
  const ratingValue = getRatingValue(feedback.interpretacao);

  const downloadPDF = () => {
    generatePDF(feedback);
  };

  return (
    <>
      <div className="card glass w-fit relative" key={feedback.id}>
        <div className="card-body cursor-pointer tooltip" data-tip="Clique para mostrar mais informações" onClick={() => setShowModal(true)}>
          <h2 className="card-title justify-center">{feedback.aluno.nome}</h2>
          <p>Professor: {feedback.professor.nome}</p>
          <div id="desempenho" className="flex flex-col items-center">
            <p className="block text-gray-700 text-sm font-bold">Autonomia</p>
            <progress className="progress w-56" value={feedback.autonomia} max="5" />
            <p className="block text-gray-700 text-sm font-bold">Concentração</p>
            <progress className="progress w-56" value={feedback.concentracao} max="5" />
            <p className="block text-gray-700 text-sm font-bold">Interpretação</p>
            <div className="rating rating-sm">
              <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked={ratingValue === 1} readOnly />
              <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked={ratingValue === 2} readOnly />
              <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked={ratingValue === 3} readOnly />
            </div>
          </div>
        </div>
        <button className="btn btn-md absolute w-fit bottom-2 left-2 tooltip" data-tip="Gerar PDF" onClick={downloadPDF}>
          <Image src={pdfSVG} alt="pdfIcon" width={23} height={23} />
        </button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2 className="text-center block text-gray-700 text-lg font-bold ">Feedback do aluno: {feedback.aluno.nome}</h2>
        <p className="block text-gray-700 text-sm font-bold my-4">
          Professor: <span className="badge badge-success text-white">{feedback.professor.nome}</span>
        </p>
        <div className="flex flex-col gap-2 my-4 items-center">
          <p className="block text-gray-700 text-sm font-bold">Comentários:</p>
          <textarea className="textarea textarea-bordered w-full" readOnly value={feedback.comentarios}></textarea>
          <p className="block text-gray-700 text-sm font-bold mt-4">Materiais sugeridos:</p>
          <textarea className="textarea textarea-bordered w-full" readOnly value={feedback.materiaisSugeridos}></textarea>
          <p className="block text-gray-700 text-sm font-bold mt-4">Próximos passos:</p>
          <textarea className="textarea textarea-bordered w-full" readOnly value={feedback.proximosPassos}></textarea>
        </div>
      </Modal>
    </>
  );
}
