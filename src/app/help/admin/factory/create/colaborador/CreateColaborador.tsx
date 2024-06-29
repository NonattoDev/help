"use client";

import { Cargos, NiveisAcesso, Usuarios, FinanceiroUsuarios } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import { GetSelects } from "./actions/GetSelects";
import { toast } from "react-toastify";
import ReactInputMask from "react-input-mask";
import { CreateNewColaborador } from "./actions/CreateNewColaborador";

export default function CreateColaborador() {
  const [colaborador, setColaborador] = useState<Usuarios>({
    nome: "",
    cpf: "",
    email: "",
    data_nascimento: new Date(),
    accessLevel: "",
    cargo: "",
    telefone: "",
    password: "",
  } as Usuarios);

  const [financeiro, setFinanceiro] = useState<FinanceiroUsuarios>({
    valor: 0,
    diaPagamento: "",
  } as FinanceiroUsuarios);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [cargos, setCargos] = useState<Cargos[]>([]);
  const [niveisAcesso, setNiveisAcesso] = useState<NiveisAcesso[]>([]);
  const [selectLoading, setSelectselectLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColaborador((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFinanceiroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinanceiro((prev) => ({
      ...prev,
      [name]: name === "valor" ? parseFloat(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColaborador((prev) => ({
      ...prev,
      data_nascimento: moment(e.target.value).toDate(),
    }));
  };

  const getSelects = async () => {
    if (cargos.length > 0 && niveisAcesso.length > 0) {
      return;
    }
    setSelectselectLoading(true);
    const data = await GetSelects();

    if (data.success) {
      setCargos(data.cargos);
      setNiveisAcesso(data.niveisAcesso);
      setSelectselectLoading(false);
    } else {
      setSelectselectLoading(false);
      toast.error("Erro ao buscar cargos");
    }
  };

  const handleSelectCargo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColaborador((prev) => ({
      ...prev,
      cargo: e.target.value,
    }));
  };

  const handleSelectAccessLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColaborador((prev) => ({
      ...prev,
      accessLevel: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const usuarioCriar = {
      ...colaborador,
      financeiro,
    };

    const criarUsuario = await CreateNewColaborador(usuarioCriar);

    if (criarUsuario.success) {
      toast.success(criarUsuario.message);
    } else {
      toast.error(criarUsuario.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="block text-gray-700 text-2xl text-center font-bold">Dados Pessoais</h2>
      <div className="grid grid-cols-4 gap-4 mb-2">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
          <input type="text" name="nome" className="input input-md input-bordered w-full" value={colaborador.nome} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">CPF</label>
          <ReactInputMask
            mask="999.999.999-99"
            alwaysShowMask={false}
            maskPlaceholder={null}
            type="text"
            className="input input-md input-bordered w-full"
            name="cpf"
            value={colaborador.cpf}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input type="email" name="email" className="input input-md input-bordered w-full" value={colaborador.email} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Data de Nascimento</label>
          <input type="date" name="data_nascimento" className="input input-md input-bordered w-full" value={moment(colaborador.data_nascimento).format("YYYY-MM-DD")} onChange={handleDateChange} />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Nível de Acesso</label>
          <select
            className={`select select-md select-bordered w-full ${selectLoading ? "skeleton" : ""}`}
            name="accessLevel"
            value={colaborador.accessLevel}
            onChange={handleSelectAccessLevel}
            onFocus={getSelects}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {niveisAcesso?.map((acesso) => (
              <option key={acesso.id} value={acesso.accessLevel}>
                {acesso.accessLevel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Cargo</label>
          <select name="cargo" className={`select select-md select-bordered w-full ${selectLoading ? "skeleton" : ""}`} value={colaborador.cargo} onChange={handleSelectCargo} onFocus={getSelects}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            {cargos?.map((cargo) => (
              <option key={cargo.id} value={cargo.cargo}>
                {cargo.cargo}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Telefone</label>
          <ReactInputMask
            mask="(99) 99999-9999"
            alwaysShowMask={false}
            maskPlaceholder={null}
            type="text"
            name="telefone"
            className="input input-md input-bordered w-full"
            value={colaborador.telefone}
            onChange={handleChange}
          />
        </div>
      </div>

      <h2 className="block text-gray-700 text-2xl text-center font-bold">Credenciais</h2>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Senha</label>
          <input type="password" name="password" className="input input-md input-bordered w-full" value={colaborador.password} onChange={handleChange} />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Confirme a senha</label>
          <input type="password" className="input input-md input-bordered w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
      </div>

      <h2 className="block text-gray-700 text-2xl text-center font-bold my-4">Dados Financeiros</h2>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Remuneração</label>
          <input type="text" name="valor" className="input input-md input-bordered w-full" value={financeiro.valor} onChange={handleFinanceiroChange} />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Dia de pagamento</label>
          <input type="text" name="diaPagamento" className="input input-md input-bordered w-full" value={financeiro.diaPagamento} onChange={handleFinanceiroChange} />
        </div>
      </div>

      <div className="flex justify-center">
        <button className="btn w-fit btn-primary" onClick={handleSubmit}>
          Criar colaborador
        </button>
      </div>
    </div>
  );
}
