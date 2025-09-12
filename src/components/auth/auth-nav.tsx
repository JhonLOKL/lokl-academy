"use client";

import { useAuthStore } from "@/store/auth-store";
import Link from "next/link";
import { Button } from "@/components/design-system";
import { useRouter } from "next/navigation";

export default function AuthNav() {
  const { user, token, logout } = useAuthStore();
  const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  return (
    <div className="flex items-center gap-4">
      {token ? (
        <>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-sm">
              Mi cuenta
            </Button>
          </Link>
          <Button variant="secondary" onClick={handleLogout} className="text-sm">
            Cerrar sesión
          </Button>
        </>
      ) : (
        <>
          <Link href="/login">
            <Button variant="ghost" className="text-sm">
              Iniciar sesión
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" className="text-sm">
              Registrarse
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
