import { Professor } from "@prisma/client";
import { PiStudentFill } from "react-icons/pi";
import ProfessorModalButton from "./Modal";

export function ManutencaoButton({ professores }: { professores: Professor[] | undefined | null }) {
  return (
    <>
      <details className="dropdown">
        <summary className="m-1 btn">Manutenção</summary>
        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <ProfessorModalButton professores={professores} />
          </li>
          <li>
            <a>
              <PiStudentFill /> Aluno
            </a>
          </li>
        </ul>
      </details>
    </>
  );
}
