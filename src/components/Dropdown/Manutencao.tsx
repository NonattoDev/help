import { Suspense } from "react";
import ProfessorModalButton from "./ProfessorModal";
import AlunoModalButton from "./AlunosModal";
import Aluno from "@/interfaces/aluno.interface";
import { Professor } from "@prisma/client";

function LoadingFallback() {
  return (
    <button className="btn skeleton">
      <div className="spinner"></div>
    </button>
  );
}

export function ManutencaoButton({ professores, alunos }: { professores: Professor[] | undefined | null; alunos: Aluno[] | undefined | null }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className="m-1 btn">
          Manutenção
        </div>
        <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <ProfessorModalButton professores={professores} />
          </li>
          <li>
            <AlunoModalButton alunos={alunos} />
          </li>
        </ul>
      </div>
    </Suspense>
  );
}
