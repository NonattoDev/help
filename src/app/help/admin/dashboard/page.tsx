import CardAlunosAlert from "@/components/Admin/Dashboard/CardAlunosAlert";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Help - Dashboard",
};

function LoadingFallback() {
  return <div className="skeleton w-full h-96"></div>;
}

export default async function AdministrativoPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <h1 className="text-center font-bold text-2xl ">Dashboard</h1>
      <CardAlunosAlert />
    </Suspense>
  );
}
