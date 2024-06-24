import prisma from "@/utils/prismaInstance";
import RedefineSenha from "./RedefineSenha";
import Link from "next/link";

const verifyToken = async (token: string) => {
  const tokenIsValid = await prisma.tokenRecuperacao.findFirst({
    where: {
      token,
      validoAte: {
        gte: new Date(),
      },
      utilizado: false,
    },
  });

  return tokenIsValid ? tokenIsValid : false;
};

export default async function ForgotPassword({ params }: { params: { token: string } }) {
  const token = params.token;
  const tokenIsValid = await verifyToken(token);

  return (
    <div>
      {tokenIsValid ? (
        <RedefineSenha email={tokenIsValid.email} />
      ) : (
        <div className="flex flex-col items-center">
          <h1>Token inválido</h1>
          <p>Este token de recuperação de senha é inválido ou já foi utilizado.</p>
          <Link className="text-green-600" href="/">Clique aqui para solicitar um novo token</Link>
        </div>
      )}
    </div>
  );
}
