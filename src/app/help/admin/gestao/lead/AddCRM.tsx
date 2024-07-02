"use client";

import Modal from "@/components/Modal/Modal";
import { Atendimentos, Lead } from "@prisma/client";
import { useState } from "react";
import { toast } from "react-toastify";
import { GetAllLead } from "./actions/GetAllLead";
import moment from "moment";
import { CreateNewLead } from "./actions/CreateNewLead";

export default function AddLead() {
  const [showModal, setShowModal] = useState(false);
  const [LeadClientes, setLeadClientes] = useState<Lead[]>();
  const [leadData, setLeadData] = useState<Lead>({
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
    const allLeadS = await GetAllLead();
    if (!allLeadS.success) {
      setLeadClientes([]);
      setShowModal(true);
      return;
    }
    setLeadClientes(allLeadS.allLeads);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAtendimentoData({
      id: "",
      clienteId: "",
      descricaoAtendimento: "",
      dataAtendimento: moment().toDate(),
      tipoAtendimento: "",
      createdAt: moment().toDate(),
      updatedAt: moment().toDate(),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "nomeCliente" || name === "telefoneCliente" || name === "emailCliente") {
      setLeadData((prevState) => ({ ...prevState, [name]: value }));
      return;
    }

    setAtendimentoData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAtendimentoData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    let countError = 0;

    if (countError > 0) return;

    const createLead = await CreateNewLead(leadData, atendimentoData);

    if (createLead && createLead.success) {
      toast.success(createLead.message);
      handleCloseModal();
      return;
    }

    toast.error(createLead?.message);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAtendimentoData((prevState) => ({ ...prevState, [name]: moment(value).toDate() }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClient = LeadClientes?.find((Lead) => Lead.id === e.target.value);

    if (!selectedClient && e.target.value !== "novoCliente") {
      toast.error("Aluno não encontrado");
      return;
    }

    if (e.target.value === "novoCliente") {
      setLeadData({
        id: "novoCliente",
        nomeCliente: "",
        telefoneCliente: "",
        emailCliente: "",
      });
      return;
    }
    setLeadData({
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
          <select name="students" className="select select-bordered select-primary w-[60%] text-center" value={leadData?.id} onChange={handleSelectChange}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="novoCliente">Novo Cliente</option>
            {LeadClientes && LeadClientes.length > 0 && (
              <>
                {LeadClientes.map((Lead) => (
                  <option key={Lead.id} value={Lead.id}>
                    {Lead.nomeCliente}
                  </option>
                ))}
              </>
            )}
          </select>

          <div id="form">
            <div id="DadosDoClienteLead">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomeCliente">
                  Nome do Cliente
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="nomeCliente"
                  name="nomeCliente"
                  type="text"
                  value={leadData?.nomeCliente}
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
                  value={leadData?.emailCliente || ""}
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
                  value={leadData?.telefoneCliente}
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
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricaoAtendimento">
                  Como foi o atendimento ?
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="descricaoAtendimento"
                  name="descricaoAtendimento"
                  type="text"
                  value={atendimentoData?.descricaoAtendimento || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataAtendimento">
                  Data do atendimento
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="dataAtendimento"
                  name="dataAtendimento"
                  type="text"
                  value={moment(atendimentoData?.dataAtendimento).format("DD/MM/YYYY")}
                  onChange={handleDateChange}
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
