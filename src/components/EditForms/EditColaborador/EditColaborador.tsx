"use client";

import LoadingButton from "@/components/Buttons/LoadingButton";
import { UpdateColaborador } from "@/server/actions/UpdateColaborador";
import verifyPassword from "@/utils/VerifyPassword";
import { validateCPF } from "@/utils/validateCpf";
import { Usuarios, FinanceiroUsuarios } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";

interface EditColaboradorProps {
  colaborador: Usuarios & { financeiro: FinanceiroUsuarios };
  accessLevel: string;
}

const formatCurrency = (value: string | number): string => {
  if (typeof value === "number") {
    value = value.toString();
  }
  const numberValue = parseFloat(value.replace(/[^\d]/g, "")) / 100;
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const getNumericValue = (formattedValue: string): number => {
  return parseFloat(formattedValue.replace(/[^\d]/g, "")) / 100;
};

export default function EditColaborador({ colaborador, accessLevel }: EditColaboradorProps) {
  const [formData, setFormData] = useState({
    ...colaborador,
    financeiro: {
      ...colaborador.financeiro,
      valor: formatCurrency(colaborador.financeiro.valor),
    },
  });
  const [loading, setLoading] = useState(false);

  // Logica de confirmacao de senha
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name.startsWith("financeiro")) {
      const financeiroKey = name.split(".")[1] as keyof FinanceiroUsuarios;
      setFormData({
        ...formData,
        financeiro: {
          ...formData.financeiro,
          [financeiroKey]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });

      if (name === "password" && formData.password !== colaborador.password) {
        setShowConfirmPassword(true);
      }
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, data_nascimento: moment(value).toDate() });
  };

  const handleFinanceiroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      financeiro: {
        ...formData.financeiro,
        valor: formatCurrency(value),
      },
    });
  };

  const submitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let errorCount = 0;

    if (!validateCPF(formData.cpf)) {
      errorCount = errorCount + 1;
    }

    if (formData.password !== colaborador.password && formData.password !== confirmPassword) {
      toast.error("Senhas não coincidem");
      errorCount = errorCount + 1;
    } else {
      if (!verifyPassword(formData.password)) errorCount++;
    }

    if (errorCount > 0) {
      setLoading(false);
      return;
    }

    try {
      // Server Action: UpdateColaborador
      const updateColaborador = await UpdateColaborador(
        {
          ...formData,
          financeiro: {
            ...formData.financeiro,
            valor: getNumericValue(formData.financeiro.valor),
          },
        },
        colaborador.password
      );

      if (updateColaborador.success) {
        toast.success(updateColaborador.message);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(updateColaborador.message);
      }
    } catch (error) {
      toast.error("Erro no servidor");
    }
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, ativo: e.target.checked });
  };

  return (
    <div>
      <form onSubmit={submitEdit}>
        <h2 className="text-md text-center font-bold mb-5 ">Dados Pessoais</h2>
        <div className="w-24 mr-5">
          {accessLevel?.startsWith("admin") && (
            <label className="cursor-pointer label gap-2">
              <input type="checkbox" name="ativo" checked={formData.ativo} onChange={handleToggleChange} className="toggle toggle-info" />
              <span className="label-text">{formData.ativo ? "Ativo" : "Desativado"}</span>
            </label>
          )}
        </div>

        <div id="dadosPessoais" className="grid grid-cols-4 gap-4">
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
              disabled={accessLevel !== "administrador"}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Data de Nascimento</span>
            </label>
            <input type="date" name="data_nascimento" value={moment(formData.data_nascimento).format("YYYY-MM-DD")} onChange={handleDateChange} className="input input-bordered" required />
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

        <h2 className="text-md text-center font-bold my-6 ">Dados Financeiros</h2>
        <div id="financeiro" className="grid grid-cols-4 gap-4 my-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Remuneração</span>
            </label>
            <input type="text" name="financeiro.valor" value={formData.financeiro.valor} onChange={handleFinanceiroChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Dia de Pagamento</span>
            </label>
            <input type="text" name="financeiro.diaPagamento" value={formData.financeiro.diaPagamento} onChange={handleChange} className="input input-bordered" required />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          {loading ? (
            <LoadingButton />
          ) : (
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
