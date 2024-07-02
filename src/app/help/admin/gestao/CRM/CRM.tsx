"use client";

import useSWR from "swr";
import { GetAllCRM } from "./actions/GetAllCRM";
import { useState } from "react";
import Modal from "@/components/Modal/Modal";
import { Atendimentos, CRM } from "@prisma/client";
import moment from "moment";

export default function CRMApp({ date }: { date: string }) {
  const { data, error, isLoading } = useSWR(["GetAllCRM", date], () => GetAllCRM(date));

  const [showModal, setShowModal] = useState(false);
  const [selectedCRM, setSelectedCRM] = useState<Atendimentos[]>();

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCRM(undefined);
  };

  const handleOpenModal = (crm: CRM & { atendimentos: Atendimentos[] }) => {
    setSelectedCRM(crm.atendimentos);
    setShowModal(true);
  };

  if (isLoading) return <div className="w-full h-22 skeleton text-center">Carregando...</div>;
  if (error) {
    console.log(error);
    return <div className="w-full h-22 text-center">Erro ao buscar CRM</div>;
  }

  const allCRM = data?.allCRM;

  return (
    <>
      <div>
        <h2>Pagina de CRM</h2>
        {allCRM && allCRM.length > 0 ? (
          allCRM.map((crm) => (
            <div key={crm.id}>
              <h3>{crm.id}</h3>
              <p>{crm.nomeCliente}</p>
              <p>{crm.emailCliente}</p>
              <p>{crm.telefoneCliente ? crm.telefoneCliente : ""}</p>
              <button onClick={() => handleOpenModal(crm)}>Ver atendimentos</button>
            </div>
          ))
        ) : (
          <div>Nenhum CRM encontrado</div>
        )}
      </div>
      {showModal && selectedCRM && (
        <Modal show={showModal} onClose={handleCloseModal}>
          {selectedCRM.map((atendimento) => (
            <div key={atendimento.id}>
              <h3>{atendimento.id}</h3>
              <p>{moment(atendimento.dataAtendimento).format("DD/MM/YYYY")}</p>
              <p>{atendimento.tipoAtendimento}</p>
              <p>{atendimento.descricaoAtendimento}</p>
            </div>
          ))}
        </Modal>
      )}
    </>
  );
}
