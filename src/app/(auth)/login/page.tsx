import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Iniciar sesión | LOKL Academy",
  description: "Inicia sesión en tu cuenta de LOKL Academy para acceder a todos nuestros cursos y contenidos exclusivos.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
