"use client";

import { Aluno } from "@prisma/client";
import CardProfessor from "./CardProfessor";
import { ProfessoresMatch } from "./Actions/GetProfessores";

interface ShowProfessores {
  professores: ProfessoresMatch[];
  aluno: Aluno;
  selectProfessor: any;
}

export default function ShowProfessores({ professores, aluno, selectProfessor }: ShowProfessores) {
  // Ordenar os professores pela distância em km (do menor para o maior)
  const sortedProfessores = [...professores].sort((a, b) => a.distanciaEmKm - b.distanciaEmKm);

  return (
    <>
      <h2 className="text-center text-2xl font-semibold my-8"> Professores que correspondem ao aluno </h2>
      <div className="flex justify-around">
        <div className="grid grid-cols-4 gap-8">
          {sortedProfessores.map((professor) => (
            <div key={professor.id}>
              <CardProfessor aluno={aluno} professor={professor} selectProfessor={selectProfessor} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
