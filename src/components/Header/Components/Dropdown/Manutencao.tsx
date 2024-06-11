import { Suspense } from "react";
import { Professor } from "@prisma/client";
import { PiStudentFill } from "react-icons/pi";
import ProfessorModalButton from "./Modal";

function LoadingFallback() {
  return (
    <button className="btn skeleton">
      <div className="spinner"></div>
    </button>
  );
}

export function ManutencaoButton({ professores }: { professores: Professor[] | undefined | null }) {
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
            <a>
              <PiStudentFill /> Aluno
            </a>
          </li>
        </ul>
      </div>
    </Suspense>
  );
}
