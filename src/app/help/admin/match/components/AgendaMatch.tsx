"use client";

import { Aluno } from "@prisma/client";
import { ProfessoresMatch } from "./Actions/GetProfessores";

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
export default async function AgendaMatch({ professor, aluno }: AgendaMatchProps) {
  return (
    <div>
      <h1>Agenda Match</h1>
    </div>
  );
}
