import { Professor } from "@/interfaces/professor.interface";

const createEmptyProfessor = (): Professor => ({
  nome: "",
  email: "",
  cpf: "",
  data_nascimento: new Date(),
  telefone: "",
  password: "",
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
  areaFormacao: [{ area: "", semestre: "", finalizado: false }],
  modalidade: {
    online: false,
    presencial: false,
  },
  disponibilidade: {
    segunda: { manha: false, tarde: false, noite: false },
    terca: { manha: false, tarde: false, noite: false },
    quarta: { manha: false, tarde: false, noite: false },
    quinta: { manha: false, tarde: false, noite: false },
    sexta: { manha: false, tarde: false, noite: false },
    sabado: { manha: false, tarde: false, noite: false },
  },
  materias: [],
  turmas_habilitadas: [],
});

export default createEmptyProfessor;
