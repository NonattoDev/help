import { Suspense } from "react";
import ProfessorModalButton from "./ProfessorModal";
import AlunoModalButton from "./AlunosModal";
import Aluno from "@/interfaces/aluno.interface";
import { Professor, Usuarios } from "@prisma/client";
import ColaboradoresModalButton from "./ColaboradoresModal";

function LoadingFallback() {
  return (
    <button className="btn skeleton">
      <div className="spinner"></div>
    </button>
  );
}

export function ManutencaoButton({ professores, alunos, colaboradores }: { professores: Professor[] | undefined | null; alunos: Aluno[] | undefined | null; colaboradores: Usuarios[] }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className="btn">
          Manutenção
        </div>
        <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <ProfessorModalButton professores={professores} />
          </li>
          <li>
            <AlunoModalButton alunos={alunos} />
          </li>
          <li>
            <ColaboradoresModalButton colaboradores={colaboradores} />
          </li>
        </ul>
      </div>
    </Suspense>
  );
}
