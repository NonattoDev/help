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
import Modal from "./ForgotModal"; // Importe o componente Modal
import { SendRecoveryEmail } from "@/server/actions/SendRecoveryEmail";

export default function LoginComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = React.useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Email inválido");
    if (email === "" || password === "") return toast.info("Preencha todos os campos");

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
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSendCode = async () => {
    const sendEmail = await SendRecoveryEmail(emailRecuperacao);

    if (sendEmail.success) {
      setEmailRecuperacao("");
      toast.success(sendEmail.message);
    } else {
      toast.error(sendEmail.message);
      return;
    }
    // E depois fechar o modal
    closeModal();
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
            <form onSubmit={submit}>
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
                    <button type="button" className="btn text-center mt-4" onClick={handleForgotPassword}>
                      Esqueci minha senha
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal show={showModal} onClose={closeModal}>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-bold">Esqueci minha senha</h2>
          <p className="py-4">Insira seu email para redefinir sua senha.</p>

          <input type="email" name="emailRecuperacao" id="emailRecuperacao" className="input input-bordered" value={emailRecuperacao} onChange={(e) => setEmailRecuperacao(e.target.value)} />

          <button className="btn my-2" onClick={handleSendCode}>
            Enviar email de recuperação
          </button>
        </div>
      </Modal>
    </div>
  );
}
