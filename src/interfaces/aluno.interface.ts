import { AgendaAulas, FinanceiroAluno } from "@prisma/client";
import Responsavel from "./responsavel.interface";
import { Aluno as AlunoPrisma } from "@prisma/client";

export default interface Aluno extends AlunoPrisma {
  id: string;
  nome: string;
  email: string;
  escola: string;
  ano_escolar: string;
  data_nascimento: Date;
  telefone: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    referencia: string;
  };
  ficha: string;
  modalidade: {
    online: boolean;
    presencial: boolean;
  };
  password: string;
  responsavelId: string;
  dificuldades: string[];
  accessLevel: string;
  ativo: boolean;
  AgendaAulas: AgendaAulas[];
  createdAt: Date;
  updatedAt: Date;
  responsavel: Responsavel;
  dadosFinanceiro: FinanceiroAluno;
}
