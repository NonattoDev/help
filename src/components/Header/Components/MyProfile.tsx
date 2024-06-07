import Link from "next/link";
import { BiUserCircle } from "react-icons/bi";

export default async function MyProfileButton({ id }: { id: string }) {
  return (
    <Link className="btn" href={`/help/config/${id}/meuperfil`}>
      <BiUserCircle />
    </Link>
  );
}
