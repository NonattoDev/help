// src/app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginComponent from "@/components/Login/login";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) return <LoginComponent />;

  return redirect("/help/gestor/dashboard");
}
