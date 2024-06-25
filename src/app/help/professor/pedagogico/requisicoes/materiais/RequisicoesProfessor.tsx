import { MateriaisRequisitados } from "@prisma/client";
import CardRequisicoes from "./CardRequisicoes";

export default function RequisicoesProfessor({ MateriaisRequisitados }: { MateriaisRequisitados: MateriaisRequisitados[] }) {
  return (
    <div>
      <h1 className="text-center text-1xl font-semibold">Suas Requisições</h1>
      <div>
        {MateriaisRequisitados.map((material) => (
          <CardRequisicoes key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
}
