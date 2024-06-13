export interface Aluno {
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
  qtd_aulas: number;
  password: string;
  responsavelId?: string;
  dificuldades: string[];
  accessLevel?: string;
  ativo?: boolean;
  financeiro?: any;
  AgendaAulas?: any;
  createdAt?: Date;
  updatedAt?: Date;
  responsavel?: Responsavel;
}

export interface Responsavel {
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
}
