import MatchButton from "../Buttons/MatchButton";
import { LogoButton } from "@/components/Buttons/LogoButton";
import { LogoutButton } from "@/components/Buttons/LogoutButton";
import { ManutencaoButton } from "@/components/Dropdown/Manutencao";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import MyProfileButton from "@/components/Buttons/MyProfileButton";
import prisma from "@/utils/prismaInstance";
import { Professor } from "@prisma/client";
import AgendaDropdown from "../Agenda/Agenda";
import { AdministrativoButton } from "../Administrativo/Administrativo";
import ConfigButton from "../Buttons/ConfigButton";
import MateriaisButton from "../Buttons/Professor/MateriaisButtons";
import HomeButton from "../Buttons/HomeButton";
import FinanceiroDropdown from "../Financeiro/Financeiro";
import FeedbackButton from "../Buttons/Professor/FeedbackButton";

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

  const colaboradores = await prisma.usuarios.findMany();

  await prisma.$disconnect();

  return { alunos, professores, colaboradores };
};

const Header = async () => {
  const session = await getServerSession(authOptions);
  let professores: any;
  let alunos: any;
  let colaboradores: any;

  if (!session) return null;

  if (session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") {
    const data = await getData();
    professores = data.professores;
    alunos = data.alunos;
    colaboradores = data.colaboradores;
  }

  return (
    <div className="flex justify-between navbar bg-base-100 shadow-md my-4 mx-auto w-[97%]">
      {/* Inicio Header */}
      <div className="w-1/4 justify-start">
        <LogoButton userName={session?.user.nome} />
      </div>

      {/* Meio do Header*/}
      <div className="w-1/4 justify-center gap-2">
        <HomeButton />
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <MatchButton />}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
          <ManutencaoButton professores={professores} alunos={alunos} colaboradores={colaboradores} />
        )}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <AgendaDropdown />}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <FinanceiroDropdown />}
        {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <AdministrativoButton />}
        {/* // Professor */}
        {session?.user.accessLevel === "professor" && <MateriaisButton />}
        {session?.user.accessLevel === "professor" && <FeedbackButton />}
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
