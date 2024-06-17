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
import { ProfessoresMatch, getProfessores } from "./Actions/GetProfessores";
import AgendaMatch from "./AgendaMatch";

interface MatchAppProps {
  alunos: Aluno[];
}

enum Page {
  SELECTALUNO,
  SHOWPROFESSORES,
  AGENDAMATCH,
}

export default function MatchApp({ alunos }: MatchAppProps) {
  const [page, setPage] = useState<Page>(Page.SELECTALUNO);
  const [professores, setProfessores] = useState<ProfessoresMatch[]>();
  const [alunoSelected, setAlunoSelected] = useState<Aluno>();
  const [professorSelected, setProfessorSelected] = useState<ProfessoresMatch>();

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
    const professores = await getProfessores(alunoFiltered as any);
    // Se não houver professores, exibe um erro
    if (!professores || professores.length === 0) return toast.error("Não foram encontrados professores que correspondam ao aluno selecionado.");
    // Define os professores
    setProfessores(professores);
    // Exibe uma mensagem de sucesso
    toast.success(`Aluno selecionado: ${alunoFiltered.nome}`);
    //  Define a página como AGENDAMATCH
    setPage(Page.SHOWPROFESSORES);
  }

  const selectProfessor = (professor: ProfessoresMatch) => {
    // Define o professor selecionado
    setProfessorSelected(professor);
    setPage(Page.AGENDAMATCH);
  };

  return (
    <div>
      {page === Page.SELECTALUNO && <SelectAluno alunos={alunos} handleSelectAluno={handleSelectAluno} />}
      {page === Page.SHOWPROFESSORES && <ShowProfessores aluno={alunoSelected as Aluno} professores={professores!} selectProfessor={selectProfessor} />}
      {page === Page.AGENDAMATCH && <AgendaMatch professor={professorSelected!} aluno={alunoSelected!} />}
    </div>
  );
}
