"use client";

import { Aluno } from "@prisma/client";
import { ProfessoresMatch } from "./Actions/GetProfessores";
import { useState } from "react";

interface AgendaMatchProps {
  professor: ProfessoresMatch;
  aluno: Aluno;
}

// Observacoes da agenda e de regra de negocio
// As aulas iniciam sempre as 9 horas e a ultima aula só pode iniciar até as 20 horas
// Para aulas Presenciais o intervalo entre uma aula e outra deve ser de 30 minutos
// Para Aulas Online não há intervalo entre as aulas
// Existem pacotes de aulas de 1h, 1h30 e 2h

//Calculo de aulas e horarios

/* 
Aulas Online:
Pacote de 1 hora: 11 aulas
Pacote de 1 hora e 30 minutos: 7 aulas
Pacote de 2 horas: 5 aulas

Aulas Presenciais:
Pacote de 1 hora: 7 aulas
Pacote de 1 hora e 30 minutos: 5 aulas
Pacote de 2 horas: 4 aulas

*/

enum Step {
  SELECTDATA,
  SELECTHORARIODISPONIVEL,
}

export default function AgendaMatch({ professor, aluno }: AgendaMatchProps) {
  console.log(professor, aluno);
  const [step, setStep] = useState<Step>(Step.SELECTDATA);
  const [date, setDate] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setStep(Step.SELECTHORARIODISPONIVEL);
  };

  return (
    <div>
      {step === Step.SELECTDATA && (
        <div>
          <input type="date" className="input input-bordered" value={date} onChange={handleDateChange} />
        </div>
      )}
      {step === Step.SELECTHORARIODISPONIVEL && (
        <div>
          <button type="button" className="btn btn-ghost btn-primary">
            09:00
          </button>
          <button type="button" className="btn btn-ghost btn-primary">
            10:00
          </button>
          <button type="button" className="btn btn-ghost btn-primary">
            11:00
          </button>
        </div>
      )}
    </div>
  );
}
