"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { ChangePasswordForgot } from "./ChangePasswordForgot";
import verifyPassword from "@/utils/VerifyPassword";
import { redirect } from "next/navigation";

export default function RedefineSenha({ email }: { email: string }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const HandleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    let errorCount = 0;

    if (!password || !confirmPassword) {
      errorCount++;
      toast.error("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      errorCount++;
      toast.error("As senhas não coincidem");
    }

    if (!verifyPassword(password)) errorCount++;

    if (errorCount > 0) return;

    const trocaSenha = await ChangePasswordForgot(email, password);

    if (trocaSenha.success) {
      toast.success(trocaSenha.message);
      redirect("/");
    } else {
      return toast.error(trocaSenha.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded shadow-xl max-w-md w-full">
        <h1 className="text-center text-2xl my-4">Redefinir senha</h1>
        <div className="flex flex-col gap-2 items-center">
          <input type="password" placeholder="Nova senha" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirme a nova senha" className="input input-bordered w-full" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className="btn w-full" onClick={HandleConfirm}>
            Redefinir senha
          </button>
        </div>
      </div>
    </div>
  );
}
