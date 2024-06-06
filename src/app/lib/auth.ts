import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

interface Usuario {
  id: string;
  nome: string;
  email: string;
  cpf?: string;
  password?: string;
  accessLevel: "administrador" | "responsavel" | "aluno" | "professor";
  ativo: boolean;
  telefone?: string;
  endereco?: {
    cep?: string;
    rua?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    numero?: string;
    referencia?: string;
    complemento?: string;
  };
  escola?: string;
  ano_escolar?: string;
  ficha?: string;
  modalidade?: "Presencial" | "Online";
  qtd_aulas?: number;
  data_inicio?: Date;
  responsavelId?: string;
  createdAt: Date;
  updatedAt: Date;
  disponibilidade?: {};
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials || !credentials.email || !credentials.password) throw new Error("Credenciais inválidas");

          let user;

          // Try to find the user in the 'aluno' table
          user = await prisma.aluno.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // If not found, try to find the user in the 'professor' table
          if (!user) {
            user = await prisma.professor.findUnique({
              where: {
                email: credentials.email,
              },
            });
          }

          // If not found, try to find the user in the 'admin' table
          if (!user) {
            user = await prisma.usuarios.findUnique({
              where: {
                email: credentials.email,
              },
            });
          }

          if (user && (await compare(credentials.password, user.password))) {
            return user;
          } else {
            throw new Error("Credenciais inválidas");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const usuario = user as Usuario;
        token.id = user.id;
        token.nome = usuario.nome;
        token.accessLevel = usuario.accessLevel;
        token.ativo = usuario.ativo;
      }
      return token;
    },
    async session(params: { session: any; token: any }) {
      console.log(params);
      params.session.id = params.token.id;
      params.session.nome = params.token.nome;
      params.session.accessLevel = params.token.accessLevel;
      params.session.ativo = params.token.ativo;
      params.session.algo = "teste";
      return params.session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
