"use client";

import { Aluno } from "@prisma/client";

interface SelectAlunosAgendaProps {
  alunos: Aluno[];
  HandleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectAlunosAgenda({ alunos, HandleSelectChange }: SelectAlunosAgendaProps) {
  return (
    <>
      <h2 className="text text-1xl font-semibold mb-2">Selecione um aluno</h2>
      <select className="input input-bordered" name="professores" id="professores" onChange={HandleSelectChange} defaultValue="">
        <option value="" disabled>
          Selecione uma opção
        </option>
        <option value="all">Todos os Alunos</option>
        {alunos.map((aluno) => (
          <option key={aluno.id} value={aluno.id}>
            {aluno.nome}
          </option>
        ))}
      </select>
    </>
  );
}
