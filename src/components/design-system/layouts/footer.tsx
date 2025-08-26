import React from "react";
import { cn } from "@/lib/utils";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  variant?: "default" | "simple";
}

export function Footer({
  className,
  logo,
  variant = "default",
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-black text-white",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4 py-12">
        {variant === "default" ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-6">{logo || <span className="text-2xl font-bold">LOKL</span>}</div>
              <p className="mb-4 text-sm text-gray-300">
                Plataforma de inversión inmobiliaria para las nuevas generaciones
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold">Sobre LOKL</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Quiénes somos</a></li>
                <li><a href="#" className="hover:text-white">Proyectos</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Prensa</a></li>
                <li><a href="#" className="hover:text-white">Trabaja con nosotros</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold">Recursos</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Centro de ayuda</a></li>
                <li><a href="#" className="hover:text-white">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-white">Política de privacidad</a></li>
                <li><a href="#" className="hover:text-white">Seguridad</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
              <p className="mb-4 text-sm text-gray-300">
                Suscríbete para recibir noticias y actualizaciones
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="w-full rounded-l-md border-0 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5352F6]"
                />
                <button className="rounded-r-md bg-[#5352F6] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div>{logo || <span className="text-2xl font-bold">LOKL</span>}</div>
            <div className="flex space-x-4 text-sm text-gray-300">
              <a href="#" className="hover:text-white">Términos</a>
              <a href="#" className="hover:text-white">Privacidad</a>
              <a href="#" className="hover:text-white">Cookies</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        )}
        
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} LOKL. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
