"use client";

import { Professor } from "@/interfaces/professor.interface";

interface SelectProfessorProps {
  professores: Professor[];
}

export default function SelectProfessor({ professores }: SelectProfessorProps) {
  console.log(professores);
  return (
    <div>
      <h1> SelectProfessor </h1>
    </div>
  );
}
