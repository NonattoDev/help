"use client";
import { MateriaisRequisitados } from "@prisma/client";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ConcluiRequisicao } from "./actions/ConcluiRequisicao";
import moment from "moment";

export default function CardRequisicoes({ material }: { material: MateriaisRequisitados }) {
  const [materialData, setMaterialData] = useState<MateriaisRequisitados>(material);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session?.user?.accessLevel === "administrador" || session?.user?.accessLevel === "administrativo") {
        setIsAdmin(true);
      }
    })();
  }, []);

  const handleFinalizar = async () => {
    const concluiRequisicao = await ConcluiRequisicao(material.id);

    if (!concluiRequisicao.success) {
      toast.error(concluiRequisicao.message);
      return;
    }

    if (concluiRequisicao.data) {
      setMaterialData(concluiRequisicao.data);
      toast.success("Requisição concluída com sucesso!");
    }
  };

  return (
    <div className="card bg-primary text-secondary-content w-96">
      <div className="card-body">
        <span className="badge bard-primary justify-end">{moment(materialData.prazo).format("DD/MM/YYYY")}</span>
        <h2 className="card-title">{materialData.titulo}</h2>
        <p>{materialData.material}</p>
        <div className="card-actions justify-end">
          <button className={`btn ${isAdmin ? "" : "cursor-not-allowed"}`} onClick={isAdmin ? handleFinalizar : undefined}>
            {materialData.status}
          </button>
        </div>
      </div>
    </div>
  );
}
