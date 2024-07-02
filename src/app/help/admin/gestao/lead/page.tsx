"use client";
import moment from "moment";
import { useState } from "react";
import AddCRM from "./AddCRM";
import LeadApp from "./LeadApp";

export default function CRMPage() {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  return (
    <div>
      <div id="data">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input input-bordered" />
      </div>
      <AddCRM />
      <LeadApp date={date} />
    </div>
  );
}
