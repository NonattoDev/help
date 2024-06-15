// O app do matcher é responsável por gerenciar as configurações de match entre os professores e alunos, gerenciando também a agenda de ambos para que não haja conflitos. O app é composto por 3 páginas: a primeira é a página de configuração de match, onde o administrador pode definir as regras de match, como por exemplo, a quantidade de alunos que um professor pode atender, a quantidade de professores que um aluno pode ter, entre outras. A segunda página é a página de match, onde o administrador pode visualizar os matchs que foram feitos e a terceira página é a página de agenda, onde o administrador pode visualizar a agenda dos professores e alunos e verificar se há algum conflito de horário.

"use client";
import { Aluno } from "@prisma/client";
import SelectAluno from "./SelectAluno";
import { useState } from "react";
import { toast } from "react-toastify";
import SelectProfessor from "./SelectProfessor";

interface MatchAppProps {
  alunos: Aluno[];
}

enum Page {
  SELECTALUNO,
  SELECTPROFESSOR,
  MATCH,
}

export default function MatchApp({ alunos }: MatchAppProps) {
  const [page, setPage] = useState<Page>(Page.SELECTALUNO);

  function handleSelectAluno(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;

    const alunoFiltered: Aluno | undefined = alunos.find((aluno) => aluno.id === value);

    if (!alunoFiltered) return toast.error("Aluno não encontrado");

    toast.success(`Aluno selecionado: ${alunoFiltered.nome}`);
    setPage(Page.SELECTPROFESSOR);
  }

  return (
    <div>
      {page === Page.SELECTALUNO && <SelectAluno alunos={alunos} handleSelectAluno={handleSelectAluno} />}
      {page === Page.SELECTPROFESSOR && <SelectProfessor />}
    </div>
  );
}
