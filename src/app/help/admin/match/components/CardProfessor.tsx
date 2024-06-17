import { Aluno } from "@prisma/client";
import { ProfessoresMatch } from "./Actions/GetProfessores";
import Image from "next/image";

interface PropsCardProfessor {
  aluno: Aluno;
  professor: ProfessoresMatch;
  selectProfessor: any;
}

export default function CardProfessor({ professor, aluno, selectProfessor }: PropsCardProfessor) {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl">
      <figure>
        <Image
          width={300}
          height={300}
          className="rounded-xl shadow-lg"
          src={professor?.img_url ? professor.img_url : "/assets/img/default-avatar.png"}
          alt={professor.nome}
          style={{ objectFit: "cover" }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{professor.nome}</h2>
        <div id="endereco" className="my-4">
          <div className="flex justify-between">
            <div>
              <p>{professor.endereco.bairro}</p>
              <p>{professor.endereco.rua}</p>
            </div>
            <span className="badge badge-accent">{professor.distanciaEmKm} km</span>
          </div>
        </div>
        <div id="materiasQueLeciona" className="card-actions justify-start shadow-md rounded-md p-4 bg-slate-100">
          {professor.materias.map((materia) => (
            <button key={materia} className={`btn btn-sm ${aluno.dificuldades.includes(materia) ? "btn-success text-white" : "btn-warning"}`}>
              {materia}
            </button>
          ))}
        </div>
        <div id="action" className="flex justify-end">
          <button className="btn btn-primary" onClick={() => selectProfessor(professor)}>
            Match
          </button>
        </div>
      </div>
    </div>
  );
}
