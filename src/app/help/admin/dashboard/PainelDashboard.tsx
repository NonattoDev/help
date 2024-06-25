"use client";

import moment from "moment";
import CardAlunosAlert from "./components/CardAlunosAlert";
import { useState } from "react";
import AlunosEntrantesSemanal from "./components/AlunosEntrantesSemanal";
import AlunosSemProfessor from "./components/AlunosSemProfessor";
import FinanceiroFuncionarios from "./components/FinanceiroFuncionarios";
import ValoresReceber from "./components/ValoresReceber";

export default function PainelDashboard() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  return (
    <div className="flex flex-col">
      <div className="flex flex-col my-2 items-center gap-2">
        <label className="label-text">Filtrar por data</label>
        <input type="date" className="input input-bordered" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="flex gap-2 justify-center">
        <CardAlunosAlert date={date} />
        <AlunosEntrantesSemanal />
        <AlunosSemProfessor />
        <FinanceiroFuncionarios />
        <ValoresReceber />
      </div>
    </div>
  );
}
