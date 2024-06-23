"use client";
import moment from "moment";
import "moment/locale/pt-br";
import Status from "./components/Status";
import TabelaFinanceiro from "./components/TabelaFinanceiro";
import { useState } from "react";
import SelectProfessores from "./components/SelectProfessores";
import { toast } from "react-toastify";

moment.locale("pt-br");

export default function FinanceiroPage() {
  const [professorId, setProfessorId] = useState<string | null>(null);

  const HandleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProfessorId(event.target.value);
    toast.success("Professor selecionado com sucesso" + event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Financeiro</h1>
      <h2 className="text-1xl font-bold my-6 text-center">Visão Geral</h2>
      <SelectProfessores HandleSelectChange={HandleSelectChange} />
      <Status professorId={professorId} />
      <TabelaFinanceiro professorId={professorId} />
    </div>
  );
}
