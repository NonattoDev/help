import prisma from "../../../../../prisma/prismaInstance";

const getDadosFinancas = async () => {
  // Verifica no banco de agendamentos de aulas no momento que entrar na página, as aulas que já aconteceram e não foram pagas
  const contasPagar = await prisma.financeiro.findMany();
};

export default async function FinanceiroPage() {
  return (
    <div>
      <h1>Financeiro works!!</h1>
    </div>
  );
}
