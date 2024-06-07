import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    nome: string;
    accessLevel: "administrador" | "responsavel" | "aluno" | "professor" | "administrativo";
    ativo: boolean;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    nome: string;
    accessLevel: "administrador" | "responsavel" | "aluno" | "professor" | "administrativo";
    ativo: boolean;
  }
}
