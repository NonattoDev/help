import { Metadata } from "next";
import { Suspense } from "react";
import PainelDashboard from "./PainelDashboard";

export const metadata: Metadata = {
  title: "Help - Dashboard",
};

function LoadingFallback() {
  return <div className="skeleton w-full h-96"></div>;
}

export default async function AdministrativoPage() {
  return <PainelDashboard />;
}
