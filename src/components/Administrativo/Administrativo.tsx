import Link from "next/link";
import { Suspense } from "react";
import { VscFeedback } from "react-icons/vsc";
import { FaRegFolderOpen } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { SiCivicrm } from "react-icons/si";

function LoadingFallback() {
  return (
    <button className="btn skeleton">
      <div className="spinner"></div>
    </button>
  );
}

export function AdministrativoButton() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="dropdown dropdown-hover">
        <div tabIndex={0} className="btn">
          Administrativo
        </div>
        <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <Link href="/help/admin/pedagogico/requisicoes/materiais">
              <FaRegFolderOpen />
              Materiais
            </Link>
          </li>
          <li>
            <Link href="/help/admin/gestao/cadastro/metas">
              <GoGoal />
              Metas
            </Link>
          </li>
          <li>
            <Link href="/help/admin/gestao/CRM">
              <SiCivicrm />
              CRM
            </Link>
          </li>
          <li>
            <Link href="/help/admin/pedagogico/feedbacks">
              <VscFeedback />
              Feedbacks
            </Link>
          </li>
        </ul>
      </div>
    </Suspense>
  );
}
