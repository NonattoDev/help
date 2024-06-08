import { PrismaClient } from "@prisma/client";

export async function createProfessor(prisma: PrismaClient) {
  const professor = await prisma.professor.createMany({
    data: [
      {
        nome: "Ana Clara da Silva Pinho",
        email: "anaclara.pinho0@gmail.com",
        cpf: "862.429.605-67",
        telefone: "71983637758",
        areaFormacao: [
          {
            area: "Engenharia Eletrica",
            semestre: "6",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Mônica",
          numero: "10",
          bairro: "Novo Horizonte",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41218032",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Ana Rita Lima Gomes",
        email: "gomeslima.ana@outlook.com",
        cpf: "083.465.525-05",
        telefone: "71999841418",
        areaFormacao: [
          {
            area: "Historia",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Damião de Góes",
          numero: "3",
          bairro: "Liberdade",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40325680",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Anita Sousa dos Santos Moreira",
        email: "anitamoreira745@gmail.com",
        cpf: "09824950567",
        telefone: "71996302616",
        areaFormacao: [
          {
            area: "Estudante",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Arlindo Fragoso",
          numero: "98",
          bairro: "Matatu",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40255040",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: false,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Beatriz Pires de Novaes dos Santos",
        email: "beatrizpires12144@gmail.com",
        cpf: "857.988.935-96",
        telefone: "71988156795",
        areaFormacao: [
          {
            area: "Pedagogia",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Setor A",
          numero: "",
          bairro: "Cajazeiras 8",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41338200",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Bruna Alves Silva Cruz",
        email: "cruz.bruna993@gmail.com",
        cpf: "051.929.415-71",
        telefone: "71983846555",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Condomínio governador José Marcelino",
          numero: "apto 101",
          bairro: "Cabula",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41150485",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Bianca da Silva Barreto",
        email: "biah.barreto@hotmail.com",
        cpf: "035.567.075-51",
        telefone: "71982035398",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua André Luís",
          numero: "",
          bairro: "Brotas",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40279-070",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Camila Ferreira Tavares",
        email: "camilaftavares@live.com",
        cpf: "074.738.205-08",
        telefone: "71992835170",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Adelino Santos",
          numero: "20",
          bairro: "Liberdade",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "60420490",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Carla Gabrielle Santos do Nascimento",
        email: "carlagabrielle.nasc@gmail.com",
        cpf: "078.903.655-00",
        telefone: "71992561315",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua da Legalidade",
          numero: "31",
          bairro: "Caminho de Areia",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40434545",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: true,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Daiane Santos Teles",
        email: "Daianeteles2003@gmail.com",
        cpf: "094.934.355-20",
        telefone: "71986465669",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "4",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Travessa Bernardo Azevedo",
          numero: "",
          bairro: "Cajazeiras 8",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41330235",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: false,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: false,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: false,
            noite: false,
          },
          sabado: {
            manha: true,
            tarde: true,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Deise Santos Souza",
        email: "deise_souzas@hotmail.com",
        cpf: "042.291.915-29",
        telefone: "71992216840",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "2",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Avenida Baixa Grande",
          numero: "",
          bairro: "Recreio Ipitanga",
          cidade: "Lauro de Freitas",
          estado: "Bahia",
          cep: "42700330",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: true,
            tarde: true,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Elias Purificação Pereira",
        email: "profeliaspereira@gmail.com",
        cpf: "85984554585",
        telefone: "71993419940",
        areaFormacao: [
          {
            area: "História",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Adelino Santos",
          numero: "17",
          bairro: "Curuzu",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40375430",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Emily Coutinho da Silva Costa",
        email: "emilycoutinho0413@outlook.com",
        cpf: "08541290573",
        telefone: "719937577775",
        areaFormacao: [
          {
            area: "Pedagogia" + "Letras",
            semestre: "8",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Avenida professor Magalhães neto",
          numero: "891",
          bairro: "Pituba",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41810011",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Enzo Felipe Dos Santos Rocha",
        email: "enzobottesini@gmail.com",
        cpf: "082.244.155-11",
        telefone: "71989060347",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "3",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Cid. Moreira",
          numero: "24",
          bairro: "Dom Avelar",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41315010",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Erica Santos Reis",
        email: "erica.santosreis14@gmail.com",
        cpf: "074.618.185-03",
        telefone: "71991464123",
        areaFormacao: [
          {
            area: "Pedagogia",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Tenente Valmir Alcântara",
          numero: "458",
          bairro: "Cabula",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41150520",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Evelym Souza da Silva",
        email: "evelymsilva80@gmail.com",
        cpf: "099.483.445-45",
        telefone: "71983031172",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "3",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Vale do Matatu",
          numero: "5",
          bairro: "Vale do Matatu",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40255575",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Francis Carneiro Damasio",
        email: "francis.damasio@hotmail.com",
        cpf: "042.387.055-64",
        telefone: "75981357726",
        areaFormacao: [
          {
            area: "Química",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Engenheiro Jaime Zaverucha",
          numero: "",
          bairro: "Federação",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40235430",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: false,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Flora Batista Borges",
        email: "flora.batista@ufba.br",
        cpf: "056.139.295-13",
        telefone: "71988954874",
        areaFormacao: [
          {
            area: "Odontologia",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Doutor Aristides de Oliveira",
          numero: "1005",
          bairro: "Santa Mônica",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40342000",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Gabriel Santos de Sant'anna",
        email: "gabriel95dosantos@gmail.com",
        cpf: "063.083.025-89",
        telefone: "999581453",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua da engomadeira",
          numero: "2",
          bairro: "Engomadeira",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41200005",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Gisele Gomes Pastor",
        email: "giselegomespastor@gmail.com",
        cpf: "858.432.825-46",
        telefone: "71982557597",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "4",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Alameda Boa Vista Da Ceasa",
          numero: "5",
          bairro: "Dom Avelar",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41402370",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: false,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Isabela Santana Matos",
        email: "isamatos015@gmail.com",
        cpf: "110.121.845-28",
        telefone: "71999661637",
        areaFormacao: [
          {
            area: "",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua vila Verde",
          numero: "58",
          bairro: "Mussurunga",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41481542",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Jade Narel Nascimento Simões",
        email: "jadenarel5000@outlook.com",
        cpf: "859.668.835-80",
        telefone: "71991966610",
        areaFormacao: [
          {
            area: "História",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Travessa Pinto",
          numero: "18",
          bairro: "Pernambués",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41110390",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: false,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Jadson Bomfim dos Santos",
        email: "santus.jbonfim@gmail.com",
        cpf: "056.663.005-20",
        telefone: "71983885404",
        areaFormacao: [
          {
            area: "História",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "5ª Travessa da rua Irmã Dulce",
          numero: "56",
          bairro: "Narandiba",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41192345",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Jamille Fiuza Santiago",
        email: "jamille.fiuza@hotmail.com",
        cpf: "046.780.185-14",
        telefone: "75982464750",
        areaFormacao: [
          {
            area: "BI Humanidades",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Ferreira Santos",
          numero: "160",
          bairro: "Federação",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40230040",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: false,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Jaqueline da Silva Araújo",
        email: "Jaquearaujo013@gmail.com",
        cpf: "096.221.475-26",
        telefone: "75999292244",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "4",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Almeida Sande",
          numero: "",
          bairro: "Barris",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40070-370",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Lidia Santos Magalhães",
        email: "lidiasmagalhaes@gmail.com",
        cpf: "055.435.805-09",
        telefone: "71992246077",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Lavínia Magalhães",
          numero: "604",
          bairro: "Boca do Rio",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41710020",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Lisiane de Souza Amorim",
        email: "lisi_anne1998@hotmail.com",
        cpf: "861.608.805-94",
        telefone: "71993964271",
        areaFormacao: [
          {
            area: "Enfermagem",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Avenida Ferreira",
          numero: "24",
          bairro: "IAPI",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40330353",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: true,
            tarde: true,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Joice de Andrade Sales",
        email: "Joiceas@ufba.br",
        cpf: "035.274.425-10",
        telefone: "71988769497",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Vereador Zezéu Ribeiro",
          numero: "613",
          bairro: "Fazenda Grande 1",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41345100  ",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: false,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Lorena de Sá Leal",
        email: "lorenadesaleal@hotmail.com",
        cpf: "07025479560",
        telefone: "71992874854",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua da Cacimba",
          numero: "380",
          bairro: "Itapuã",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41610655",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: true,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: true,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Louise Prado Farias Leal",
        email: "louisepfleal@gmail.com",
        cpf: "865.337.605-48",
        telefone: "71999390856",
        areaFormacao: [
          {
            area: "",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Alameda dos Flamboyants",
          numero: "131",
          bairro: "Caminho das Árvores",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41820410",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: false,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: false,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Lourran de Novaes Oliveira",
        email: "lourran07@hotmail.com",
        cpf: "087.879.945-18",
        telefone: "71999416059",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "7",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Travessa 21 de julho",
          numero: "396",
          bairro: "Engomadeira",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41200150",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: false,
            noite: true,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: true,
          },
          quarta: {
            manha: true,
            tarde: false,
            noite: true,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: true,
          },
          sexta: {
            manha: true,
            tarde: false,
            noite: true,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Mariana Rizzi Santos do Carmo",
        email: "mariana.rizzi16@gmail.com",
        cpf: "090.243.585-07",
        telefone: "71981536786",
        areaFormacao: [
          {
            area: "BI Humanidades",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Doutor Genésio Sales",
          numero: "88",
          bairro: "Vila Laura",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40270240",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Mateus de Santana Silva",
        email: "dsantanamateus@gmail.com",
        cpf: "864.032.965-66",
        telefone: "71991563348",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "8",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua José Gome Aguiar",
          numero: "",
          bairro: "Vila Canária",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41390200",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: false,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: true,
          },
          quarta: {
            manha: true,
            tarde: false,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          sexta: {
            manha: true,
            tarde: false,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Matheus Alexandre Araujo Santos",
        email: "mathst1@hotmail.com",
        cpf: "861.262.585-84",
        telefone: "7198546-2560",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Amazonas",
          numero: "157",
          bairro: "Cabula",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41192-065",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: true,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: true,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Natália Lino Silva Spagnuolo",
        email: "natalialino.s@hotmail.com",
        cpf: "078.985.545-31",
        telefone: "71993332905",
        areaFormacao: [
          {
            area: "Farmácia",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Cláudio Manoel da Costa",
          numero: "Ed. Santa Rita, apt 302",
          bairro: "Garcia",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40110-180",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: true,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: true,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: true,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Ravilla Miranda Santos",
        email: "ravillasantos@ufba.br",
        cpf: "858.462.595-02",
        telefone: "71985542445",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "3",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua da Jamaica",
          numero: "",
          bairro: "Bairro da Paz",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41515070",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Rosana Franquetto Pitta",
        email: "rosanafpitta@gmail.com",
        cpf: "035.791.785-55",
        telefone: "71991338158",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Amazonas",
          numero: "528",
          bairro: "Pituba",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "71991338158",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Robson Ribeiro dos Santos",
        email: "robsonstarkribeiro@gmail.com",
        cpf: "052.839.845-83",
        telefone: "71993581388",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Erotildes",
          numero: "",
          bairro: "Pernambués",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41130130",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Saulo Miranda Silva",
        email: "saulo_miranda@outlook.com",
        cpf: "063.505.385-36",
        telefone: "71993474356",
        areaFormacao: [
          {
            area: "Física",
            semestre: "11",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Mocambo Ilhado",
          numero: "",
          bairro: "Trobogy",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41745039",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: true,
          },
          quinta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: false,
            noite: true,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Thaise Braga de Oliveira",
        email: "thaiseoliveira22.1@bahiana.edu.br",
        cpf: "101.991.855-14",
        telefone: "71999341444",
        areaFormacao: [
          {
            area: "Estudante",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "Rua Maranhão,",
          numero: "",
          bairro: "Pituba",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "41830-260",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Vitor Lopes da Silva",
        email: "Professor.vitorlopes@gmail.com",
        cpf: "862.554.645-55",
        telefone: "71993109070",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua jogo do Carneiro",
          numero: "152",
          bairro: "Saúde",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40045-040",
        },
        disponibilidade: {
          segunda: {
            manha: false,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: false,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: false,
            tarde: false,
            noite: false,
          },
          sexta: {
            manha: false,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: false,
            tarde: false,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Yuri Reis Pereira",
        email: "yurireispro@gmail.com",
        cpf: "049.980.695-60",
        telefone: "71991476766",
        areaFormacao: [
          {
            area: "Letras Inglês",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "Rua Wanderley Pinho",
          numero: "1",
          bairro: "São Caetano",
          cidade: "Salvador",
          estado: "Bahia",
          cep: "40390150",
        },
        disponibilidade: {
          segunda: {
            manha: true,
            tarde: true,
            noite: false,
          },
          terca: {
            manha: true,
            tarde: false,
            noite: false,
          },
          quarta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          quinta: {
            manha: true,
            tarde: false,
            noite: false,
          },
          sexta: {
            manha: true,
            tarde: true,
            noite: false,
          },
          sabado: {
            manha: true,
            tarde: true,
            noite: false,
          },
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
    ],
  });

  console.log("Professores criados:", professor);
}
