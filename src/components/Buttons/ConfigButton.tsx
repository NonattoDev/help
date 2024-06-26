import Link from "next/link";
import { FaGear } from "react-icons/fa6";

export default async function ConfigButton() {
  return (
    <Link href="/help/admin/config" className="btn">
      <FaGear fontSize={18} />
    </Link>
  );
}
