"use client";

import { Professor } from "@prisma/client";
import useSWR from "swr";
import { GetProfessores } from "../actions/GetProfessores";

interface SelectProfessoresAgendaProps {
  HandleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectProfessores({ HandleSelectChange }: SelectProfessoresAgendaProps) {
  const { data, error } = useSWR("professores", GetProfessores);

  if (!data) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar os dados.</div>;

  const professores: Professor[] = data.data;

  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="text text-1xl font-semibold mb-2 text-center">Selecione um professor</h2>
      <select className="input input-bordered w-1/4" name="professores" id="professores" onChange={HandleSelectChange} defaultValue="">
        <option value="" disabled>
          Selecione uma opção
        </option>
        <option value="">Todos os professores</option>
        {professores.map((professor) => (
          <option key={professor.id} value={professor.id}>
            {professor.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
