import Link from "next/link";
import { TbCirclesRelation } from "react-icons/tb";

export default async function MatchButton() {
  return (
    <Link href="/help/admin/match" className="btn">
      <TbCirclesRelation />
      Match
    </Link>
  );
}
