"use client";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { toast } from "react-toastify";
import help from "/public/help.svg";
import { useRouter } from "next/navigation";
import LoadingButton from "../Buttons/LoadingButton";
import Link from "next/link";

export default function LoginComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (email.includes("@") == false) return toast.error("Email inválido");
    if (email === "" || password === "") return toast.info("Preencha todos os campos");

    // Usa o NextAuth para fazer login
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        setLoading(false);
        return toast.error(response.error);
      }

      const session = await getSession();

      toast.success("Login efetuado com sucesso");
      switch (session?.user?.accessLevel) {
        case "administrador":
        case "administrativo":
          router.push("/help/admin/dashboard");
          break;
        case "responsavel":
        case "aluno":
          router.push("/help/cliente/dashboard");
          break;
        case "professor":
          router.push("/help/professor/dashboard");
          break;
        default:
          break;
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }

    return;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full mx-auto">
          <div className="flex justify-center items-center">
            <Image priority src={help} alt="Logo" width={175} height={175} />
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Help</h2>
            <form onSubmit={(e) => submit(e)}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded focus-within:border-blue-500">
                  <FaUser className="ml-3 text-gray-500" />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="w-full px-3 py-2 focus:outline-none" placeholder="Digite seu email" required />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                  Senha
                </label>

                <div className="flex items-center border border-gray-300 rounded focus-within:border-blue-500">
                  <MdPassword className="ml-3 text-gray-500" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="w-full px-3 py-2 focus:outline-none"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-center">
                {loading ? (
                  <LoadingButton />
                ) : (
                  <div className="flex flex-col items-center">
                    <button type="submit" className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-500 ${loading ? "skeleton" : ""}`}>
                      <BiSearch className="mr-1 text-white" />
                      Login
                    </button>
                    <Link className="text-center" href={"/redefinir-senha"}>
                      Esqueci minha senha
                    </Link>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
