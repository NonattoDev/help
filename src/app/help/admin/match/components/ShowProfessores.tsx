"use client";

import { Aluno } from "@prisma/client";
import { Professor } from "@/interfaces/professor.interface";
import { useState } from "react";
import CardProfessor from "./CardProfessor";

interface ShowProfessores {
  professores: Professor[];
  aluno: Aluno;
}

export default function ShowProfessores({ professores, aluno }: ShowProfessores) {
  console.log(professores, aluno);
  // Aqui será implementado a lógica de agenda
  // Já que temos os professores que correspondem as materias e série do aluno, podemos fazer o usuário escolher uma data e horário, após isso mostrar quais professores estão disponíveis naquele horário e data.
  // O usuário poderá escolher um professor e então será feito o match.

  return (
    <>
      <h2 className="text-center text-2xl font-semibold"> Professores que correspondem ao aluno </h2>
      <div className="grid grid-cols-4 gap-8">
        {professores.map((professor) => (
          <div key={professor.id}>
            <CardProfessor professor={professor} />
          </div>
        ))}
      </div>
    </>
  );
}