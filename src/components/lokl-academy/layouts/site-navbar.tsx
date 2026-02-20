"use client";

import React from "react";
import { Navbar } from "@/components/design-system";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";
import { useRouter, usePathname } from "next/navigation";
import { ChartBarDecreasing } from "lucide-react";
import { TopBanner } from "./top-banner";

export function SiteNavbar() {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const goToLogin = () => {
    router.push("https://dashboard.lokl.life/login");
  };

  const goToRegister = () => {
    router.push("https://dashboard.lokl.life/register");
  };

  const goToProfile = () => {
    router.push("https://dashboard.lokl.life/dashboard/perfil");
  };

  return (
    <>
      {pathname === '/' && <TopBanner />}
      <Navbar
        logo={
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/new-home/logo.png"
              alt="LOKL Academy"
              width={150}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </Link>
        }
        items={[
          {
            label: (
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 9.15293C1.5 7.43662 1.5 6.57846 1.8894 5.86706C2.2788 5.15566 2.99021 4.71413 4.41302 3.8311L5.91302 2.90015C7.41704 1.96672 8.16907 1.5 9 1.5C9.83093 1.5 10.5829 1.96672 12.087 2.90015L13.587 3.83109C15.0098 4.71413 15.7212 5.15566 16.1106 5.86706C16.5 6.57846 16.5 7.43662 16.5 9.15293V10.2938C16.5 13.2194 16.5 14.6822 15.6213 15.5911C14.7427 16.5 13.3284 16.5 10.5 16.5H7.5C4.67157 16.5 3.25736 16.5 2.37868 15.5911C1.5 14.6822 1.5 13.2194 1.5 10.2938V9.15293Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M6.75 12C7.38779 12.4727 8.16345 12.75 9 12.75C9.83655 12.75 10.6122 12.4727 11.25 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Proyectos</span>
              </div>
            ),
            href: "/#featured-projects"
          },
          {
            label: (
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.1024 7.20199C15.1024 3.22412 11.7151 0 7.55142 0C3.38755 0.000219432 0 3.24255 0 7.22043C0 8.67746 0.446498 10.0695 1.29494 11.2641L0.0679853 13.5715C-0.0305474 13.7564 -0.0213603 13.9537 0.0923314 14.1306C0.206023 14.3077 0.407682 14.3919 0.625189 14.3919H7.55142C11.7151 14.3919 15.1024 11.1801 15.1024 7.20199ZM2.52281 10.8542C1.69022 9.80271 1.25015 8.54821 1.25015 7.22657C1.25015 3.90721 4.07682 1.20644 7.55119 1.20644C11.0256 1.20644 13.8522 3.82142 13.8522 7.14077C13.8522 10.4603 11.0258 13.0753 7.55119 13.0753H1.64382L2.58114 11.3995C2.68978 11.1959 2.66704 11.0364 2.52281 10.8542ZM19.9321 18.252C20.0306 18.4372 20.0214 18.5978 19.9077 18.7746C19.7941 18.9517 19.5924 19 19.3749 19H12.4489C9.96168 19 7.63433 17.8892 6.22295 15.9282C6.02726 15.6567 6.09938 15.3149 6.38373 15.1279C6.6683 14.9409 7.05738 15.0136 7.25284 15.2852C8.43087 16.922 10.3733 17.9028 12.4489 17.9028H18.356L17.4187 16.1526C17.3103 15.949 17.333 15.7098 17.4773 15.5275C18.3096 14.476 18.7499 13.2243 18.7499 11.9025C18.7499 9.90233 17.7134 8.03913 15.9772 6.91563C15.6913 6.73087 15.6166 6.36025 15.8103 6.08706C16.0036 5.81408 16.3923 5.74277 16.6782 5.92775C18.7582 7.27353 19.9998 9.50801 19.9998 11.9049C19.9998 13.3621 19.5534 14.7511 18.7049 15.9457L19.9321 18.252ZM6.92623 4.18831C6.92623 3.8585 7.20598 3.63973 7.55119 3.63973H10.67C11.015 3.63973 11.295 3.8585 11.295 4.18831C11.295 4.51812 11.015 4.73689 10.67 4.73689H7.55119C7.20598 4.73689 6.92623 4.51812 6.92623 4.18831ZM3.80764 7.04093C3.80764 6.71112 4.08739 6.49235 4.43259 6.49235H10.67C11.015 6.49235 11.295 6.71112 11.295 7.04093C11.295 7.37074 11.015 7.58951 10.67 7.58951H4.43259C4.08739 7.58951 3.80764 7.37074 3.80764 7.04093ZM3.80764 9.89355C3.80764 9.56375 4.08739 9.34497 4.43259 9.34497H10.67C11.015 9.34497 11.295 9.56375 11.295 9.89355C11.295 10.2231 11.015 10.4421 10.67 10.4421H4.43259C4.08739 10.4421 3.80764 10.2231 3.80764 9.89355Z" fill="currentColor" />
                </svg>
                <span>Contáctanos</span>
              </div>
            ),
            href: "https://api.whatsapp.com/send/?phone=573017328112",
            external: true
          },
          {
            label: (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <circle cx="4" cy="14" r="2" fill="currentColor" />
                  <path fill="currentColor" d="M1.22 17.58A2.01 2.01 0 0 0 0 19.43V21h4.5v-1.61c0-.83.23-1.61.63-2.29c-.37-.06-.74-.1-1.13-.1c-.99 0-1.93.21-2.78.58" />
                  <circle cx="20" cy="14" r="2" fill="currentColor" />
                  <path fill="currentColor" d="M22.78 17.58A6.95 6.95 0 0 0 20 17c-.39 0-.76.04-1.13.1c.4.68.63 1.46.63 2.29V21H24v-1.57c0-.81-.48-1.53-1.22-1.85m-6.54-.93c-1.17-.52-2.61-.9-4.24-.9s-3.07.39-4.24.9A2.99 2.99 0 0 0 6 19.39V21h12v-1.61c0-1.18-.68-2.26-1.76-2.74M9 12c0 1.66 1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3" />
                  <path fill="currentColor" d="M2.48 10.86C2.17 10.1 2 9.36 2 8.6C2 6.02 4.02 4 6.6 4c2.68 0 3.82 1.74 5.4 3.59C13.57 5.76 14.7 4 17.4 4C19.98 4 22 6.02 22 8.6c0 .76-.17 1.5-.48 2.26c.65.31 1.18.82 1.53 1.44c.6-1.2.95-2.42.95-3.7C24 4.9 21.1 2 17.4 2c-2.09 0-4.09.97-5.4 2.51C10.69 2.97 8.69 2 6.6 2C2.9 2 0 4.9 0 8.6c0 1.28.35 2.5.96 3.7c.35-.62.88-1.13 1.52-1.44" />
                </svg>
                <span>Nosotros</span>
              </div>
            ),
            href: "https://lokl.life/aboutus"
          },
          {
            label: (
              <div className="flex items-center gap-2">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.55988 3.06219C9.80324 2.47927 11.1967 2.47927 12.44 3.06219L18.2948 5.80706C19.5684 6.40412 19.5684 8.47092 18.2948 9.06797L12.4401 11.8128C11.1968 12.3957 9.80332 12.3957 8.55996 11.8128L2.70515 9.06797C1.43161 8.47088 1.43162 6.40408 2.70515 5.80702L8.55988 3.06219Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M1.75 7.4375V12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16.625 10.0625V14.5472C16.625 15.4292 16.1844 16.255 15.4129 16.6824C14.128 17.3939 12.0715 18.375 10.5 18.375C8.9285 18.375 6.87199 17.3939 5.58716 16.6824C4.81556 16.255 4.375 15.4292 4.375 14.5472V10.0625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Aprende</span>
              </div>
            ),
            dropdown: [
              { label: "Cursos", href: "/course" },
              { label: "Blogs", href: "/blog" },
              { label: "Webinar", href: "/webinar" },
              { label: "Reportes", href: "/reports" }
            ]
          },
          {
            label: (
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 20 20">
                  <path fill="currentColor" d="M6 1a2.75 2.75 0 1 1 0 5.5A2.75 2.75 0 0 1 6 1m0 1a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 6 2m.683 5.5H2.5A1.5 1.5 0 0 0 1 9v.5c0 1.587 1.206 3.212 3.315 3.784c.19-.341.459-.634.781-.853C3.1 12.114 2 10.759 2 9.5V9a.5.5 0 0 1 .5-.5h3.825c.072-.354.194-.69.358-1M10 6.5a2.744 2.744 0 0 0-2.646 2a2.752 2.752 0 0 0 2.26 3.473q.277-.536.661-.995a1.76 1.76 0 0 1-.984-.128a1.75 1.75 0 1 1 2.376-1.065a5.5 5.5 0 0 1 1.083-.5V9.25a2.75 2.75 0 0 0-.629-1.75c-.504-.61-1.267-1-2.121-1m8.677 4.422a5.5 5.5 0 0 0-.78-.748q.102-.336.103-.674V9a.5.5 0 0 0-.5-.5h-3.825a3.7 3.7 0 0 0-.357-1H17.5A1.5 1.5 0 0 1 19 9v.5c0 .48-.11.964-.323 1.422M9.207 13H6.5A1.496 1.496 0 0 0 5 14.5v.5c0 1.971 1.86 4 5 4q.632-.002 1.194-.105a5.5 5.5 0 0 1-.941-.9A6 6 0 0 1 10 18c-2.568 0-4-1.562-4-3v-.5a.5.5 0 0 1 .5-.5h2.522a5.5 5.5 0 0 1 .185-1m7.543-9.25a2.75 2.75 0 1 0-5.5 0a2.75 2.75 0 0 0 5.5 0m-4.5 0a1.75 1.75 0 1 1 3.5 0a1.75 1.75 0 0 1-3.5 0M14.5 19a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m0-7a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 0 1H15v1.5a.5.5 0 0 1-1 0V15h-1.5a.5.5 0 0 1 0-1H14v-1.5a.5.5 0 0 1 .5-.5" />
                </svg>
                <span>Embajadores</span>
              </div>
            ),
            href: "https://lokl.life/ambassadors"
          },
        ]}
        actions={
          user ? (
            <div className="flex items-center gap-4">
              {/* Botón Dashboard */}
              <Link
                href="https://dashboard.lokl.life/dashboard/income"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#F3F3F3] transition-colors"
              >
                <ChartBarDecreasing className="w-5 h-5 text-[#1C274C]" />
                <span className="text-sm font-medium text-foreground hidden lg:block">Dashboard</span>
              </Link>

              {/* Separador vertical */}
              <div className="h-8 w-px bg-gray-300"></div>

              {/* Perfil del usuario */}
              <div
                onClick={goToProfile}
                className="cursor-pointer flex items-center gap-3 pl-4 pr-1 py-1 rounded-full bg-[#E8E8E8] hover:bg-[#DCDCDC] transition-colors"
              >
                <span className="text-sm font-semibold text-foreground">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName || 'Usuario'}
                </span>
                {user?.profilePhoto ? (
                  <Image
                    src={user.profilePhoto}
                    alt={`${user.firstName} ${user.lastName}`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-[3px] border-[#5352F6]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#5352F6] flex items-center justify-center text-white font-semibold border-[3px] border-[#5352F6]">
                    {user?.firstName?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <div
                onClick={() => goToLogin()}
                className="cursor-pointer rounded-full bg-[#ECECFD] hover:bg-[#DCDCFC] flex gap-2 items-center px-4 py-3 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5 8.75C12.433 8.75 14 7.183 14 5.25C14 3.317 12.433 1.75 10.5 1.75C8.567 1.75 7 3.317 7 5.25C7 7.183 8.567 8.75 10.5 8.75Z" stroke="#2724F3" strokeWidth="1.5" />
                  <path d="M10.5 18.375C13.8827 18.375 16.625 16.808 16.625 14.875C16.625 12.942 13.8827 11.375 10.5 11.375C7.11726 11.375 4.375 12.942 4.375 14.875C4.375 16.808 7.11726 18.375 10.5 18.375Z" stroke="#2724F3" strokeWidth="1.5" />
                </svg>
                <span className="text-sm font-semibold text-[#1A17F9] leading-none">Iniciar sesión</span>
              </div>

              <div
                onClick={() => goToRegister()}
                className="cursor-pointer rounded-full bg-[#EBEBEB] hover:bg-[#DCDCDC] flex items-center px-4 py-3 transition-colors"
              >
                <span className="text-sm font-semibold text-foreground leading-none">Regístrate</span>
              </div>
            </div>
          )
        }
      />
    </>
  );
}
