import Aluno from "@/interfaces/aluno.interface";
import { Responsavel } from "./CreateEmptyResponsavel";
import { FinanceiroAluno } from "@prisma/client";

const createEmptyAluno = (): Aluno => ({
  nome: "",
  email: "",
  escola: "",
  ano_escolar: "",
  telefone: "",
  data_nascimento: new Date(),
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
  ficha: "",
  modalidade: {
    online: false,
    presencial: false,
  },
  password: "",
  AgendaAulas: [],
  dificuldades: [],
  responsavel: {} as Responsavel,
  responsavelId: "",
  accessLevel: "",
  ativo: true,
  createdAt: new Date(),
  dadosFinanceiro: {
    valor: 0,
    diaVencimento: "05",
    qtdAulas: 0,
  } as FinanceiroAluno,
  id: "",
  updatedAt: new Date(),
  dataInicioAulas: new Date(),
});

export default createEmptyAluno;
