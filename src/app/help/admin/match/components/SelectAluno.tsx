import { Aluno } from "@prisma/client";

interface SelectAlunoProps {
  alunos: Aluno[];
  handleSelectAluno: any;
  alunoSelected: Aluno | undefined;
}

export default function SelectAluno({ alunos, handleSelectAluno, alunoSelected }: SelectAlunoProps) {
  return (
    <div className="flex flex-col justify-center align-middle items-center">
      <h2 className="text-center font-bold text-1xl">Selecione um aluno para fazer o match</h2>

      <select className="select input-bordered w-2/12" name="alunosSelect" id="selectAlunos" onChange={handleSelectAluno} value={alunoSelected?.id ? alunoSelected.id : ""}>
        <option disabled value="">
          Selecione
        </option>
        {alunos.map((aluno) => (
          <option key={aluno.id} value={aluno.id}>
            {aluno.nome}
          </option>
        ))}
      </select>
    </div>
  );
}
