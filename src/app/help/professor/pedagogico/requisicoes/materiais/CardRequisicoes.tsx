import { MateriaisRequisitados } from "@prisma/client";

export default function CardRequisicoes({ material }: { material: MateriaisRequisitados }) {
  return (
    <div className="card bg-primary text-secondary-content w-96">
      <div className="card-body">
        <h2 className="card-title">{material.titulo}</h2>
        <p>{material.material}</p>
        <div className="card-actions justify-end">
          <button className="btn">{material.status}</button>
        </div>
      </div>
    </div>
  );
}
