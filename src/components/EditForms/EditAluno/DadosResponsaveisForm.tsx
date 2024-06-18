"use client";

import React from "react";
import ReactInputMask from "react-input-mask";
import Responsavel from "@/interfaces/responsavel.interface";

interface Props {
  responsavelData: Responsavel;
  accessLevel: string;
  handleResponsavelChange: any;
  handleFetchCep: any;
  setResponsavelConfirmPassword: any;
  showResponsavelConfirmPassword: any;
  confirmResponsavelPassword: any;
}

const DadosResponsaveisForm: React.FC<Props> = ({
  responsavelData,
  accessLevel,
  handleResponsavelChange,
  handleFetchCep,
  setResponsavelConfirmPassword,
  showResponsavelConfirmPassword,
  confirmResponsavelPassword,
}) => {
  return (
    <form>
      <h2 className="text-md text-center font-bold mt-5 mb-5">Dados Responsáveis</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nome</span>
          </label>
          <input type="text" name="nome" value={responsavelData?.nome} onChange={handleResponsavelChange} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={responsavelData?.email}
            onChange={handleResponsavelChange}
            className="input input-bordered"
            required
            disabled={accessLevel !== "administrador" && accessLevel !== "administrativo"}
          />
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
            value={responsavelData.cpf}
            onChange={handleResponsavelChange}
            className="input input-bordered"
            disabled={accessLevel !== "administrador" && accessLevel !== "administrativo"}
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
            value={responsavelData?.telefone}
            onChange={handleResponsavelChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Senha</span>
          </label>
          <input type="password" name="password" value={responsavelData?.password} onChange={handleResponsavelChange} className="input input-bordered" required />
        </div>
        {showResponsavelConfirmPassword && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirme a senha</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmResponsavelPassword}
              onChange={(e) => setResponsavelConfirmPassword(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
        )}
      </div>

      <div id="enderecoDiv" className="mt-8">
        <h2 className="text-md text-center font-bold mb-5">Endereço</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="label">
              <span className="label-text">CEP</span>
            </label>
            <ReactInputMask
              mask={"99999999"}
              alwaysShowMask={false}
              maskPlaceholder={null}
              onBlur={(e) => handleFetchCep(e.target.value)}
              type="text"
              name="endereco.cep"
              value={responsavelData.endereco.cep}
              onChange={handleResponsavelChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Rua</span>
            </label>
            <input type="text" name="endereco.rua" value={responsavelData?.endereco.rua} onChange={handleResponsavelChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Número</span>
            </label>
            <input type="text" name="endereco.numero" value={responsavelData?.endereco.numero} onChange={handleResponsavelChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Complemento</span>
            </label>
            <input type="text" name="endereco.complemento" value={responsavelData?.endereco.complemento} onChange={handleResponsavelChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Bairro</span>
            </label>
            <input type="text" name="endereco.bairro" value={responsavelData?.endereco.bairro} onChange={handleResponsavelChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Cidade</span>
            </label>
            <input type="text" name="endereco.cidade" value={responsavelData?.endereco.cidade} onChange={handleResponsavelChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Estado</span>
            </label>
            <input type="text" name="endereco.estado" value={responsavelData?.endereco.estado} onChange={handleResponsavelChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Referência</span>
            </label>
            <input type="text" name="endereco.referencia" value={responsavelData?.endereco.referencia} onChange={handleResponsavelChange} className="input input-bordered w-full" required />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DadosResponsaveisForm;
