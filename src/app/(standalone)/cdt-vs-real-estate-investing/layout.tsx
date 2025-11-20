import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CDT vs. inversión inmobiliaria | LOKL",
  description:
    "Compara la seguridad de un CDT con el potencial de crecimiento que obtienes al invertir en bienes raíces con LOKL. Entiende cómo proteger y hacer crecer tu dinero.",
  alternates: {
    canonical: "https://lokl.life/cdt-vs-real-estate-investing",
  },
};

export default function CDTvsRealEstateInvestingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

