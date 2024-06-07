import { PrismaClient } from "@prisma/client";

export async function createProfessor(prisma: PrismaClient) {
  const professor = await prisma.professor.createMany({
    data: [
      {
        nome: "Ana Clara",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Engenharia Eletrica",
            semestre: "6",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Novo Horizonte",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Ana Rita",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Historia",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Liberdade",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Anita Moreira",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Estudante",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Matatu",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Beatriz Pires",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Pedagogia",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Cajazeiras",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Bruna Alves",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Cabula",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Bianca Barreto",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Avenida ACM",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Camila Tavares",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Liberdade",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Carla Gabrielle",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Caminho de Areia",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Daiane Teles",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "4",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Cajazeiras 8",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Deise",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "2",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Lauro de Freitas",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Elias Purificação",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "História",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Curuzu",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Emily Coutinho",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Pedagogia" + "Letras",
            semestre: "8",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Pituba",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Enzo Felipe",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "3",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Dom Avelar",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Erica Reis",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Pedagogia",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Cabula",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Evelym",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "3",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Vale do Matatu",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Francis",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Química",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Federação",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Flora Borges",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Odontologia",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Santa Mônica",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Gabriel Santos",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Engomadeira",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Gisele Gomes",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "4",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Dom Avelar",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Isabela Matos",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Limoeiro",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Jade",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "História",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Pernambués",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Jadson",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "História",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Narandiba",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Jamille Fiuza",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "BI Humanidades",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Federação",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Jaqueline Araujo",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "4",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Barris",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Lidia Magalhães",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Boca do Rio",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Lis",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Enfermagem",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "IAPI",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Joice Sales",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Fazenda Grande 1",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Lorena de Sá",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Itapuã",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Louise",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Caminho das Árvores",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Lourran",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "7",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Engomadeira",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Mariana Rizzi",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "BI Humanidades",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Vila Laura",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Mateus",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "8",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Vila Canária",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Matheus Alexandre",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Cabula",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Natália Lino",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Farmácia",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Garcia",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Ravilla Miranda",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "3",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Bairro da Paz",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Rosana",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Pituba",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Robson",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Pernambués",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Saulo Miranda",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Física",
            semestre: "11",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Trobogy",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Thaise",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Estudante",
            semestre: "",
            finalizado: false,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Pituba",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Vitor Lopes",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Matemática",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "Saúde",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
      {
        nome: "Yuri Pereira",
        email: "",
        cpf: "",
        telefone: "",
        areaFormacao: [
          {
            area: "Letras Inglês",
            semestre: "",
            finalizado: true,
          },
        ],
        endereco: {
          rua: "",
          numero: "",
          bairro: "São Caetano",
          cidade: "",
          estado: "",
          cep: "",
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
        },
        password: "$2a$12$8mEzsG7hKhYKuNgs0RW4fOK6AQREgPRkCEJtQmD5t.8nLGfPF6k0S",
      },
    ],
  });

  console.log("Professores criados:", professor);
}
