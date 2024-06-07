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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered" required />
        </div>{" "}
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Endereço</span>
          </label>
          <input type="text" name="endereco.rua" value={formData.endereco.rua} onChange={handleChange} className="input input-bordered" required />
          <input type="text" name="endereco.numero" value={formData.endereco.numero} onChange={handleChange} className="input input-bordered" required />
          <input type="text" name="endereco.bairro" value={formData.endereco.bairro} onChange={handleChange} className="input input-bordered" required />
          <input type="text" name="endereco.cidade" value={formData.endereco.cidade} onChange={handleChange} className="input input-bordered" required />
          <input type="text" name="endereco.estado" value={formData.endereco.estado} onChange={handleChange} className="input input-bordered" required />
          <input type="text" name="endereco.cep" value={formData.endereco.cep} onChange={handleChange} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Área de Formação</span>
          </label>
          {formData.areaFormacao.map((area, index) => (
            <div key={index} className="space-y-2">
              <input type="text" name={`areaFormacao[${index}].area`} value={area.area} onChange={handleChange} className="input input-bordered" required />
              <input type="text" name={`areaFormacao[${index}].semestre`} value={area.semestre} onChange={handleChange} className="input input-bordered" required />
              <label className="label cursor-pointer">
                <span className="label-text">Finalizado</span>
                <input
                  type="checkbox"
                  name={`areaFormacao[${index}].finalizado`}
                  checked={area.finalizado}
                  onChange={() => {
                    const newAreaFormacao = [...formData.areaFormacao];
                    newAreaFormacao[index].finalizado = !area.finalizado;
                    setFormData({ ...formData, areaFormacao: newAreaFormacao });
                  }}
                  className="checkbox"
                />
              </label>
            </div>
          ))}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Modalidade</span>
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Online</span>
            <input
              type="checkbox"
              name="modalidade.online"
              checked={formData.modalidade.online}
              onChange={() => {
                setFormData({ ...formData, modalidade: { ...formData.modalidade, online: !formData.modalidade.online } });
              }}
              className="checkbox"
            />
          </label>
          <label className="label cursor-pointer">
            <span className="label-text">Presencial</span>
            <input
              type="checkbox"
              name="modalidade.presencial"
              checked={formData.modalidade.presencial}
              onChange={() => {
                setFormData({ ...formData, modalidade: { ...formData.modalidade, presencial: !formData.modalidade.presencial } });
              }}
              className="checkbox"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Disponibilidade</span>
          </label>
          {["segunda", "terca", "quarta", "quinta", "sexta"].map((dia) => (
            <div key={dia} className="space-y-2">
              <label className="label cursor-pointer">
                <span className="label-text">{dia.charAt(0).toUpperCase() + dia.slice(1)}</span>
                {["manha", "tarde", "noite"].map((turno) => (
                  <label key={turno} className="label cursor-pointer">
                    <span className="label-text">{turno.charAt(0).toUpperCase() + turno.slice(1)}</span>
                    <input
                      type="checkbox"
                      name={`disponibilidade.${dia}.${turno}`}
                      checked={formData.disponibilidade[dia][turno]}
                      onChange={() => {
                        setFormData({
                          ...formData,
                          disponibilidade: {
                            ...formData.disponibilidade,
                            [dia]: {
                              ...formData.disponibilidade[dia],
                              [turno]: !formData.disponibilidade[dia][turno],
                            },
                          },
                        });
                      }}
                      className="checkbox"
                    />
                  </label>
                ))}
              </label>
            </div>
          ))}
        </div>
        <div className="form-control">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
