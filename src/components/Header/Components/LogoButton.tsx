import packageJson from "../../../../package.json";

export async function LogoButton({ userName }: { userName: string }) {
  return (
    <div className="flex flex-col items-start">
      <a className="btn btn-ghost text-xl">Lara Help</a>
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
