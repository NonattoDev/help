"use client";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import { Administrador } from "@/interfaces/admin.interface";
import ReactInputMask from "react-input-mask";
import { validateCPF } from "@/utils/validateCpf";

export default function EditAdmin({ userData }: { userData: Administrador }) {
  const [formData, setFormData] = React.useState<Administrador>(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errorCount = 0;

    if (!validateCPF(formData.cpf)) errorCount++;

    if (errorCount > 0) return;
    try {
      const response = await axios.put(`/help/config/${formData.id}/meuperfil/editar`, {
        formData,
        senhaAntiga: formData.password,
        typeEdit: "admin",
      });
      if (response.status === 200) {
        toast.success("Dados atualizados com sucesso");
      } else {
        toast.error("Erro ao atualizar dados");
      }
    } catch (error) {
      toast.error("Erro no servidor");
    }
  };

  return (
    <div>
      <form onSubmit={submitEdit}>
        <h2 className="text-md text-center font-bold mb-5 mt-4">Dados do Administrador</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">CPF</span>
            </label>
            <ReactInputMask
              mask={"999.999.999-99"}
              maskPlaceholder={null}
              alwaysShowMask={false}
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Telefone</span>
            </label>
            <ReactInputMask
              mask="(99) 99999-9999"
              alwaysShowMask={false}
              maskPlaceholder={null}
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cargo</span>
            </label>
            <input disabled={formData.cargo !== "CEO"} type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="input input-bordered" required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-5 w-full">
          Salvar
        </button>
      </form>
    </div>
  );
}
