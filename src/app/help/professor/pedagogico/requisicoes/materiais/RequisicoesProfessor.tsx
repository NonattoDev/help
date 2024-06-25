import { MateriaisRequisitados } from "@prisma/client";
import CardRequisicoes from "./CardRequisicoes";

export default function RequisicoesProfessor({ MateriaisRequisitados }: { MateriaisRequisitados: MateriaisRequisitados[] }) {
  return (
    <div>
      <div>
        {MateriaisRequisitados.map((material) => (
          <CardRequisicoes key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
}
