"use client";
import { useState } from "react";

import moment from "moment";
import CadastrarMeta from "./CadastrarMeta";
import AllMetas from "./AllMetas";

export default function MetasPage() {
  const [date, setDate] = useState(moment().format("YYYY-MM"));

  const handleDateChange = (e: any) => {
    const selectedDate = moment(e.target.value).format("YYYY-MM");
    setDate(selectedDate);
  };

  return (
    <div>
      <div className="tooltip" data-tip="Dia não será considerado">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Filtrar por mês e ano
        </label>
        <input type="date" name="date" id="date" onChange={handleDateChange} value={moment(date, "YYYY-MM").format("YYYY-MM-DD")} className="input input-bordered w-full" />
      </div>
      <div className="flex flex-col gap-4 my-8">
        <CadastrarMeta />
        <AllMetas date={date} />
      </div>
    </div>
  );
}
