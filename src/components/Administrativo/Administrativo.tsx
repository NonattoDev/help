import Link from "next/link";
import { Suspense } from "react";

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
        <div tabIndex={0} className="m-1 btn">
          Administrativo
        </div>
        <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
          <li>
            <Link href="/help/admin/pedagogico/requisicoes/materiais">Materiais</Link>
          </li>
        </ul>
      </div>
    </Suspense>
  );
}
