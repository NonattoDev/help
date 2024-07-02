"use client";
import moment from "moment";
import CRMApp from "./CRM";
import { useState } from "react";
import AddCRM from "./AddCRM";

export default function CRMPage() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  return (
    <div>
      <div id="data">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered" />
      </div>
      <AddCRM />
      <CRMApp date={date} />
    </div>
  );
}
