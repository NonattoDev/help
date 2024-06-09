import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Admin {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: {
    rua?: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

export function EditAdmin({ admin }: { admin: Admin }) {
  const [formData, setFormData] = useState<Admin>(admin);

  function setNestedValue(obj: any, path: string, value: any) {
    const keys = path.split(".");
    const lastKey = keys.pop() as string;
    const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
    lastKey && (lastObj[lastKey] = value);
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const newFormData = { ...prev };
      setNestedValue(newFormData, name, checked);
      return newFormData;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/help/config/${formData.id}/meuperfil/editar`, formData);
      if (response.status === 200) {
        toast.success("Dados atualizados com sucesso");
      } else {
        toast.error("Erro ao atualizar dados");
      }
    } catch (error) {
      toast.error("Erro no servidor");
    }
  };

  const fetchCep = async (e: React.FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cep = value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      endereco: {
        ...prev.endereco,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
      },
    }));
  };

  return (
    <div>
      <form onSubmit={submitEdit}>
        <h2 className="text-md text-center font-bold mb-5">Dados do Administrador</h2>
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
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Telefone</span>
            </label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="input input-bordered" required />
          </div>
        </div>

        <div id="enderecoDiv" className="mt-8">
          <h2 className="text-md text-center font-bold mb-5">Endereço</h2>
          <div className="grid grid-cols-4 gap-4">
            <input type="text" name="endereco.cep" value={formData?.endereco?.cep} onChange={handleChange} className="input input-bordered" required />
            <input type="text" name="endereco.rua" value={formData?.endereco?.rua} onChange={handleChange} className="input input-bordered" required />
            <input type="text" name="endereco.numero" value={formData?.endereco?.numero} onChange={handleChange} className="input input-bordered" required />
            <input type="text" name="endereco.bairro" value={formData?.endereco?.bairro} onChange={handleChange} className="input input-bordered" required />
            <input type="text" name="endereco.cidade" value={formData?.endereco?.cidade} onChange={handleChange} className="input input-bordered" required />
            <input type="text" name="endereco.estado" value={formData?.endereco?.estado} onChange={handleChange} className="input input-bordered" required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-5 w-full">
          Salvar
        </button>
      </form>
    </div>
  );
}
