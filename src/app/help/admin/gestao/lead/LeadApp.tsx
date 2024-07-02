"use client";

import useSWR from "swr";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { Atendimentos, Lead } from "@prisma/client";
import moment from "moment";
import { GetAllLead } from "./actions/GetAllLead";

export default function LeadApp({ date }: { date: string }) {
  const { data, error, isLoading } = useSWR(["GetAllLead", date], () => GetAllLead(date));
  const [selectedLead, setSelectedLead] = useState<Atendimentos[]>();
  const [showModalVerAtendimentos, setShowModalVerAtendimentos] = useState(false);
  const [showModalNewAtendimento, setShowModalNewAtendimento] = useState(false);

  const handleCloseModal = () => {
    setShowModalNewAtendimento(false);
    setShowModalVerAtendimentos(false);
    setSelectedLead(undefined);
  };

  const handleVerAtendimentos = (Lead: Lead & { atendimentos: Atendimentos[] }) => {
    setSelectedLead(Lead.atendimentos);
    setShowModalVerAtendimentos(true);
  };

  const handleOpenModalNewAtendimento = (Lead: Lead & { atendimentos: Atendimentos[] }) => {
    setSelectedLead(Lead.atendimentos);
    setShowModalNewAtendimento(true);
  };

  const [atendimentoData, setAtendimentoData] = useState<Atendimentos>({
    id: "",
    clienteId: "",
    descricaoAtendimento: "",
    dataAtendimento: new Date(),
    tipoAtendimento: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  if (isLoading) return <div className="w-full h-22 skeleton text-center">Carregando...</div>;
  if (error) {
    console.log(error);
    return <div className="w-full h-22 text-center">Erro ao buscar Lead</div>;
  }

  const allLead = data?.allLeads;

  return (
    <>
      <div>
        <h2>Pagina de Lead</h2>
        {allLead && allLead.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Cliente</th>
                <th>Email do Cliente</th>
                <th>Telefone do Cliente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {allLead.map((Lead) => (
                <tr key={Lead.id}>
                  <td>{Lead.id}</td>
                  <td>{Lead.nomeCliente}</td>
                  <td>{Lead.emailCliente}</td>
                  <td>{Lead.telefoneCliente ? Lead.telefoneCliente : ""}</td>
                  <td>
                    <button onClick={() => handleVerAtendimentos(Lead)}>Ver atendimentos</button>
                    <button onClick={() => handleOpenModalNewAtendimento(Lead)}>Novo contato</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Nenhum lead encontrado</div>
        )}
      </div>
      {showModalVerAtendimentos && selectedLead && (
        <Modal show={showModalVerAtendimentos} onClose={handleCloseModal}>
          {selectedLead.map((atendimento) => (
            <div key={atendimento.id}>
              <h3>{atendimento.id}</h3>
              <p>{moment(atendimento.dataAtendimento).format("DD/MM/YYYY")}</p>
              <p>{atendimento.tipoAtendimento}</p>
              <p>{atendimento.descricaoAtendimento}</p>
            </div>
          ))}
        </Modal>
      )}
      {showModalNewAtendimento && selectedLead && (
        <Modal show={showModalNewAtendimento} onClose={handleCloseModal}>
          <div></div>
        </Modal>
      )}
    </>
  );
}
