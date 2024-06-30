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
  try {
    const professoresFromDB = await prisma.professor.findMany();

    const alunos = await prisma.aluno.findMany();

    const professores: Professor[] = professoresFromDB.map((professor) => ({
      ...professor,
      endereco: professor.endereco as Professor["endereco"],
      areaFormacao: professor.areaFormacao as Professor["areaFormacao"],
      disponibilidade: professor.disponibilidade as Professor["disponibilidade"],
    }));

    const colaboradores = await prisma.usuarios.findMany();

    return { alunos, professores, colaboradores };
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

const Header = async () => {
  const session = await getServerSession(authOptions);
  let professores: any;
  let alunos: any;
  let colaboradores: any;

  if (!session) return null;

  if (session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") {
    const data = await getData();
    professores = data?.professores;
    alunos = data?.alunos;
    colaboradores = data?.colaboradores;
  }

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="flex justify-between items-center navbar bg-base-100 shadow-md my-4 mx-auto w-[97%]">
          {/* Inicio Header */}
          <div className="flex-shrink-0">
            <LogoButton userName={session?.user.nome} />
          </div>

          {/* Meio do Header */}
          <div className="hidden lg:flex flex-grow justify-center gap-2">
            <HomeButton />
            {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <MatchButton />}
            {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
              <ManutencaoButton professores={professores} alunos={alunos} colaboradores={colaboradores} />
            )}
            {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <AgendaDropdown />}
            {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <FinanceiroDropdown />}
            {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <AdministrativoButton />}
            {session?.user.accessLevel === "professor" && <MateriaisButton />}
            {session?.user.accessLevel === "professor" && <FeedbackButton />}
          </div>

          {/* Fim Header */}
          <div className="hidden lg:flex flex-shrink-0 justify-end gap-1">
            {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && <ConfigButton />}
            <MyProfileButton id={session?.user?.id} />
            <LogoutButton />
          </div>

          <div className="flex lg:hidden">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </label>
          </div>
        </div>
      </div>

      <div className="drawer-side ">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 min-h-full bg-base-100 text-base-content">
          {/* Menu Items */}
          <div className="flex justify-center my-2">
            <li className="justify-center">
              <HomeButton />
            </li>
          </div>
          <div className="divider divider-secondary"></div>

          {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
            <li>
              <MatchButton />
            </li>
          )}
          {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
            <li>
              <ManutencaoButton professores={professores} alunos={alunos} colaboradores={colaboradores} />
            </li>
          )}
          {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
            <li>
              <AgendaDropdown />
            </li>
          )}
          {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
            <li>
              <FinanceiroDropdown />
            </li>
          )}
          {(session?.user.accessLevel === "administrador" || session?.user.accessLevel === "administrativo") && (
            <li>
              <AdministrativoButton />
            </li>
          )}
          {session?.user.accessLevel === "professor" && (
            <li>
              <MateriaisButton />
            </li>
          )}
          {session?.user.accessLevel === "professor" && (
            <li>
              <FeedbackButton />
            </li>
          )}

          <div className="divider divider-secondary">Ações</div>

          <li className="mt-1">
            <ConfigButton />
          </li>
          <li className="mt-1">
            <MyProfileButton id={session?.user?.id} />
          </li>
          <li className="mt-1">
            <LogoutButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
