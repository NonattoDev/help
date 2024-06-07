export interface Professor {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  endereco: {
    cep: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    numero: string;
  };
  areaFormacao: [
    {
      area: string;
      semestre: string;
      finalizado: boolean;
    }
  ];
  ativo: boolean;
  disponibilidade: {
    sexta: {
      manha: boolean;
      tarde: boolean;
      noite: boolean;
    };
    terca: {
      manha: boolean;
      tarde: boolean;
      noite: boolean;
    };
    quarta: {
      manha: boolean;
      tarde: boolean;
      noite: boolean;
    };
    quinta: {
      manha: boolean;
      tarde: boolean;
      noite: boolean;
    };
    segunda: {
      manha: boolean;
      tarde: boolean;
      noite: boolean;
    };
  };
  ficha: any[];
  accessLevel: string;
  modalidade: { online: boolean; presencial: boolean };
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
