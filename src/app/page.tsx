// src/app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import LoginComponent from "@/components/Login/login";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) return <LoginComponent />;

  return redirect("/help/dashboard");
}
