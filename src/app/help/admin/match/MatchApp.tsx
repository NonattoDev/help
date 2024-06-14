// O app do matcher é responsável por gerenciar as configurações de match entre os professores e alunos, gerenciando também a agenda de ambos para que não haja conflitos. O app é composto por 3 páginas: a primeira é a página de configuração de match, onde o administrador pode definir as regras de match, como por exemplo, a quantidade de alunos que um professor pode atender, a quantidade de professores que um aluno pode ter, entre outras. A segunda página é a página de match, onde o administrador pode visualizar os matchs que foram feitos e a terceira página é a página de agenda, onde o administrador pode visualizar a agenda dos professores e alunos e verificar se há algum conflito de horário.

"use client";
import { Aluno } from "@prisma/client";
import SelectAluno from "./components/SelectAluno";
import { useState } from "react";
import { toast } from "react-toastify";

interface MatchAppProps {
  alunos: Aluno[];
}

export default function MatchApp({ alunos }: MatchAppProps) {
  const [IdAluno, setIdAluno] = useState<string>("");

  function handleSelectAluno(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    setIdAluno(value);
    toast.success(`Aluno selecionado: ${value}`);
  }

  return (
    <div>
      <SelectAluno alunos={alunos} handleSelectAluno={handleSelectAluno} />
    </div>
  );
}
