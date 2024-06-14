import Responsavel from "./Responsavel";

export default interface Aluno {
  id?: string;
  nome: string;
  email: string;
  escola: string;
  ano_escolar: string;
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
  responsavelId?: string;
  dificuldades: string[];
  accessLevel?: string;
  ativo?: boolean;
  financeiro: {
    qtd_aulas: number;
    valor: string;
    dta_vencimento: string;
  };
  AgendaAulas?: any;
  createdAt?: Date;
  updatedAt?: Date;
  responsavel?: Responsavel;
}