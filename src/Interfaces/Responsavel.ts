import Aluno from "@/interfaces/Aluno";

export default interface Responsavel {
  id?: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
    referencia: string;
    complemento: string;
  };
  password: string;
  accessLevel?: string;
  createdAt?: Date;
  updatedAt?: Date;
  alunos?: Aluno[];
}
