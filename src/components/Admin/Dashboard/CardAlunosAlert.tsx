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
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Alunos
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>Atualmente existem {alunosAtivos} alunos ativos</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
}
