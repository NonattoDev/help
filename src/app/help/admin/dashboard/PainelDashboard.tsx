"use client";

import moment from "moment";
import CardAlunosAlert from "./CardAlunosAlert";
import { useState } from "react";

export default function PainelDashboard() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  return (
    <div>
      <div className="flex flex-col my-2 items-center gap-2">
        <label className="label-text">Filtrar por data</label>
        <input type="date" className="input input-bordered" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <CardAlunosAlert date={date} />
    </div>
  );
}
