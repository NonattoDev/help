import MatchButton from "./Components/MatchButton";
import { LogoButton } from "./Components/LogoButton";
import { LogoutButton } from "./Components/LogoutButton";
import { ManutencaoButton } from "./Components/Dropdown/Manutencao";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import MyProfileButton from "./Components/MyProfile";
import prisma from "../../../prisma/prismaInstance";
import { Aluno, Professor } from "@prisma/client";
import { Suspense } from "react";

export const revalidate = 10;

function LoadingFallback() {
  return (
    <div className="p-4">
      <p>Carregando...</p>
    </div>
  );
}

const getData = async () => {
  const professoresFromDB = await prisma.professor.findMany();

  const alunos = await prisma.aluno.findMany();

  const professores: Professor[] = professoresFromDB.map((professor) => ({
    ...professor,
    endereco: professor.endereco as Professor["endereco"],
    areaFormacao: professor.areaFormacao as Professor["areaFormacao"],
    disponibilidade: professor.disponibilidade as Professor["disponibilidade"],
  }));

  prisma.$disconnect();

  return { alunos, professores };
};

const Header = async () => {
  const session = await getServerSession(authOptions);
  let professores: any;
  let alunos: any;

  if (!session) return null;

  if (session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") {
    const data = await getData();
    professores = data.professores;
    alunos = data.alunos;
  }

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
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
          <Suspense fallback={<LoadingFallback />}>
            <ManutencaoButton professores={professores} alunos={alunos} />
          </Suspense>
        )}
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
