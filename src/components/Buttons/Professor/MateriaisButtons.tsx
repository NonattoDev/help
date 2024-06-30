import Link from "next/link";
import { FaRegFolderOpen } from "react-icons/fa6";

export default function MateriaisButton() {
  return (
    <button className="btn">
      <Link href="/help/professor/pedagogico/requisicoes/materiais">
      <FaRegFolderOpen/>
      Materiais</Link>
    </button>
  );
}
