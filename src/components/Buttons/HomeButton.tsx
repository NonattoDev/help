import Link from "next/link";
import { FaHouseChimney } from "react-icons/fa6";

export default function HomeButton() {
  return (
    <button className="btn btn-circle bg-cyan-400">
      <Link href="/">
        <FaHouseChimney fontSize={18} color="white" />
      </Link>
    </button>
  );
}
