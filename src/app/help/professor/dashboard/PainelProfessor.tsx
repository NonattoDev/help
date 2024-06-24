"use client";

import AgendaCard from "@/components/Agenda/AgendaCard/AgendaCard";

export default function PainelProfessor({ AgendaProfessor }: { AgendaProfessor: any[] }) {
  return <AgendaCard AgendaAulas={AgendaProfessor as any[]} calledBy="ProfessorPage" />;
}
