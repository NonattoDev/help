"use client";

import { useState } from "react";
import moment from "moment";
import { PagamentosAluno } from "@prisma/client";

export default function LancarPagamentos() {
  const [pagamento, setPagamento] = useState<PagamentosAluno>({
    id: "",
    alunoId: "",
    codigoIdentificador: "",
    identificacao: "",
    valor: 0,
    mesReferencia: "",
    formaPagamento: "",
    lancadoPor: "",
    dataPagamento: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPagamento((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagamento((prevState) => ({ ...prevState, dataPagamento: new Date(e.target.value) }));
  };

  const handleSubmit = () => {
    console.log(pagamento);
  };

  return (
    <div>
      <h1 className="text-center font-semibold my-2">Lançar Pagamentos</h1>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="codigoIdentificador">
              Código Identificador
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="codigoIdentificador"
              name="codigoIdentificador"
              type="text"
              value={pagamento.codigoIdentificador}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identificacao">
              Identificação
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="identificacao"
              name="identificacao"
              type="text"
              value={pagamento.identificacao}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
              Valor
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="valor"
              name="valor"
              type="number"
              value={pagamento.valor}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mesReferencia">
              Mês de Referência
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mesReferencia"
              name="mesReferencia"
              type="text"
              value={pagamento.mesReferencia}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formaPagamento">
              Forma de Pagamento
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="formaPagamento"
              name="formaPagamento"
              value={pagamento.formaPagamento}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione uma forma de pagamento</option>
              <option value="Pix">Pix</option>
              <option value="Transferencia">Tranferência Bancária</option>
              <option value="Boleto">Boleto</option>
              <option value="Cartão">Cartão</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataPagamento">
              Data de Pagamento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dataPagamento"
              name="dataPagamento"
              type="date"
              value={moment(pagamento.dataPagamento).format("YYYY-MM-DD")}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Enviar Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
