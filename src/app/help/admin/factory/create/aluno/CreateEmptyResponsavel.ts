export interface Responsavel {
  nome: string;
  email: string;
  telefone: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
    complemento: string;
    referencia: string;
  };
  password: string;
  cpf: string;
  created_at?: string;
  updated_at?: string;
}
const createEmptyResponsavel = (): Responsavel => ({
  nome: "",
  email: "",
  telefone: "",
  endereco: {
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: "",
    referencia: "",
  },
  password: "",
  cpf: "",
});

export default createEmptyResponsavel;
