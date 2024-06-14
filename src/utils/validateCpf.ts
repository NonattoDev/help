// utils/validateCpf.ts
import { toast } from "react-toastify";

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11) {
    toast.error("CPF deve conter 11 dígitos");
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    toast.error("CPF não pode conter todos os dígitos iguais");
    return false;
  }

  let add = 0;
  for (let i = 0; i < 9; i++) {
    add += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }

  if (rev !== parseInt(cpf.charAt(9))) {
    toast.error("CPF inválido");
    return false;
  }

  add = 0;
  for (let i = 0; i < 10; i++) {
    add += parseInt(cpf.charAt(i)) * (11 - i);
  }

  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }

  if (rev !== parseInt(cpf.charAt(10))) {
    toast.error("CPF inválido");
    return false;
  }

  return true;
}
