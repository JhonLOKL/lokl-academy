import RegisterForm from "@/components/auth/register-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Registro | LOKL Academy",
  description: "Crea una cuenta en LOKL Academy y comienza tu camino en el mundo de las inversiones inmobiliarias.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}
