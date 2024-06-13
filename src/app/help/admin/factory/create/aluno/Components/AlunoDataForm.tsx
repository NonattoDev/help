// AlunoDataForm.tsx
import React from "react";
import ReactInputMask from "react-input-mask";
import { Series } from "@prisma/client";
import { Materia } from "@/app/help/config/[id]/meuperfil/Components/Interfaces/Professor";

interface AlunoDataFormProps {
  formData: any;
  series: Series[];
  materias: Materia[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFetchCep: (cep: string) => void;
  handleMateriasChange: (id: string) => void;
}

const AlunoDataForm: React.FC<AlunoDataFormProps> = ({ formData, series, materias, handleChange, handleCheckboxChange, handleFetchCep, handleMateriasChange }) => (
  <div>
    <h2 className="text-md text-center font-bold mt-5 mb-5">Dados Pessoais</h2>
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
          <span className="label-text">Senha</span>
        </label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} className="input input-bordered" required />
      </div>
      <div className="form-control mt-4">
        <label className="label">Qual sua série atual ?</label>
        <select className="input input-bordered" name="ano_escolar" onChange={handleChange}>
          {series.map((item) => (
            <option key={item.id} value={item.serie}>
              {item.serie}
            </option>
          ))}
        </select>
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

    <div className="form-control mt-8">
      <h2 className="text-md text-center font-bold mb-5">Modalidade</h2>
      <label className="flex items-center cursor-pointer w-fit">
        <span className="text-md mr-2">Online</span>
        <input type="checkbox" name="online" checked={formData.modalidade.online} onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
      </label>
      <label className="flex items-center cursor-pointer w-fit">
        <span className="text-md mr-2">Presencial</span>
        <input type="checkbox" name="presencial" checked={formData.modalidade.presencial} onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
      </label>
    </div>

    <div id="materias" className="mt-8">
      <h2 className="text-md text-center font-bold mb-5">Quais matérias você deseja aprimorar ?</h2>
      <div className="grid grid-cols-4 gap-4 ">
        {materias.map((materia) => (
          <label key={materia.id} className="flex items-center cursor-pointer">
            <input type="checkbox" name={`dificuldades`} checked={formData.dificuldades.includes(materia.id)} onChange={() => handleMateriasChange(materia.id)} className="checkbox" />
            <span className="label-text ml-2">{materia.materia}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default AlunoDataForm;
