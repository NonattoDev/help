import LancarPagamentos from "./LancarPagamentos";
import Link from "next/link";
import { RiSecurePaymentFill } from "react-icons/ri";

export default function LancarPagamentosAlunos() {
  return (
    <div>
      <button className="btn tooltip" data-tip="Ver pagamentos lançados">
        <Link href="/help/admin/financeiro/lancamentos/pagamentos/realizados">
          <RiSecurePaymentFill />
        </Link>
      </button>
      <LancarPagamentos />
    </div>
  );
}
