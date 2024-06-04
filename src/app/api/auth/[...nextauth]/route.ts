import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

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
          let userType;

          // Try to find the user in the 'aluno' table
          user = await prisma.aluno.findUnique({
            where: {
              email: credentials.email,
            },
          });
          userType = "aluno";

          // If not found, try to find the user in the 'professor' table
          if (!user) {
            user = await prisma.professor.findUnique({
              where: {
                email: credentials.email,
              },
            });
            userType = "professor";
          }

          // If not found, try to find the user in the 'admin' table
          if (!user) {
            user = await prisma.admin.findUnique({
              where: {
                email: credentials.email,
              },
            });
            userType = "admin";
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
        token.id = user.id;
      }
      return token;
    },
    async session(params: { session: any; token: any }) {
      params.session.id = params.token.id;
      return params.session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
