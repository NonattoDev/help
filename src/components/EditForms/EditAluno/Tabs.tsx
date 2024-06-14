"use client";

import React from "react";

const Tabs: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  return (
    <div role="tablist" className="tabs tabs-boxed">
      <a role="tab" className={`tab ${activeTab === "dadosPessoais" ? "tab-active" : ""}`} onClick={() => setActiveTab("dadosPessoais")}>
        Dados do Aluno
      </a>
      <a role="tab" className={`tab ${activeTab === "dadosResponsaveis" ? "tab-active" : ""}`} onClick={() => setActiveTab("dadosResponsaveis")}>
        Dados do Responsável
      </a>
    </div>
  );
};

export default Tabs;
