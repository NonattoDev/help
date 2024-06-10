export interface Responsavel {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    referencia: string;
    complemento: string;
  };
  password: string;
  accessLevel: string;
  createdAt: string;
  updatedAt: string;
}
