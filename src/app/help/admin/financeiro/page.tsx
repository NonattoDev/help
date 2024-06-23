"use client";
import moment from "moment";
import "moment/locale/pt-br";
import Status from "./components/Status";
import TabelaFinanceiro from "./components/TabelaFinanceiro";

moment.locale("pt-br");

export default function FinanceiroPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Financeiro</h1>
      <h2 className="text-1xl font-bold my-6 text-center">Visão Geral</h2>
      <Status />
      <TabelaFinanceiro />
    </div>
  );
}
