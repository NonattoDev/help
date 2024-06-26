import { Metadata } from "next";
import PainelDashboard from "./PainelDashboard";

export const metadata: Metadata = {
  title: "Help - Dashboard",
};

export default async function AdministrativoPage() {
  return <PainelDashboard />;
}
