// O app do matcher é responsável por gerenciar as configurações de match entre os professores e alunos, gerenciando também a agenda de ambos para que não haja conflitos. O app é composto por 3 páginas: a primeira é a página de configuração de match, onde o administrador pode definir as regras de match, como por exemplo, a quantidade de alunos que um professor pode atender, a quantidade de professores que um aluno pode ter, entre outras. A segunda página é a página de match, onde o administrador pode visualizar os matchs que foram feitos e a terceira página é a página de agenda, onde o administrador pode visualizar a agenda dos professores e alunos e verificar se há algum conflito de horário.

// Dominio do conteúdo e série
// Disponíbilidade de horário
// Já estar próximo da região do aluno

"use client";
import { Aluno } from "@prisma/client";
import SelectAluno from "./SelectAluno";
import { useState } from "react";
import { toast } from "react-toastify";
import ShowProfessores from "./ShowProfessores";
import { Professor } from "@/interfaces/professor.interface";
import { getProfessores } from "./Actions/GetProfessores";

interface MatchAppProps {
  alunos: Aluno[];
}

enum Page {
  SELECTALUNO,
  SHOWPROFESSORES,
  MATCH,
}

export default function MatchApp({ alunos }: MatchAppProps) {
  const [page, setPage] = useState<Page>(Page.SELECTALUNO);
  const [alunoSelected, setAlunoSelected] = useState<Aluno>();
  const [professores, setProfessores] = useState<Professor[]>();

  async function handleSelectAluno(e: React.ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    // Filtra o aluno selecionado
    const alunoFiltered = alunos.find((aluno) => aluno.id === value);
    // Se o aluno não for encontrado, exibe um erro
    if (!alunoFiltered) {
      toast.error("Aluno não encontrado");
      return;
    }
    // Define o aluno selecionado
    setAlunoSelected(alunoFiltered);
    // Busca os professores de acordo com o aluno selecionado
    const professores = await getProfessores(alunoFiltered as Aluno);
    // Se não houver professores, exibe um erro
    if (!professores || professores.length === 0) return toast.error("Não foi possível buscar os professores");
    // Define os professores
    setProfessores(professores);
    // Exibe uma mensagem de sucesso
    toast.success(`Aluno selecionado: ${alunoFiltered.nome}`);
    //  Define a página como AGENDA
    setPage(Page.SHOWPROFESSORES);
  }

  return (
    <div>
      {page === Page.SELECTALUNO && <SelectAluno alunos={alunos} handleSelectAluno={handleSelectAluno} />}
      {page === Page.SHOWPROFESSORES && <ShowProfessores aluno={alunoSelected as Aluno} professores={professores!} />}
    </div>
  );
}
