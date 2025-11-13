"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Phone,
  Mail,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeToNewsletterAction } from "@/actions/newsletter-actions";

type NewsletterStatus = {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
};

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/lokl.life/",
    label: "Instagram de LOKL",
    iconSrc: "/images/footer/instagram.svg",
  },
  {
    href: "https://www.facebook.com/lokl.life",
    label: "Facebook de LOKL",
    iconSrc: "/images/footer/facebook.svg",
  },
  {
    href: "https://twitter.com/LoklLife",
    label: "X (Twitter) de LOKL",
    iconSrc: "/images/footer/twitter.svg",
  },
  {
    href: "https://www.youtube.com/channel/UCeoyCXhjNYWcqssgeW46Bsg",
    label: "YouTube de LOKL",
    iconSrc: "/images/footer/youtube.svg",
  },
  {
    href: "https://www.linkedin.com/company/lokllife/",
    label: "LinkedIn de LOKL",
    iconSrc: "/images/footer/linkedin-white.svg",
  },
];

const PAYMENT_ICONS = [
  {
    src: "/images/footer/Visa.svg",
    label: "Pagos con Visa",
  },
  {
    src: "/images/footer/Mastercard.svg",
    label: "Pagos con Mastercard",
  },
  {
    src: "/images/footer/DinersClub.svg",
    label: "Pagos con Diners Club",
  },
  {
    src: "/images/footer/bancolombia-white-icon.svg",
    label: "Pagos con Bancolombia",
  },
  {
    src: "/images/footer/pse.svg",
    label: "Pagos mediante PSE",
  },
];

export function MarketingFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterStatus>({ type: "idle" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setStatus({
        type: "error",
        message: "Por favor ingresa un correo electrónico válido.",
      });
      return;
    }

    try {
      setStatus({ type: "loading" });
      await subscribeToNewsletterAction(email);
      setEmail("");
      setStatus({
        type: "success",
        message: "¡Gracias por suscribirte!",
      });
    } catch (error) {
      console.error("Error al suscribirse al newsletter", error);
      setStatus({
        type: "error",
        message: "No pudimos procesar tu suscripción. Intenta nuevamente.",
      });
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/footer/lokl-white.svg"
                alt="Logo de LOKL"
                width={120}
                height={48}
                priority={false}
                className="h-auto w-32"
              />
            </div>
            <p className="text-sm text-white/70">
              Sé parte de una comunidad, crece tu patrimonio y construye tu
              futuro con inversiones inmobiliarias accesibles.
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL_LINKS.map(({ href, label, iconSrc }) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-white hover:bg-white/20"
                >
                  <Image
                    src={iconSrc}
                    alt={label}
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sobre LOKL</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/blog" className="hover:text-white">
                  Academia LOKL
                </Link>
              </li>
              <li>
                <Link href="/#pqrs" className="hover:text-white">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href="https://drive.google.com/file/d/1R6aOvsRjYVo-d398PskWJjwL4_WrY9PP/view?usp=drive_link"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Nosotros</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link
                  href="https://api.whatsapp.com/send/?phone=573017328112"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Habla con nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/company/lokllife/jobs/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white"
                >
                  Trabaja con nosotros
                </Link>
              </li>
              <li className="inline-flex items-center gap-2 text-white/70">
                <Mail className="h-4 w-4" />
                digital@lokl.life
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-white/70">
              Suscríbete y recibe tendencias, guías y nuevas oportunidades de
              inversión.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="tu.email@ejemplo.com"
                autoComplete="email"
                className="border-white/10 bg-white/10 text-white placeholder:text-white/50 focus:border-white focus:bg-white/15 focus-visible:ring-white/30"
                aria-label="Correo electrónico para suscribirse al newsletter"
                disabled={status.type === "loading"}
                required
              />
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90"
                disabled={status.type === "loading"}
              >
                {status.type === "loading" ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Suscribiendo...
                  </span>
                ) : (
                  "Suscribirme"
                )}
              </Button>
            </form>
            {status.type === "success" && status.message && (
              <p className="flex items-center gap-2 text-sm text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                {status.message}
              </p>
            )}
            {status.type === "error" && status.message && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertTriangle className="h-4 w-4" />
                {status.message}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-sm text-white/60">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p>©TodoslosderechosreservadosLOKL.LIFE</p>
            <div className="flex flex-wrap items-center gap-4 text-white/60">
              {PAYMENT_ICONS.map(({ src, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-3 py-2"
                >
                  <Image
                    src={src}
                    alt={label}
                    width={64}
                    height={32}
                    className="h-6 w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MarketingFooter;

