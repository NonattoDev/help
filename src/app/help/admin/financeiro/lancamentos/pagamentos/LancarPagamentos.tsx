"use client";

import { useState } from "react";
import moment from "moment";
import { Aluno, PagamentosAluno } from "@prisma/client";
import { GetAllAlunos } from "./actions/GetAllAlunos";
import { toast } from "react-toastify";
import { CreatePagamento } from "./actions/CreatePagamento";

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export default function LancarPagamentos() {
  const [pagamento, setPagamento] = useState<PagamentosAluno>({
    id: "",
    alunoId: "",
    codigoIdentificador: "",
    observacao: "",
    valor: 0,
    mesReferencia: "",
    anoReferencia: moment().format("YYYY"),
    formaPagamento: "",
    lancadoPor: "",
    dataPagamento: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [isLoadingAluno, setIsLoadingAluno] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "valor") {
      // Remove o que não for número
      setPagamento((prevState) => ({ ...prevState, [name]: Number(value.replace(/\D/g, "")) }));
      return;
    }
    setPagamento((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagamento((prevState) => ({ ...prevState, dataPagamento: new Date(e.target.value) }));
  };

  const handleGetAlunos = async () => {
    if (alunos.length > 0) return;
    setIsLoadingAluno(true);
    const getAlunos = await GetAllAlunos();

    if (!getAlunos.success) {
      setIsLoadingAluno(false);
      return toast.error(getAlunos.message);
    }

    setAlunos(getAlunos.alunos);
    setIsLoadingAluno(false);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    let countError = 0;

    if (pagamento.alunoId === "") {
      toast.error("Selecione um aluno");
      countError++;
    }

    if (pagamento.codigoIdentificador === "") {
      toast.error("Informe o código identificador do pagamento");
      countError++;
    }

    if (pagamento.observacao === "") {
      toast.info("Informe uma observação");
      countError++;
    }

    if (pagamento.valor === 0) {
      toast.error("Informe o valor do pagamento");
      countError++;
    }

    if (pagamento.mesReferencia === "") {
      toast.error("Informe o mês de referência");
      countError++;
    }

    if (pagamento.formaPagamento === "") {
      toast.error("Informe a forma de pagamento");
      countError++;
    }

    if (countError > 0) {
      setIsLoading(false);
      return;
    }

    const insertPagamento = await CreatePagamento(pagamento);

    if (!insertPagamento.success) {
      setIsLoading(false);
      return toast.error(insertPagamento.message);
    }

    toast.success(insertPagamento.message);
    setPagamento({
      id: "",
      alunoId: "",
      codigoIdentificador: "",
      observacao: "",
      valor: 0,
      mesReferencia: "",
      anoReferencia: moment().format("YYYY"),
      formaPagamento: "",
      lancadoPor: "",
      dataPagamento: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setIsLoading(false);
  };

  return (
    <div>
      <h1 className="text-center font-semibold my-2">Lançar Pagamentos</h1>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mesReferencia">
              Aluno
            </label>
            <select
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${isLoadingAluno ? "skeleton" : ""}`}
              id="mesReferencia"
              name="mesReferencia"
              value={pagamento.alunoId}
              onMouseOver={handleGetAlunos}
              onChange={(e) => setPagamento((prevState) => ({ ...prevState, alunoId: e.target.value }))}
              required
            >
              <option value="">{isLoadingAluno ? "Carregando..." : "Selecione um aluno"}</option>
              {alunos &&
                alunos.length > 0 &&
                alunos.map((aluno) => (
                  <option key={aluno.id} value={aluno.id}>
                    {aluno.nome}
                  </option>
                ))}
            </select>
          </div>
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="observacao">
              Observação
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="observacao"
              name="observacao"
              type="text"
              value={pagamento.observacao || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
              Valor do pagamento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="valor"
              name="valor"
              type="text"
              value={pagamento.valor}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mesReferencia">
              Mês de Referência
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mesReferencia"
              name="mesReferencia"
              value={pagamento.mesReferencia}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione um mês</option>
              {meses.map((mes, index) => (
                <option key={index} value={mes}>
                  {mes}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mesReferencia">
              Ano de Referência
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mesReferencia"
              name="mesReferencia"
              type="text"
              value={moment(pagamento.anoReferencia).format("YYYY")}
              required
              readOnly
              disabled
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
