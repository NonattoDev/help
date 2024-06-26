"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Series } from "@prisma/client";
import { Materia } from "@/interfaces/professor.interface";
import { validateCPF } from "@/utils/validateCpf";
import validaResponsavel from "@/utils/ValidaResponsavel";
import Aluno from "@/interfaces/aluno.interface";
import Responsavel from "@/interfaces/responsavel.interface";
import { redirect } from "next/navigation";
import Tabs from "./Tabs";
import DadosPessoaisForm from "./DadosPessoaisForm";
import DadosResponsaveisForm from "./DadosResponsaveisForm";
import verifyPassword from "@/utils/VerifyPassword";

interface Props {
  aluno: Aluno;
  series: Series[];
  materias: Materia[];
  accessLevel?: string;
}

export default function EditAluno({ aluno, series, materias, accessLevel }: Props) {
  if (!aluno.responsavel) {
    redirect("/");
  }

  const [alunoData, setAlunoData] = useState(aluno);

  // Logica de confirmacao de senha do aluno
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [responsavelData, setResponsavelData] = useState<Responsavel>(aluno.responsavel);
  const [activeTab, setActiveTab] = useState("dadosPessoais");

  // Logica de confirmacao de senha do responsavel
  const [confirmResponsavelPassword, setResponsavelConfirmPassword] = useState<string>("");
  const [showResponsavelConfirmPassword, setShowResponsavelConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("endereco.")) {
      const enderecoKey = name.split(".")[1];
      setAlunoData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [enderecoKey]: value,
        },
      }));
    } else if (name.startsWith("dadosFinanceiro.")) {
      const financeiroKey = name.split(".")[1];
      setAlunoData((prev) => ({
        ...prev,
        dadosFinanceiro: {
          ...prev.dadosFinanceiro,
          [financeiroKey]: value,
        },
      }));
    } else {
      setAlunoData((prev) => ({ ...prev, [name]: value }));
    }

    if (name === "password" && alunoData.password !== aluno.password) {
      setShowConfirmPassword(true);
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

    if (name === "password" && responsavelData.password !== aluno.responsavel?.password) {
      setShowResponsavelConfirmPassword(true);
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

  const handleMateriasChange = (materia: string) => {
    setAlunoData((prev) => {
      const newDificuldades = prev.dificuldades.includes(materia) ? prev.dificuldades.filter((materiaName) => materiaName !== materia) : [...prev.dificuldades, materia];
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

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const unformattedValue = value.replace(/[^\d]/g, "");
    if (value === "") return setAlunoData((prev) => ({ ...prev, dadosFinanceiro: { ...prev.dadosFinanceiro, valor: 0 } }));
    const formattedValue = formatCurrency(unformattedValue);
    setAlunoData((prev) => ({
      ...prev,
      dadosFinanceiro: {
        ...prev.dadosFinanceiro,
        [name.split(".")[1]]: formattedValue,
      },
    }));
  };

  const formatCurrency = (value: string) => {
    const numberValue = parseFloat(value.replace(/[^\d]/g, "")) / 100;
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
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

    if (alunoData.password !== aluno.password && alunoData.password !== confirmPassword) {
      toast.error("Senhas não coincidem");
      countError++;
    } else {
      if (!verifyPassword(alunoData.password)) countError++;
    }

    if (!validaResponsavel(responsavelData)) countError++;

    if (responsavelData.password !== aluno.responsavel?.password && responsavelData.password !== confirmResponsavelPassword) {
      toast.error("Senhas do responsável não coincidem");
      countError++;
    } else {
      if (!verifyPassword(responsavelData.password)) countError++;
    }

    if (!validateCPF(responsavelData?.cpf)) countError++;
    if (countError > 0) return;

    const cleanedAlunoData = {
      ...alunoData,
      dadosFinanceiro: {
        ...alunoData.dadosFinanceiro,
        valor: alunoData.dadosFinanceiro.valor,
      },
    };

    try {
      const response = await axios.put(`/help/config/${alunoData.id}/meuperfil/editar/`, {
        formData: cleanedAlunoData,
        responsavelData,
        senhaAntiga: alunoData.password,
        typeEdit: "aluno",
        accessLevel,
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

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlunoData((prev) => ({
      ...prev,
      ativo: e.target.checked,
    }));
  };

  return (
    <div>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "dadosPessoais" && (
        <DadosPessoaisForm
          alunoData={alunoData}
          series={series}
          materias={materias}
          accessLevel={accessLevel!}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          handleToggleChange={handleToggleChange}
          handleMateriasChange={handleMateriasChange}
          handleFetchCep={handleFetchCep}
          handleCurrencyChange={handleCurrencyChange}
          setConfirmPassword={setConfirmPassword}
          showConfirmPassword={showConfirmPassword}
          confirmPassword={confirmPassword}
        />
      )}
      {activeTab === "dadosResponsaveis" && (
        <DadosResponsaveisForm
          responsavelData={responsavelData}
          accessLevel={accessLevel!}
          handleResponsavelChange={handleResponsavelChange}
          handleFetchCep={handleFetchCep}
          setResponsavelConfirmPassword={setResponsavelConfirmPassword}
          showResponsavelConfirmPassword={showResponsavelConfirmPassword}
          confirmResponsavelPassword={confirmResponsavelPassword}
        />
      )}
      <div className="flex justify-end mt-8">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Salvar
        </button>
      </div>
    </div>
  );
}
