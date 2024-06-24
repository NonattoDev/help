// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Redirecionar para a rota / se o token estiver presente e o usuário tentar acessar a rota /help/forgot-password
  if (pathname.includes("/help/forgot-password") && token) {
    const url = new URL(req.url);
    url.pathname = "/";
    return NextResponse.redirect(url.toString());
  }

  // Ignorar a verificação de token para a rota /help/forgot-password
  if (pathname.includes("/help/forgot-password")) {
    return NextResponse.next();
  }

  if (!token) {
    const url = new URL(req.url);
    url.pathname = "/";
    return NextResponse.redirect(url.toString());
  }

  if (req.nextUrl.pathname.includes("/help/admin")) {
    if (token.accessLevel !== "administrador" && token.accessLevel !== "administrativo") {
      const redirectUrl = token.accessLevel === "professor" ? "/help/professor/dashboard" : "/help/cliente/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url).toString());
    }
  } else if (req.nextUrl.pathname.includes("/help/cliente")) {
    if (token.accessLevel !== "responsavel" && token.accessLevel !== "aluno") {
      const redirectUrl = token.accessLevel === "professor" ? "/help/professor/dashboard" : "/help/admin/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url).toString());
    }
  } else if (req.nextUrl.pathname.includes("/help/professor")) {
    if (token.accessLevel !== "professor") {
      const redirectUrl = token.accessLevel === "administrador" ? "/help/admin/dashboard" : "/help/cliente/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, req.url).toString());
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/help/:path*",
};
