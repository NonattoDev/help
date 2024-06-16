import { Professor } from "@/interfaces/professor.interface";

interface PropsCardProfessor {
  professor: Professor;
}
export default function CardProfessor({ professor }: PropsCardProfessor) {
  return (
    <div className="card card-compact w-80 bg-base-100 shadow-xl">
      <figure>
        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{professor.nome}</h2>
        <div id="endereco">
          {/* Criar uma server action que recebe o endereco do aluno e do professor e com api do Google Maps retorna km de distancia */}
          <p>{professor.endereco.bairro}</p>
          <p>{professor.endereco.rua}</p>
        </div>
        <div id="materiasQueLeciona" className="card-actions justify-end">
          {professor.materias.map((materia) => (
            <button key={materia} className="btn btn-sm btn-primary">
              {materia}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
