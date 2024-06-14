import moment from "moment";
import prisma from "../../../../prisma/prismaInstance";

export async function getDados(data: any) {
  const alunos = await prisma.aluno.findMany({
    where: {
      ativo: true,
    },
  });

  return alunos.length;
}

export default async function CardAlunosAlert() {
  const alunosAtivos = getDados(moment().startOf("day").toDate());

  return (
    <div className="stats shadow text-primary-content bg-slate-300">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title text-zinc-900">Total de alunos ativos</div>
        <div className="stat-value text-primary">{alunosAtivos}</div>
        <div className="stat-desc text-zinc-900">21% more than last month</div>
      </div>
    </div>
  );
}
