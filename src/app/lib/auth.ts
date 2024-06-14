import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import prisma from "../../../prisma/prismaInstance";

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
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Usuário ou senha incorretos!");
        }

        let user = (await prisma.aluno.findUnique({
          where: { email: credentials.email },
        })) as any;

        if (!user) {
          user = (await prisma.professor.findUnique({
            where: { email: credentials.email },
          })) as any;
        }

        if (!user) {
          user = (await prisma.usuarios.findUnique({
            where: { email: credentials.email },
          })) as any;
        }

        if (!user) {
          user = (await prisma.responsavel.findUnique({
            where: { email: credentials.email },
          })) as any;
        }

        await prisma.$disconnect();

        if (user && (await compare(credentials.password, user.password))) {
          return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            accessLevel: user.accessLevel,
            ativo: user.ativo,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        } else {
          throw new Error("Usuário ou senha incorretos!");
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
        token.id = user.id;
        token.nome = user.nome;
        token.email = user.email;
        token.accessLevel = user.accessLevel;
        token.ativo = user.ativo;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          nome: token.nome,
          email: token.email,
          accessLevel: token.accessLevel,
          ativo: token.ativo,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
