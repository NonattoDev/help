"use client";

import Modal from "@/components/Modal/Modal";
import { Metas } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import { CreateMeta } from "./actions/CreateMeta";

export default function CadastrarMeta() {
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [atualizar, setAtualizar] = useState(false);
  const [meta, setMeta] = useState<Metas>({
    id: "",
    faturamento: 0,
    vendas: 0,
    alunosAtivos: 0,
    mesAno: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleDateChange = (e: any) => {
    const selectedDate = moment(e.target.value).format("YYYY-MM");
    setDate(selectedDate);
    setMeta({ ...meta, mesAno: selectedDate });
  };

  const handleCadastrarMeta = async () => {
    let errors = [];

    // Validação de campos
    if (!meta.mesAno) errors.push("Selecione o mês e ano da meta");
    if (meta.faturamento <= 0) errors.push("Faturamento deve ser maior que 0");
    if (meta.vendas <= 0) errors.push("Vendas deve ser maior que 0");
    if (meta.alunosAtivos <= 0) errors.push("Alunos ativos deve ser maior que 0");

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return;
    }

    const createMeta = await CreateMeta(meta, atualizar);

    if (!createMeta.success) {
      if (createMeta.message === "Meta já cadastrada") {
        const confirmUpdate = window.confirm("Meta já cadastrada, deseja atualizar?");
        if (confirmUpdate) {
          const updateResult = await CreateMeta(meta, true);
          if (updateResult.success) {
            toast.success(updateResult.message);
          } else {
            toast.error(updateResult.message);
          }
        }
        return;
      }
      toast.error(createMeta.message);
      return;
    }

    toast.success(createMeta.message);
    setShowModal(false);
    setAtualizar(false);
    setMeta({
      id: "",
      faturamento: 0,
      vendas: 0,
      alunosAtivos: 0,
      mesAno: moment().format("YYYY-MM"),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const handleChangeCurrency = (e: any) => {
    const { name, value } = e.target;

    // name for Vendas, aceita apenas números sem vírgula
    if (name === "vendas" || name === "alunosAtivos") {
      if (!/^\d*$/.test(value)) return;

      setMeta((prevMeta) => ({ ...prevMeta, [name]: value }));
      return;
    }

    // Para outros campos, permite apenas números e vírgula
    if (!/^\d*,?\d*$/.test(value)) return;
    setMeta((prevMeta) => ({ ...prevMeta, [name]: value }));
  };

  const handleShowModal = () => {
    setShowModal(false);
    setMeta({
      id: "",
      faturamento: 0,
      vendas: 0,
      alunosAtivos: 0,
      mesAno: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return (
    <div>
      <button className="btn" onClick={() => setShowModal(true)}>
        Adicionar meta
      </button>
      <Modal onClose={handleShowModal} show={showModal}>
        <div className="flex flex-col items-center">
          <h2 className="text-md font-semibold mb-4">Cadastrar uma meta</h2>

          <label className="label-text">Selecione o mes e ano da meta</label>
          <input type="date" name="date" id="date" onChange={handleDateChange} value={moment(date, "YYYY-MM").format("YYYY-MM-DD")} className="input input-bordered mb-4" />

          <label className="label-text">Faturamento</label>
          <input type="text" name="faturamento" className="input input-bordered mb-4" value={meta.faturamento} onChange={handleChangeCurrency} />

          <label className="label-text">Vendas</label>
          <input type="text" name="vendas" className="input input-bordered mb-4" value={meta.vendas} onChange={handleChangeCurrency} />

          <label className="label-text">Alunos ativos</label>
          <input type="text" name="alunosAtivos" className="input input-bordered mb-4" value={meta.alunosAtivos} onChange={handleChangeCurrency} />

          <button className="btn my-2" onClick={handleCadastrarMeta}>
            Cadastrar meta
          </button>
        </div>
      </Modal>
    </div>
  );
}
