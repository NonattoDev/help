import Link from "next/link";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";

export default function AgendaDropdown() {
  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} className="btn">
        Agendas
      </div>
      <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <Link href="/help/admin/agendas/professores">
            <GiTeacher /> Professores
          </Link>
        </li>
        <li>
          <Link href="/help/admin/agendas/alunos">
            <PiStudentFill />
            Alunos
          </Link>
        </li>
      </ul>
    </div>
  );
}
