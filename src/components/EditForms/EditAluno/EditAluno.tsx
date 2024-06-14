"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Series } from "@prisma/client";
import { Materia } from "@/interfaces/professor.interface";
import { validateCPF } from "@/utils/validateCpf";
import validaResponsavel from "@/utils/ValidaResponsavel";
import moment from "moment";
import Aluno from "@/interfaces/aluno.interface";
import Responsavel from "@/interfaces/responsavel.interface";
import { redirect } from "next/navigation";
import Tabs from "./Tabs";
import DadosPessoaisForm from "./DadosPessoaisForm";
import DadosResponsaveisForm from "./DadosResponsaveisForm";

interface Props {
  aluno: Aluno;
  series: Series[];
  materias: Materia[];
  accessLevel?: string;
}

const formatDate = (date: Date | string) => {
  return moment(date).format("YYYY-MM-DD");
};

export default function EditAluno({ aluno, series, materias, accessLevel }: Props) {
  if (!aluno.responsavel) {
    redirect("/");
  }

  const [alunoData, setAlunoData] = useState({
    ...aluno,
    data_nascimento: aluno.data_nascimento ? formatDate(aluno.data_nascimento) : "",
  });

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

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const unformattedValue = value.replace(/[^\d]/g, "");
    if (value === "") return setAlunoData((prev) => ({ ...prev, financeiro: { ...prev.financeiro, valor: 0 } }));
    const formattedValue = formatCurrency(unformattedValue);
    setAlunoData((prev) => ({
      ...prev,
      financeiro: {
        ...prev.financeiro,
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
    if (!validaResponsavel(responsavelData)) countError++;
    if (!validateCPF(responsavelData?.cpf)) countError++;
    if (countError > 0) return;

    const cleanedAlunoData = {
      ...alunoData,
      financeiro: {
        ...alunoData.financeiro,
        valor: alunoData.financeiro.valor,
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
          handleMateriasChange={handleMateriasChange}
          handleFetchCep={handleFetchCep}
          handleCurrencyChange={handleCurrencyChange}
        />
      )}
      {activeTab === "dadosResponsaveis" && (
        <DadosResponsaveisForm responsavelData={responsavelData} accessLevel={accessLevel!} handleResponsavelChange={handleResponsavelChange} handleFetchCep={handleFetchCep} />
      )}
      <div className="flex justify-end mt-8">
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Salvar
        </button>
      </div>
    </div>
  );
}
