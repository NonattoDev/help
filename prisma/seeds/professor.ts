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
    ],
  });

  console.log("Professores criados:", professor);
}
