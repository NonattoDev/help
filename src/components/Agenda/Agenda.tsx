import Link from "next/link";

export default function AgendaDropdown() {
  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} className="btn">
        Agendas
      </div>
      <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <Link href="/help/admin/agendas/professores">Professores</Link>
        </li>
        <li>
          <Link href="/help/admin/agendas/alunos">Alunos</Link>
        </li>
      </ul>
    </div>
  );
}
