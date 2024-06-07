import MatchButton from "./Components/MatchButton";
import { LogoButton } from "./Components/LogoButton";
import { LogoutButton } from "./Components/LogoutButton";
import { ManutencaoButton } from "./Components/Dropdown/Manutencao";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import MyProfileButton from "./Components/MyProfile";

const Header = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <div
      className="navbar bg-base-100 shadow-md"
      style={{
        width: "98%",
        margin: "10px auto",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* Inicio Header */}
      <div>
        <LogoButton userName={session?.user.nome} />
      </div>

      {/* Meio do Header*/}
      <div>
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <MatchButton />}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <ManutencaoButton />}
      </div>

      {/* Fim Header */}
      <div
        style={{
          gap: "10px",
        }}
      >
        <MyProfileButton id={session?.user?.id} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
