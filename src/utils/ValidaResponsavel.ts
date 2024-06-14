import Responsavel from "@/Interfaces/Responsavel";
import { toast } from "react-toastify";

export function validaResponsavel(responsavelData: Responsavel): boolean {
  let isValid = true;

  if (!responsavelData.nome) {
    toast.error("O nome do responsável é obrigatório");
    isValid = false;
  }

  if (!responsavelData.email) {
    toast.error("O email do responsável é obrigatório");
    isValid = false;
  }

  if (!responsavelData.telefone) {
    toast.error("O telefone do responsável é obrigatório");
    isValid = false;
  }

  if (!responsavelData.endereco.rua) {
    toast.error("A rua do endereço do responsável é obrigatória");
    isValid = false;
  }

  if (!responsavelData.endereco.numero) {
    toast.error("O número do endereço do responsável é obrigatório");
    isValid = false;
  }

  if (!responsavelData.endereco.bairro) {
    toast.error("O bairro do endereço do responsável é obrigatório");
    isValid = false;
  }

  if (!responsavelData.endereco.cidade) {
    toast.error("A cidade do endereço do responsável é obrigatória");
    isValid = false;
  }

  if (!responsavelData.endereco.estado) {
    toast.error("O estado do endereço do responsável é obrigatório");
    isValid = false;
  }

  if (!responsavelData.endereco.cep) {
    toast.error("O CEP do endereço do responsável é obrigatório");
    isValid = false;
  }

  return isValid;
}

export default validaResponsavel;
