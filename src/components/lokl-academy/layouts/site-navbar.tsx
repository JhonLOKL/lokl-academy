"use client";

import React from "react";
import { Navbar } from "@/components/design-system";
import Link from "next/link";
import { useAuthStore } from "@/store/auth-store";
import dynamic from "next/dynamic";

// Importar dinámicamente para evitar errores de hidratación
const UserProfileWidget = dynamic(
  () => import("@/components/auth/auth-nav"),
  { ssr: false }
);

export function SiteNavbar() {
  const { token } = useAuthStore();
  
  return (
    <Navbar
      logo={
        <Link href="/" className="text-xl font-bold hover:text-[#5352F6]">
          LOKL <span className="text-[#5352F6]">Academy</span>
        </Link>
      }
      items={[
        { label: "Inicio", href: "/" },
        /*  { label: "Cursos", href: "#courses" }, */
        { label: "Blogs", href: "/blog" },
        /*      { label: "Podcasts", href: "#podcasts" }, */
        { label: "FAQ", href: "#faq" },
        { label: "Cursos", href: "/course" },
        { label: "Webinar", href: "/webinar" },
      ]}
      actions={
        token ? (
          <UserProfileWidget />
        ) : (
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#0F0F0F] transition-colors hover:text-[#5352F6]"
            >
              Inicia sesión
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-[#5352F6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4A4AE5]"
            >
              Regístrate
            </Link>
          </div>
        )
      }
    />
  );
}


