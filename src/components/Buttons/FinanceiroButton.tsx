import Link from "next/link";

export default async function FinanceiroButton() {
  return (
    <Link href="/help/admin/financeiro" className="btn">
      Financeiro
    </Link>
  );
}
