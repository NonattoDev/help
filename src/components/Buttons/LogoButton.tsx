import Link from "next/link";
import packageJson from "../../../package.json";

export async function LogoButton({ userName }: { userName: string }) {
  return (
    <div className="flex flex-col items-start">
      <Link href="/" className="btn btn-ghost text-xl">
        Lara Help
      </Link>
      <span
        className="text-sm"
        style={{
          marginLeft: "18px",
          fontSize: "11px",
        }}
      >
        {packageJson.version}
      </span>
      <p className="text-sm">Seja bem-vindo {userName}</p>
    </div>
  );
}
