"use client";
import React from "react";
import { Professor } from "@prisma/client";

export function EditProfessor({ professor }: any) {
  const [formData, setFormData] = React.useState<Professor>(professor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar os dados do formulário
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={submitEdit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nome</span>
          </label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="input input-bordered" required />
        </div>
      </form>
    </div>
  );
}
