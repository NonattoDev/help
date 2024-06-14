export interface Administrador {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  cargo: string;
  password: string;
  accesslevel: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}
