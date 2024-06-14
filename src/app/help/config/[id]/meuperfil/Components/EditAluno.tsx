"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Series } from "@prisma/client";
import ReactInputMask from "react-input-mask";
import { Materia } from "@/Interfaces/Professor";
import { validateCPF } from "@/utils/validateCpf";
import validaResponsavel from "@/utils/ValidaResponsavel";
import moment from "moment";
import Aluno from "@/Interfaces/Aluno";
import Responsavel from "@/Interfaces/Responsavel";
import { redirect } from "next/navigation";

export default function EditAluno({ aluno, series, materias, accessLevel }: { aluno: Aluno; series: Series[]; materias: Materia[]; accessLevel?: string }) {
  if (!aluno.responsavel) {
    redirect("/");
  }
  const [alunoData, setAlunoData] = useState(aluno);
  const [responsavelData, setResponsavelData] = useState<Responsavel>(aluno.responsavel);
  const [activeTab, setActiveTab] = useState("dadosPessoais");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const enderecoKey = name.split(".")[1];
      setAlunoData({
        ...alunoData,
        endereco: {
          ...alunoData.endereco,
          [enderecoKey]: value,
        },
      });
    } else if (name.startsWith("financeiro.")) {
      const financeiroKey = name.split(".")[1];
      setAlunoData({
        ...alunoData,
        financeiro: {
          ...alunoData.financeiro,
          [financeiroKey]: value,
        },
      });
    } else {
      setAlunoData({ ...alunoData, [name]: value });
    }
  };

  const handleResponsavelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const enderecoKey = name.split(".")[1];
      setResponsavelData({
        ...responsavelData,
        endereco: {
          ...responsavelData.endereco,
          [enderecoKey]: value,
        },
      });
    } else {
      setResponsavelData({ ...responsavelData, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setAlunoData({
      ...alunoData,
      modalidade: {
        ...alunoData.modalidade,
        [name]: checked,
      },
    });
  };

  const formatCurrency = (value: string) => {
    const numberValue = parseFloat(value.replace(/[^\d]/g, "")) / 100;
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const unformattedValue = value.replace(/[^\d]/g, ""); // Remove tudo que não é dígito
    if (value === "") return setAlunoData((prev) => ({ ...prev, financeiro: { ...prev.financeiro, valor: "0" } }));
    const formattedValue = formatCurrency(unformattedValue);

    setAlunoData((prev) => ({
      ...prev,
      financeiro: {
        ...prev.financeiro,
        [name.split(".")[1]]: formattedValue,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let countError = 0;

    if (alunoData.dificuldades.length === 0) {
      toast.error("Selecione ao menos uma matéria");
      countError++;
    }

    if ((alunoData.modalidade.online === false && alunoData.modalidade.presencial === false) || (!alunoData.modalidade.online && !alunoData.modalidade.presencial)) {
      toast.error("Selecione ao menos uma modalidade");
      countError++;
    }

    if (alunoData.ano_escolar === "") {
      alunoData.ano_escolar = "1 ano";
    }

    // Verifica responsavel
    if (!validaResponsavel(responsavelData)) countError++;
    if (!validateCPF(responsavelData?.cpf)) countError++;

    if (countError > 0) return;

    // Remover a formatação do valor ao enviar para o backend
    const cleanedAlunoData = {
      ...alunoData,
      financeiro: {
        ...alunoData.financeiro,
        valor: alunoData.financeiro.valor.replace(/[^\d]/g, ""),
      },
    };

    try {
      const response = await axios.put(`/help/config/${alunoData.id}/meuperfil/editar/`, {
        formData: cleanedAlunoData,
        responsavelData,
        senhaAntiga: alunoData.password,
        typeEdit: "aluno",
      });

      toast.success("Salvo com sucesso");
    } catch (error: any) {
      if (error && error.response && error.response.data) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Error ao criar aluno e responsável");
    }
  };

  const handleMateriasChange = (id: string) => {
    setAlunoData((prev) => {
      const newDificuldades = prev.dificuldades.includes(id) ? prev.dificuldades.filter((materiaId) => materiaId !== id) : [...prev.dificuldades, id];
      return { ...prev, dificuldades: newDificuldades };
    });
  };

  const handleFetchCep = async (cep: string) => {
    if (cep.length !== 8) return;

    cep = cep.replace(/\D/g, "");

    const response = await axios(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.status !== 200) {
      toast.info("CEP não encontrado");
      return;
    }

    if (activeTab === "dadosPessoais") {
      setAlunoData({
        ...alunoData,
        endereco: {
          ...alunoData.endereco,
          rua: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
          estado: response.data.uf,
        },
      });
    }

    if (activeTab === "dadosResponsaveis") {
      setResponsavelData({
        ...responsavelData,
        endereco: {
          ...responsavelData.endereco,
          rua: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
          estado: response.data.uf,
        },
      });
    }
  };

  return (
    <div>
      <div role="tablist" className="tabs tabs-boxed">
        <a role="tab" className={`tab ${activeTab === "dadosPessoais" ? "tab-active" : ""}`} onClick={() => setActiveTab("dadosPessoais")}>
          Dados do Aluno
        </a>
        <a role="tab" className={`tab ${activeTab === "dadosResponsaveis" ? "tab-active" : ""}`} onClick={() => setActiveTab("dadosResponsaveis")}>
          Dados do Responsável
        </a>
      </div>

      {activeTab === "dadosPessoais" && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-md text-center font-bold mt-5 mb-5">Dados Pessoais</h2>
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
                disabled={accessLevel !== "administrador" && accessLevel !== "administrativo"}
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
            <div className="grid grid-cols-4 gap-4 ">
              {materias.map((materia) => (
                <label key={materia.id} className="flex items-center cursor-pointer">
                  <input type="checkbox" name={`dificuldades`} checked={alunoData.dificuldades.includes(materia.id)} onChange={() => handleMateriasChange(materia.id)} className="checkbox" />
                  <span className="label-text ml-2">{materia.materia}</span>
                </label>
              ))}
            </div>
          </div>

          <div id="divFinanceiro">
            <h2 className="text-md text-center font-bold mt-8 mb-5">Financeiro</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="form-control ">
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
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Valor</span>
                </label>
                <input
                  type="text"
                  name="financeiro.valor"
                  value={alunoData.financeiro.valor}
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
                  mask="99/99"
                  maskPlaceholder={null}
                  alwaysShowMask={false}
                  type="text"
                  name="financeiro.dta_vencimento"
                  value={alunoData.financeiro.dta_vencimento}
                  onChange={handleChange}
                  className="input input-bordered w-fit"
                  required
                  disabled={accessLevel !== "administrador" && accessLevel !== "administrativo"}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      )}

      {activeTab === "dadosResponsaveis" && (
        <div>
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
        </div>
      )}
    </div>
  );
}