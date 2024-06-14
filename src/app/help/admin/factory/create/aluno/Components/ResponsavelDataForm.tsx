import React from "react";

interface ResponsavelDataFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ResponsavelDataForm: React.FC<ResponsavelDataFormProps> = ({ formData, handleChange }) => (
  <div>
    <h2 className="text-md text-center font-bold mt-5 mb-5">Dados do Responsável</h2>
    <div className="grid grid-cols-4 gap-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Nome do Responsável</span>
        </label>
        <input type="text" name="responsavel.nome" value={formData.nome} onChange={handleChange} className="input input-bordered" required />
      </div>
    </div>
  </div>
);

export default ResponsavelDataForm;
