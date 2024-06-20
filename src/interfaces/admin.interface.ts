export interface Administrador {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  data_nascimento: Date;
  telefone: string;
  cargo: string;
  password: string;
  accesslevel: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
