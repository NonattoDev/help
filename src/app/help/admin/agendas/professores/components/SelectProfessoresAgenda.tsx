"use client";

import { Professor } from "@prisma/client";

interface SelectProfessoresAgendaProps {
  professores: Professor[];
  HandleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectProfessoresAgenda({ professores, HandleSelectChange }: SelectProfessoresAgendaProps) {
  return (
    <>
      <h2 className="text text-1xl font-semibold mb-2">Selecione um professor</h2>
      <select className="input input-bordered" name="professores" id="professores" onChange={HandleSelectChange} defaultValue="">
        <option value="" disabled>
          Selecione uma opção
        </option>
        <option value="all">Todos os professores</option>
        {professores.map((professor) => (
          <option key={professor.id} value={professor.id}>
            {professor.nome}
          </option>
        ))}
      </select>
    </>
  );
}
