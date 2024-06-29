import prisma from "@/utils/prismaInstance";
import moment from "moment";
import Link from "next/link";
import { BsDatabaseAdd } from "react-icons/bs";
import { CiCircleInfo } from "react-icons/ci";

const GetPagamentos = async () => {
  const pagamentos = await prisma.pagamentosAluno.findMany({
    include: {
      aluno: {
        include: {
          responsavel: true,
          dadosFinanceiro: true,
        },
      },
    },
  });

  return pagamentos;
};

export default async function PagamentosRealizados() {
  const pagamentos = await GetPagamentos();
  return (
    <div>
      <button className="btn tooltip" data-tip="Lançar Pagamento">
        <Link href="/help/admin/financeiro/lancamentos/pagamentos/">
          <BsDatabaseAdd />
        </Link>
      </button>
      <h2 className="text-center font-bold shadow-sm font-2xl my-2">Pagamentos recebidos e lançados</h2>
      <table className="table my-5">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Responsável</th>
            <th>Código Identificador</th>
            <th>Data Pagamento</th>
            <th>Forma Pagamento</th>
            <th>Observação</th>
            <th>Mês Referência</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {pagamentos.map((pagamento) => (
            <tr key={pagamento.id}>
              <td>{pagamento.aluno.nome}</td>
              <td>{pagamento.aluno.responsavel.nome}</td>
              <td>{pagamento.codigoIdentificador}</td>
              <td>{moment(pagamento.dataPagamento).format("DD/MM/YYYY")}</td>
              <td>{pagamento.formaPagamento}</td>
              <td>{pagamento.observacao}</td>
              <td>{pagamento.mesReferencia}</td>
              <td>
                {pagamento.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
