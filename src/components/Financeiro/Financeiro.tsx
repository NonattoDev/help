import Link from "next/link";
import { LuKanbanSquareDashed } from "react-icons/lu";
import { PiContactlessPaymentFill } from "react-icons/pi";

export default function FinanceiroDropdown() {
  return (
    <div className="dropdown dropdown-hover">
      <div tabIndex={0} className="btn">
        Financeiro
      </div>
      <ul tabIndex={0} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <Link href="/help/admin/financeiro">
            <LuKanbanSquareDashed />
            Analítico Professores
          </Link>
        </li>
        <li>
          <Link href="/help/admin/financeiro/lancamentos/pagamentos">
            <PiContactlessPaymentFill />
            Lançar Pagamentos
          </Link>
        </li>
      </ul>
    </div>
  );
}
