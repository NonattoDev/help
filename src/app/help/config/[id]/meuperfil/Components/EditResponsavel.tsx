"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Responsavel from "../../../../../../interfaces/Responsavel";

export default function EditResponsavel({ responsavel }: { responsavel: Responsavel }) {
  const [formData, setFormData] = useState<Responsavel>(responsavel);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const enderecoKey = name.split(".")[1];
      setFormData({
        ...formData,
        endereco: {
          ...formData.endereco,
          [enderecoKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.put(`/help/config/${formData.id}/meuperfil/editar`, {
      formData,
      senhaAntiga: responsavel.password,
      typeEdit: "responsavel",
    });

    if (response.status !== 200) {
      toast.error("Erro ao salvar");
      return;
    }

    toast.success("Salvo com sucesso");
  };

  const handleFetchCep = async (cep: string) => {
    if (cep.length !== 8) return;

    cep = cep.replace(/\D/g, "");

    const response = await axios(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.status !== 200) {
      toast.info("CEP não encontrado");
      return;
    }

    setFormData({
      ...formData,
      endereco: {
        ...formData.endereco,
        rua: response.data.logradouro,
        bairro: response.data.bairro,
        cidade: response.data.localidade,
        estado: response.data.uf,
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-md text-center font-bold mb-5">Dados Pessoais</h2>
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
              <span className="label-text">Telefone</span>
            </label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input input-bordered" required />
          </div>
        </div>

        <div id="enderecoDiv" className="mt-8">
          <h2 className="text-md text-center font-bold mb-5">Endereço</h2>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="label">
                <span className="label-text">CEP</span>
              </label>
              <input
                onBlur={(e) => handleFetchCep(e.target.value)}
                type="text"
                name="endereco.cep"
                value={formData.endereco.cep}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Rua</span>
              </label>
              <input type="text" name="endereco.rua" value={formData.endereco.rua} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Número</span>
              </label>
              <input type="text" name="endereco.numero" value={formData.endereco.numero} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Complemento</span>
              </label>
              <input type="text" name="endereco.complemento" value={formData.endereco.complemento} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Bairro</span>
              </label>
              <input type="text" name="endereco.bairro" value={formData.endereco.bairro} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Cidade</span>
              </label>
              <input type="text" name="endereco.cidade" value={formData.endereco.cidade} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Estado</span>
              </label>
              <input type="text" name="endereco.estado" value={formData.endereco.estado} onChange={handleChange} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Referência</span>
              </label>
              <input type="text" name="endereco.referencia" value={formData.endereco.referencia} onChange={handleChange} className="input input-bordered w-full" required />
            </div>
          </div>
        </div>

        <div id="alunosPorResponsavelDiv">
          <h2 className="text-md text-center font-bold mt-8 mb-5">Dados de alunos</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Telefone</th>
                  <th>Ativo</th>
                </tr>
              </thead>
              <tbody>
                {formData.alunos?.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>{aluno.id}</td>
                    <td>{aluno.nome}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.telefone}</td>
                    <td>{aluno.ativo ? "Ativo" : "Desativado"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
