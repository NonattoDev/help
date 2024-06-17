import { Aluno } from "@prisma/client";
import { ProfessoresMatch } from "./Actions/GetProfessores";
import Image from "next/image";

interface PropsCardProfessor {
  aluno: Aluno;
  professor: ProfessoresMatch;
}
export default function CardProfessor({ professor, aluno }: PropsCardProfessor) {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl">
      <figure>
        <Image className="rounded-md shadow-lg" src={professor?.img_url ? professor.img_url : "/assets/img/default-avatar.png"} width={300} height={300} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{professor.nome}</h2>
        <div id="endereco">
          {/* Criar uma server action que recebe o endereco do aluno e do professor e com api do Google Maps retorna km de distancia */}
          <div className="flex justify-between">
            <div>
              <p>{professor.endereco.bairro}</p>
              <p>{professor.endereco.rua}</p>
            </div>
            <span className="badge badge-accent">{professor.distanciaEmKm} km</span>
          </div>
        </div>
        <div id="materiasQueLeciona" className="card-actions justify-start">
          {professor.materias.map((materia) => (
            <button key={materia} className={`btn btn-sm ${aluno.dificuldades.includes(materia) ? "btn-success text-white" : "btn-warning"}`}>
              {materia}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
