import Link from "next/link";
import packageJson from "../../../package.json";
import Image from "next/image";
import helpLogo from "../../../public/help.svg";

export async function LogoButton({ userName }: { userName: string }) {
  return (
    <div className="flex flex-col items-start ml-2">
      <Link href="/" className="mx-auto">
        <Image src={helpLogo} alt="Help!" width={40} height={40} />
      </Link>
      <span className="text-[10px] font-semibold mx-auto">{packageJson.version}</span>
      <p className="text-sm">Seja bem-vindo {userName}</p>
    </div>
  );
}
