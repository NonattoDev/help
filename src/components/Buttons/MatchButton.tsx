import Link from "next/link";

export default async function MatchButton() {
  return (
    <Link href="/help/admin/match" className="btn">
      Match
    </Link>
  );
}
