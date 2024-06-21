import Aluno from "@/interfaces/aluno.interface";
import { Responsavel } from "./CreateEmptyResponsavel";

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
  financeiro: {
    qtd_aulas: 0,
    valor: 0,
    dia_vencimento: "",
  },
  password: "",
  AgendaAulas: {},
  dificuldades: [],
  responsavel: {} as Responsavel,
});

export default createEmptyAluno;
