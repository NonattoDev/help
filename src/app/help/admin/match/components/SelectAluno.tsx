import { Aluno } from "@prisma/client";

interface SelectAlunoProps {
  alunos: Aluno[];
  handleSelectAluno: any;
}

export default function SelectAluno({ alunos, handleSelectAluno }: SelectAlunoProps) {
  return (
    <div>
      <select className="select input-bordered" name="alunosSelect" id="selectAlunos" onChange={handleSelectAluno} value={""}>
        <option disabled value="">
          Selecione um aluno para fazer o match
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
