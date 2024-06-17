export type Dia = "segunda" | "terca" | "quarta" | "quinta" | "sexta" | "sabado";
export type Turno = "manha" | "tarde" | "noite";

export interface Materia {
  id: string;
  materia: string;
}

export interface Professor {
  id?: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  password: string;
  turmas_habilitadas: string[];
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
  areaFormacao: Array<{ area: string; semestre: string; finalizado: boolean }>;
  modalidade: {
    online: boolean;
    presencial: boolean;
  };
  disponibilidade: {
    [key in Dia]: {
      [key in Turno]: boolean;
    };
  };
  materias: string[];
  ativo?: boolean;
  img_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
