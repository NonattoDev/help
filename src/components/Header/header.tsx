import MatchButton from "../Buttons/MatchButton";
import { LogoButton } from "@/components/Buttons/LogoButton";
import { LogoutButton } from "@/components/Buttons/LogoutButton";
import { ManutencaoButton } from "@/components/Dropdown/Manutencao";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import MyProfileButton from "@/components/Buttons/MyProfileButton";
import prisma from "@/utils/prismaInstance";
import { Professor } from "@prisma/client";
import { Suspense } from "react";
import AgendaDropdown from "../Agenda/Agenda";
import FinanceiroButton from "../Buttons/FinanceiroButton";
import { AdministrativoButton } from "../Administrativo/Administrativo";
import ConfigButton from "../Buttons/ConfigButton";

function LoadingFallback() {
  return <div className="p-4 skeleton"></div>;
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

  await prisma.$disconnect();

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
    <div className="flex justify-between navbar bg-base-100 shadow-md my-4 mx-auto w-[97%]">
      {/* Inicio Header */}
      <div className="w-1/4 justify-start">
        <LogoButton userName={session?.user.nome} />
      </div>

      {/* Meio do Header*/}
      <div className="w-1/4 justify-center">
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <MatchButton />}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
          <Suspense fallback={<LoadingFallback />}>
            <ManutencaoButton professores={professores} alunos={alunos} />
          </Suspense>
        )}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <AgendaDropdown />}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <FinanceiroButton />}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <AdministrativoButton />}
      </div>

      {/* Fim Header */}
      <div className="w-1/4 flex justify-end gap-1">
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <ConfigButton />}
        <MyProfileButton id={session?.user?.id} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
