"use client";

import Modal from "@/components/Modal/Modal";
import { Atendimentos, CRM } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { GetAllCRM } from "./actions/GetAllCRM";

export default function FeedbackButton() {
  const [showModal, setShowModal] = useState(false);
  const [CRMClientes, setCRMClientes] = useState<CRM[]>();
  const [CRMData, setCRMData] = useState<CRM>({
    id: "",
    nomeCliente: "",
    telefoneCliente: "",
    emailCliente: "",
  });
  const [atendimentoData, setAtendimentoData] = useState<Atendimentos>({
    id: "",
    clienteId: "",
    descricaoAtendimento: "",
    dataAtendimento: new Date(),
    tipoAtendimento: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleOpenModal = async () => {
    const allCRMS = await GetAllCRM();
    if (!allCRMS.success) {
      setCRMClientes([]);
      setShowModal(true);
      return;
    }
    setCRMClientes(allCRMS.allCRM);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAtendimentoData({
      id: "",
      clienteId: "",
      descricaoAtendimento: "",
      dataAtendimento: new Date(),
      tipoAtendimento: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAtendimentoData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAtendimentoData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    let countError = 0;

    if (countError > 0) return;

    console.log(CRMData, atendimentoData);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClient = CRMClientes?.find((crm) => crm.id === e.target.value);

    if (!selectedClient && e.target.value !== "novoCliente") {
      toast.error("Aluno não encontrado");
      return;
    }

    if (e.target.value === "novoCliente") {
      setCRMData({
        id: "",
        nomeCliente: "",
        telefoneCliente: "",
        emailCliente: "",
      });
      return;
    }
    setCRMData({
      id: selectedClient?.id || "",
      nomeCliente: selectedClient?.nomeCliente || "",
      telefoneCliente: selectedClient?.telefoneCliente || "",
      emailCliente: selectedClient?.emailCliente || "",
    });
  };

  return (
    <>
      <button className="btn" onClick={handleOpenModal}>
        Feedback
      </button>
      <Modal onClose={handleCloseModal} show={showModal}>
        <h1 className="text-center font-semibold my-2">Atendimento executado</h1>
        <div className="flex flex-col items-center">
          <select name="students" className="select select-bordered select-primary w-[60%] text-center" value={CRMData?.id} onChange={handleSelectChange}>
            <option value="">Selecione uma opção</option>
            {CRMClientes && CRMClientes.length > 0 ? (
              <>
                <option value="">Selecione um aluno</option>
                {CRMClientes.map((crm) => (
                  <option key={crm.id} value={crm.id}>
                    {crm.nomeCliente}
                  </option>
                ))}
              </>
            ) : (
              <option value="novoCliente">Novo Cliente</option>
            )}
          </select>

          <div id="form">
            <div id="DadosDoClienteCRM">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomeCliente">
                  Nome do Cliente
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nomeCliente"
                  name="nomeCliente"
                  type="text"
                  value={CRMData?.nomeCliente}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailCliente">
                  Email do Cliente
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="emailCliente"
                  name="emailCliente"
                  type="text"
                  value={CRMData?.emailCliente || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefoneCliente">
                  Telefone do cliente
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="telefoneCliente"
                  name="telefoneCliente"
                  type="text"
                  value={CRMData?.telefoneCliente}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div id="DadosDoAtendimento">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Tipo do atendimento</label>
                <div className="flex justify-between">
                  <label>
                    <input type="radio" name="tipoAtendimento" value="Presencial" checked={atendimentoData.tipoAtendimento === "Presencial"} onChange={handleRadioChange} required /> Presencial
                  </label>
                  <label>
                    <input type="radio" name="tipoAtendimento" value="Whatsapp" checked={atendimentoData.tipoAtendimento === "Whatsapp"} onChange={handleRadioChange} /> Whatsapp
                  </label>
                  <label>
                    <input type="radio" name="tipoAtendimento" value="Celular" checked={atendimentoData.tipoAtendimento === "Celular"} onChange={handleRadioChange} /> Celular
                  </label>
                  <label>
                    <input type="radio" name="tipoAtendimento" value="Outro" checked={atendimentoData.tipoAtendimento === "Outro"} onChange={handleRadioChange} /> Outro
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailCliente">
                  Email do Cliente
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="emailCliente"
                  name="emailCliente"
                  type="text"
                  value={CRMData?.emailCliente || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefoneCliente">
                  Telefone do cliente
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="telefoneCliente"
                  name="telefoneCliente"
                  type="text"
                  value={CRMData?.telefoneCliente}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </Modal>
    </>
  );
}
