import { Aluno } from "@/app/help/config/[id]/meuperfil/Components/Interfaces/Aluno";
import moment from "moment";

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
  password: "",
  qtd_aulas: 0,
  data_inicio: moment().format("DD-MM-YYYY"),
  financeiro: {
    dta_vencimento: "",
    valor: 0,
  },
  AgendaAulas: {},
  dificuldades: [],
});

export default createEmptyAluno;
