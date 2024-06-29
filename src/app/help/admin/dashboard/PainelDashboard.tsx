"use client";

import moment from "moment";
import CardAlunosAlert from "./components/CardAlunosAlert";
import { useState } from "react";
import AlunosEntrantesSemanal from "./components/AlunosEntrantesSemanal";
import AlunosSemProfessor from "./components/AlunosSemProfessor";
import FinanceiroFuncionarios from "./components/FinanceiroFuncionarios";
import ValoresReceber from "./components/ValoresReceber";
import LucroTotal from "./components/LucroTotal";
import VendasDaSemana from "./components/VendasDaSemana";
import TicketMedio from "./components/TicketMedio";
import ProfessoresDesativadosMensal from "./components/ProfessoresDesativadosMensal";
import AlunosDesativadosMensal from "./components/AlunosDesativadosMensal";
import ProfessoresTotal from "./components/ProfessoresTotal";

export default function PainelDashboard() {
  const [date, setDate] = useState<string>(moment().format("YYYY-MM-DD"));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col my-2 items-center gap-2">
        <label className="label-text">Filtrar por data</label>
        <input type="date" className="input input-bordered" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="shadow-xl p-8 bg-slate-100 rounded-lg">
          <h2 className="block text-gray-700 text-center text-2xl font-bold mb-2">Dados Financeiros</h2>
          <div className="flex gap-2 flex-wrap justify-center">
            <ProfessoresTotal date={date} />
            <CardAlunosAlert date={date} />
            <AlunosEntrantesSemanal date={date} />
            <AlunosSemProfessor date={date} />
            <VendasDaSemana date={date} />
            <ProfessoresDesativadosMensal date={date} />
            <AlunosDesativadosMensal date={date} />
          </div>
        </div>
      </div>
      <div className="shadow-xl p-8 bg-slate-100 rounded-lg">
        <h2 className="block text-gray-700 text-center text-2xl font-bold mb-2">Valores</h2>
        <div id="valores" className="flex gap-2 flex-wrap justify-center">
          <FinanceiroFuncionarios date={date} />
          <ValoresReceber date={date} />
          <TicketMedio date={date} />
          <LucroTotal date={date} />
        </div>
      </div>
    </div>
  );
}
