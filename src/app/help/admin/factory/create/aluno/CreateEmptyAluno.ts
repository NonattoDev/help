import { Aluno } from "@/app/help/config/[id]/meuperfil/Components/Interfaces/Aluno";
import { Responsavel } from "./CreateEmptyResponsavel";

const createEmptyAluno = (): Aluno => ({
  nome: "",
  email: "",
  escola: "",
  ano_escolar: "",
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
  ficha: "",
  modalidade: {
    online: false,
    presencial: false,
  },
  financeiro: {
    qtd_aulas: 0,
    valor: "0",
    dta_vencimento: "",
  },
  password: "",
  AgendaAulas: {},
  dificuldades: [],
  responsavel: {} as Responsavel,
});

export default createEmptyAluno;
