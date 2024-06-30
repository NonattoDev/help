"use client";

import { Valores } from "@prisma/client";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";
import { UpdateValores } from "./actions/UpdateValores";

export default function EditValores({ valores }: { valores: Valores[] }) {
  const [valoresData, setValoresData] = useState<Valores[]>(valores);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    setEditMode(false);

    const editValor = await UpdateValores(valoresData);

    if (!editValor.success) return toast.error(editValor.message);

    toast.success(editValor.message);
  };

  const handleValueChange = (id: string, newValue: number) => {
    setValoresData((prev) => prev.map((valor) => (valor.id === id ? { ...valor, valor: newValue } : valor)));
  };

  return (
    <div className="relative p-4">
      <h2 className="text-1xl font-bold mb-4 text-center">Configurações de valores do sistema</h2>
      <div className="overflow-x-auto shadow-md">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {valoresData.map((valor) => (
              <tr key={valor.id}>
                <td>{valor.nome}</td>
                <td>
                  {editMode ? (
                    <input type="number" value={valor.valor} onChange={(e) => handleValueChange(valor.id, parseFloat(e.target.value))} className="input input-bordered input-sm max-w-14" />
                  ) : (
                    valor.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleEditClick} className="btn btn-circle btn-primary fixed bottom-4 right-4">
        {editMode ? "X" : "✏️"}
      </button>
      {editMode && (
        <button onClick={handleSave} className="btn btn-circle btn-success fixed bottom-4 right-[4.25rem]">
          <FaSave color="white" />
        </button>
      )}
    </div>
  );
}
