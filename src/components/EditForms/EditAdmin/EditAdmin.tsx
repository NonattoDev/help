"use client";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
import ReactInputMask from "react-input-mask";
import { validateCPF } from "@/utils/validateCpf";
import verifyPassword from "@/utils/VerifyPassword";
import moment from "moment";
import { FinanceiroUsuarios, Usuarios } from "@prisma/client";

export default function EditAdmin({ userData, accessLevel }: { userData: Usuarios & { financeiro: FinanceiroUsuarios }; accessLevel?: string | undefined }) {
  const [formData, setFormData] = React.useState<Usuarios>(userData);
  const [financeiro, setFinanceiro] = React.useState<FinanceiroUsuarios>(userData.financeiro);

  // Logica de confirmacao de senha
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "password" && formData.password !== userData.password) {
      setShowConfirmPassword(true);
    }
  };

  const handleFinanceiroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFinanceiro((prev) => ({
      ...prev,
      [name]: name === "valor" ? parseFloat(value) : value,
    }));
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errorCount = 0;

    if (!validateCPF(formData.cpf)) errorCount++;

    if (formData.password !== userData.password && formData.password !== confirmPassword) {
      toast.error("Senhas não coincidem");
      errorCount = errorCount + 1;
    } else {
      if (!verifyPassword(formData.password)) errorCount++;
    }

    if (errorCount > 0) return;
    try {
      const response = await axios.put(`/help/config/${formData.id}/meuperfil/editar`, {
        formData: {
          ...formData,
          financeiro,
        },
        senhaAntiga: userData.password,
        typeEdit: "admin",
      });
      if (response.status === 200) {
        toast.success("Dados atualizados com sucesso");
      } else {
        toast.error("Erro ao atualizar dados");
      }
    } catch (error) {
      toast.error("Erro no servidor");
    }
  };

  return (
    <div>
      <form onSubmit={submitEdit}>
        <h2 className="block text-gray-700 text-2xl text-center font-bold my-4">Dados do Colaborador</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nome</span>
            </label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">CPF</span>
            </label>
            <ReactInputMask
              mask={"999.999.999-99"}
              maskPlaceholder={null}
              alwaysShowMask={false}
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Data de Nascimento</span>
            </label>
            <input type="date" name="data_nascimento" value={moment(formData.data_nascimento).format("YYYY-MM-DD")} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Telefone</span>
            </label>
            <ReactInputMask
              mask="(99) 99999-9999"
              alwaysShowMask={false}
              maskPlaceholder={null}
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Cargo</span>
            </label>
            <input disabled={formData.cargo !== "CEO"} type="text" name="cargo" value={formData.cargo} onChange={handleChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Senha</span>
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="input input-bordered" required />
          </div>
          {showConfirmPassword && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirmar Senha</span>
              </label>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input input-bordered" required />
            </div>
          )}
        </div>

        <h2 className="block text-gray-700 text-2xl text-center font-bold my-4">Dados Financeiros</h2>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Remuneração</label>
            <input disabled={!accessLevel?.startsWith("admin")} type="text" name="valor" className="input input-md input-bordered w-full" value={financeiro.valor} onChange={handleFinanceiroChange} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Dia de pagamento</label>
            <input
              disabled={!accessLevel?.startsWith("admin")}
              type="text"
              name="diaPagamento"
              className="input input-md input-bordered w-full"
              value={financeiro.diaPagamento}
              onChange={handleFinanceiroChange}
            />
          </div>
        </div>

        <button className="btn btn-primary mt-5 w-full">Salvar</button>
      </form>
    </div>
  );
}
