"use client";

import Modal from "@/components/Modal/Modal";
import { GetStudentsWithOldFeedbacks } from "@/server/actions/GetStudentsWithOldFeedbacks";
import { NewFeedback } from "@/server/actions/NewFeedback";
import { Aluno, Feedbacks } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";

export default function FeedbackButton() {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([] as Aluno[]);
  const [selectedStudent, setSelectedStudent] = useState<Aluno>();
  const [feedbackData, setFeedbackData] = useState<Feedbacks>({
    id: "",
    alunoId: "",
    professorId: "",
    autonomia: "3",
    concentracao: "3",
    engajamentoAulas: "3",
    interpretacao: "",
    desenvolvimento: "",
    comentarios: "",
    materiaisSugeridos: "",
    proximosPassos: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleOpenModal = async () => {
    const response = await GetStudentsWithOldFeedbacks();
    setStudents(response?.studentsWithOldFeedbacks || []);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(undefined);
    setFeedbackData({
      id: "",
      alunoId: "",
      professorId: "",
      autonomia: "3",
      concentracao: "3",
      engajamentoAulas: "3",
      interpretacao: "Regular",
      desenvolvimento: "",
      comentarios: "",
      materiaisSugeridos: "",
      proximosPassos: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFeedbackData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    let countError = 0;

    if (!feedbackData.alunoId) {
      toast.error("Selecione um aluno");
      countError++;
    }

    if (!feedbackData.interpretacao) {
      toast.error("Selecione uma opção para a habilidade de interpretar e responder o que está sendo pedido no enunciado");
      countError++;
    }

    if (!feedbackData.desenvolvimento) {
      toast.error("Descreva as percepções sobre o desenvolvimento do aluno durante o período de aula");
      countError++;
    }

    if (!feedbackData.comentarios) {
      toast.error("Faça um breve comentário sobre o(a) aluno(a), citando pontos fortes e pontos a serem melhorados");
      countError++;
    }

    if (!feedbackData.materiaisSugeridos) {
      toast.error("Quais materiais você sugere que sejam utilizados para facilitar a interação e aprendizagem nas aulas?");
      countError++;
    }

    if (!feedbackData.proximosPassos) {
      toast.error("Quais os pontos necessários a serem ajustados e trabalhados nas próximas aulas? Descreva-os com detalhes");
      countError++;
    }

    if (countError > 0) return;

    const newFeedback = await NewFeedback(feedbackData);

    if (newFeedback?.success) {
      toast.success(newFeedback.message);
      setFeedbackData({
        id: "",
        alunoId: "",
        professorId: "",
        autonomia: "3",
        concentracao: "3",
        engajamentoAulas: "3",
        interpretacao: "Regular",
        desenvolvimento: "",
        comentarios: "",
        materiaisSugeridos: "",
        proximosPassos: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setShowModal(false);
      return;
    } else {
      toast.error(newFeedback.message);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentFilter = students.find((student) => student.id === e.target.value);

    if (!studentFilter) return;

    setSelectedStudent(studentFilter);
    setFeedbackData((prevState) => ({ ...prevState, alunoId: e.target.value }));
  };

  return (
    <>
      <button className="btn" onClick={handleOpenModal}>
        Feedback
      </button>
      <Modal onClose={handleCloseModal} show={showModal}>
        <h1 className="text-center font-semibold my-2">Modal de feedback</h1>
        <div className="flex flex-col items-center">
          <select name="students" className="select select-bordered select-primary w-[60%] text-center" value={selectedStudent?.id} onChange={handleSelectChange}>
            {students.length > 0 ? (
              <>
                <option value="">Selecione um aluno</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.nome}
                  </option>
                ))}
              </>
            ) : (
              <option disabled value="">
                Não há alunos com feedbacks antigos
              </option>
            )}
          </select>

          {selectedStudent && (
            <div className="w-full max-w-lg mt-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  value={selectedStudent?.email}
                  disabled
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomeAluno">
                  Nome do(a) aluno(a)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nomeAluno"
                  name="nomeAluno"
                  type="text"
                  value={selectedStudent?.nome}
                  onChange={handleInputChange}
                  disabled
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ano_escolar">
                  Série escolar (ex: 6 série)
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="ano_escolar"
                  name="ano_escolar"
                  type="text"
                  value={selectedStudent?.ano_escolar}
                  disabled
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Como você qualifica o grau de autonomia nos estudos?</label>
                <div className="flex justify-between">
                  <label>
                    <input type="radio" name="autonomia" value="1" checked={feedbackData.autonomia === "1"} onChange={handleRadioChange} required /> Pouca autonomia
                  </label>
                  <label>
                    <input type="radio" name="autonomia" value="2" checked={feedbackData.autonomia === "2"} onChange={handleRadioChange} /> 2
                  </label>
                  <label>
                    <input type="radio" name="autonomia" value="3" checked={feedbackData.autonomia === "3"} onChange={handleRadioChange} /> 3
                  </label>
                  <label>
                    <input type="radio" name="autonomia" value="4" checked={feedbackData.autonomia === "4"} onChange={handleRadioChange} /> 4
                  </label>
                  <label>
                    <input type="radio" name="autonomia" value="5" checked={feedbackData.autonomia === "5"} onChange={handleRadioChange} /> Muita autonomia
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Qual grau de concentração na aula?</label>
                <div className="flex justify-between">
                  <label>
                    <input type="radio" name="concentracao" value="1" checked={feedbackData.concentracao === "1"} onChange={handleRadioChange} required /> Pouca concentração
                  </label>
                  <label>
                    <input type="radio" name="concentracao" value="2" checked={feedbackData.concentracao === "2"} onChange={handleRadioChange} /> 2
                  </label>
                  <label>
                    <input type="radio" name="concentracao" value="3" checked={feedbackData.concentracao === "3"} onChange={handleRadioChange} /> 3
                  </label>
                  <label>
                    <input type="radio" name="concentracao" value="4" checked={feedbackData.concentracao === "4"} onChange={handleRadioChange} /> 4
                  </label>
                  <label>
                    <input type="radio" name="concentracao" value="5" checked={feedbackData.concentracao === "5"} onChange={handleRadioChange} /> Muita concentração
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"> Como foi o engajamento nas aula ? </label>
                <div className="flex justify-between">
                  <label>
                    <input type="radio" name="engajamentoAulas" value="1" checked={feedbackData.engajamentoAulas === "1"} onChange={handleRadioChange} required /> Pouca concentração
                  </label>
                  <label>
                    <input type="radio" name="engajamentoAulas" value="2" checked={feedbackData.engajamentoAulas === "2"} onChange={handleRadioChange} /> 2
                  </label>
                  <label>
                    <input type="radio" name="engajamentoAulas" value="3" checked={feedbackData.engajamentoAulas === "3"} onChange={handleRadioChange} /> 3
                  </label>
                  <label>
                    <input type="radio" name="engajamentoAulas" value="4" checked={feedbackData.engajamentoAulas === "4"} onChange={handleRadioChange} /> 4
                  </label>
                  <label>
                    <input type="radio" name="engajamentoAulas" value="5" checked={feedbackData.engajamentoAulas === "5"} onChange={handleRadioChange} /> Muita concentração
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Como você qualifica a habilidade de interpretar e responder o que está sendo pedido no enunciado?</label>
                <div className="flex justify-between">
                  <label>
                    <input type="radio" name="interpretacao" value="Excelente" checked={feedbackData.interpretacao === "Excelente"} onChange={handleRadioChange} required /> Excelente
                  </label>
                  <label>
                    <input type="radio" name="interpretacao" value="Regular" checked={feedbackData.interpretacao === "Regular"} onChange={handleRadioChange} /> Regular
                  </label>
                  <label>
                    <input type="radio" name="interpretacao" value="Ruim" checked={feedbackData.interpretacao === "Ruim"} onChange={handleRadioChange} /> Ruim
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="desenvolvimento">
                  Descreva aqui, com detalhes, as percepções sobre o desenvolvimento do aluno durante o período de aula. É possível verificar melhores resultados? Quais dificuldades se mantêm
                  recorrentes?
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="desenvolvimento"
                  name="desenvolvimento"
                  value={feedbackData.desenvolvimento}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comentarios">
                  Faça um breve comentário sobre o(a) aluno(a), citando pontos fortes e pontos a serem melhorados.
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="comentarios"
                  name="comentarios"
                  value={feedbackData.comentarios}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="materiaisSugeridos">
                  Quais materiais você sugere que sejam utilizados para facilitar a interação e aprendizagem nas aulas?
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="materiaisSugeridos"
                  name="materiaisSugeridos"
                  value={feedbackData.materiaisSugeridos}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="proximosPassos">
                  Quais os pontos necessários a serem ajustados e trabalhados nas próximas aulas? Descreva-os com detalhes.
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="proximosPassos"
                  name="proximosPassos"
                  value={feedbackData.proximosPassos}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Enviar Feedback
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
