"use client";

import React from "react";
import { Series } from "@prisma/client";
import ReactInputMask from "react-input-mask";
import { Materia } from "@/interfaces/professor.interface";
import moment from "moment";

interface Props {
  alunoData: any;
  series: Series[];
  materias: Materia[];
  accessLevel: string;
  handleChange: any;
  handleCheckboxChange: any;
  handleMateriasChange: any;
  handleFetchCep: any;
  handleCurrencyChange: any;
  setConfirmPassword: any;
  showConfirmPassword: any;
  confirmPassword: any;
  handleToggleChange: any;
}

const DadosPessoaisForm: React.FC<Props> = ({
  alunoData,
  series,
  materias,
  accessLevel,
  handleChange,
  handleCheckboxChange,
  handleMateriasChange,
  handleToggleChange,
  handleFetchCep,
  handleCurrencyChange,
  setConfirmPassword,
  showConfirmPassword,
  confirmPassword,
}) => {
  return (
    <form>
      <div>
        <div className="w-24 mr-5">
          {accessLevel?.startsWith("admin") && (
            <label className="cursor-pointer label gap-2">
              <input type="checkbox" name="ativo" checked={alunoData.ativo} onChange={handleToggleChange} className="toggle toggle-info" />
              <span className="label-text">{alunoData.ativo ? "Ativo" : "Desativado"}</span>
            </label>
          )}
        </div>
        <h2 className="text-md text-center font-bold mt-5 mb-5">Dados Pessoais</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nome</span>
          </label>
          <input type="text" name="nome" value={alunoData.nome} onChange={handleChange} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={alunoData.email}
            onChange={handleChange}
            className="input input-bordered"
            required
            autoComplete="email"
            disabled={accessLevel !== "administrador" && accessLevel !== "administrativo"}
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Data de Nascimento</span>
          </label>
          <input type="date" name="data_nascimento" value={moment(alunoData.data_nascimento).format("YYYY-MM-DD")} onChange={handleChange} className="input input-bordered" required />
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
            value={alunoData.telefone}
            onChange={handleChange}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Senha</span>
          </label>
          <input type="password" name="password" value={alunoData.password} onChange={handleChange} className="input input-bordered" required />
        </div>
        {showConfirmPassword && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirme a senha</span>
            </label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input input-bordered" required />
          </div>
        )}
      </div>

      <h2 className="text-md text-center font-bold mt-5 mb-5">Dados Escolares</h2>
      <div className="grid grid-cols-4 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Escola</span>
          </label>
          <input type="text" name="escola" value={alunoData.escola} onChange={handleChange} className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Ano Escolar</span>
          </label>
          <select className="input input-bordered" name="ano_escolar" onChange={handleChange} value={alunoData.ano_escolar}>
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
            <ReactInputMask
              mask={"99999999"}
              alwaysShowMask={false}
              maskPlaceholder={null}
              onBlur={(e) => handleFetchCep(e.target.value)}
              type="text"
              name="endereco.cep"
              value={alunoData.endereco.cep}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Rua</span>
            </label>
            <input type="text" name="endereco.rua" value={alunoData.endereco.rua} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Número</span>
            </label>
            <input type="text" name="endereco.numero" value={alunoData.endereco.numero} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Complemento</span>
            </label>
            <input type="text" name="endereco.complemento" value={alunoData.endereco.complemento} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Bairro</span>
            </label>
            <input type="text" name="endereco.bairro" value={alunoData.endereco.bairro} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Cidade</span>
            </label>
            <input type="text" name="endereco.cidade" value={alunoData.endereco.cidade} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Estado</span>
            </label>
            <input type="text" name="endereco.estado" value={alunoData.endereco.estado} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Referência</span>
            </label>
            <input type="text" name="endereco.referencia" value={alunoData.endereco.referencia} onChange={handleChange} className="input input-bordered w-full" required />
          </div>
        </div>
      </div>

      <div id="ficha" className="mt-8">
        <h2 className="text-md text-center font-bold mb-5">Ficha do Aluno</h2>
        <div id="textArea" className="flex justify-center w-full">
          <textarea className="textarea textarea-info w-3/4 h-44" placeholder="Digite aqui a ficha do aluno" name="ficha" value={alunoData.ficha} onChange={handleChange}></textarea>
        </div>
      </div>

      <div className="form-control mt-8">
        <h2 className="text-md text-center font-bold mb-5">Modalidade</h2>
        <label className="flex items-center cursor-pointer w-fit">
          <span className="text-md mr-2">Online</span>
          <input type="checkbox" name="online" checked={alunoData.modalidade.online} onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
        </label>
        <label className="flex items-center cursor-pointer w-fit">
          <span className="text-md mr-2">Presencial</span>
          <input type="checkbox" name="presencial" checked={alunoData.modalidade.presencial} onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
        </label>
      </div>

      <div id="materias" className="mt-8">
        <h2 className="text-md text-center font-bold mb-5">Quais matérias esse aluno deseja aprimorar ?</h2>
        <div className="grid grid-cols-4 gap-4">
          {materias.map((materia) => (
            <label key={materia.id} className="flex items-center cursor-pointer">
              <input type="checkbox" name={`dificuldades`} checked={alunoData.dificuldades.includes(materia.materia)} onChange={() => handleMateriasChange(materia.materia)} className="checkbox" />
              <span className="label-text ml-2">{materia.materia}</span>
            </label>
          ))}
        </div>
      </div>

      <div id="divFinanceiro">
        <h2 className="text-md text-center font-bold mt-8 mb-5">Financeiro</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Quantidade de aulas mensais</span>
            </label>
            <input
              type="number"
              name="financeiro.qtd_aulas"
              value={alunoData?.financeiro?.qtd_aulas}
              onChange={handleChange}
              className="input input-bordered w-fit"
              required
              max={moment().daysInMonth()}
              disabled={accessLevel !== "administrador" && accessLevel !== "administrativo"}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Valor</span>
            </label>
            <input
              type="text"
              name="financeiro.valor"
              value={alunoData.financeiro.valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
              onChange={handleCurrencyChange}
              className="input input-bordered w-fit"
              required
              disabled={accessLevel !== "administrador" && accessLevel !== "administrativo"}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Selecione uma data de vencimento</span>
            </label>
            <ReactInputMask
              mask="99"
              maskPlaceholder={null}
              alwaysShowMask={false}
              type="text"
              name="financeiro.dia_vencimento"
              value={alunoData.financeiro.dia_vencimento}
              onChange={handleChange}
              className="input input-bordered w-fit"
              required
              disabled={accessLevel !== "administrador" && accessLevel !== "administrativo"}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default DadosPessoaisForm;
