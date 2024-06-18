import { toast } from "react-toastify";

export function verifyPassword(Senha: string): boolean {
  let isValid = true;

  if (Senha.length < 8) {
    toast.error("A senha deve ter no mínimo 8 caracteres");
    isValid = false;
  }

  if (!Senha.match(/[a-z]/)) {
    toast.error("A senha deve ter no mínimo uma letra minúscula");
    isValid = false;
  }

  if (!Senha.match(/[A-Z]/)) {
    toast.error("A senha deve ter no mínimo uma letra maiúscula");
    isValid = false;
  }

  if (!Senha.match(/[0-9]/)) {
    toast.error("A senha deve ter no mínimo um número");
    isValid = false;
  }

  if (!Senha.match(/[@$!%*?&]/)) {
    toast.error("A senha deve ter no mínimo um caractere especial");
    isValid = false;
  }

  if (Senha.match(/\s/)) {
    toast.error("A senha não pode ter espaços em branco");
    isValid = false;
  }

  return isValid;
}

export default verifyPassword;
