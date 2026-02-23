"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";
import { consumePostLoginRedirect, setPostLoginRedirect } from "@/lib/auth-utils";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  CardTitle, 
  CardDescription 
} from "@/components/design-system";
import { Button } from "@/components/design-system";
import { Input } from "@/components/design-system";
import { FormField } from "@/components/design-system";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/design-system";
import { Checkbox } from "@/components/design-system";
import { H2, Paragraph, Text } from "@/components/design-system";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/design-system";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/design-system";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { countryCodes } from "@/lib/country-codes";
import { Eye, EyeOff, Check, ChevronsUpDown } from "lucide-react";

interface WindowWithDataLayer extends Window {
  dataLayer: Record<string, unknown>[];
}

// Opciones para "¿Cómo nos conociste?"
const referralOptions = [
  { value: "social_media", label: "Redes sociales" },
  { value: "friends", label: "Amigos" },
  { value: "events", label: "Eventos" },
  { value: "search", label: "Búsqueda en internet" },
  { value: "ads", label: "Publicidad" },
  { value: "other", label: "Otro" }
];

// Componente para seleccionar el código de país y teléfono
const PhoneInput = ({ 
  countryIso, 
  setCountryIso, 
  phone, 
  setPhone, 
  error 
}: { 
  countryIso: string; 
  setCountryIso: (iso: string) => void; 
  phone: string; 
  setPhone: (phone: string) => void; 
  error?: string;
}) => {
  const [open, setOpen] = useState(false);
  const selectedCountry = countryCodes.find((c) => c.country === countryIso);

  return (
    <div className="grid grid-cols-[140px_1fr] gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between px-3 font-normal"
          >
            {selectedCountry ? (
               <span className="truncate flex items-center">
                {selectedCountry.code} <span className="ml-1 text-xs text-muted-foreground hidden sm:inline">{selectedCountry.country}</span>
               </span>
            ) : (
              "Código"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Buscar país o código..." />
            <CommandList>
              <CommandEmpty>No se encontró el país.</CommandEmpty>
              <CommandGroup>
                {countryCodes.map((country) => (
                  <CommandItem
                    key={`${country.country}-${country.code}`}
                    value={`${country.name} ${country.code}`} 
                    onSelect={() => {
                      setCountryIso(country.country);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        countryIso === country.country ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span className="mr-2 font-medium">{country.code}</span>
                    <span className="truncate text-muted-foreground">{country.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Input 
        type="tel" 
        placeholder="Número de teléfono" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      {error && <p className="col-span-2 text-sm text-[#FF3B30]">{error}</p>}
    </div>
  );
};

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigatedRef = useRef(false);
  const { register, error, isLoading, clearError, token, user } = useAuthStore();

  // Imágenes para el hero móvil
  const mobileHeroImages = [
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/Hero-indie-movil.png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/Hero-nido-movil.png"
  ];

  // Imágenes para el hero desktop
  const desktopHeroImages = [
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_ALDEA.png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_INDIE.png",
    "https://lokl-assets.s3.us-east-1.amazonaws.com/home/HeroLoklPage/IMG_NDA.png"
  ];

  // Estados para controlar los índices de imágenes
  const [currentMobileImageIndex, setCurrentMobileImageIndex] = useState(0);
  const [currentDesktopImageIndex, setCurrentDesktopImageIndex] = useState(0);

  // Rotación automática de imágenes móviles cada 5 segundos
  useEffect(() => {
    if (mobileHeroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentMobileImageIndex(
        (prev) => (prev + 1) % mobileHeroImages.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [mobileHeroImages.length]);

  // Rotación automática de imágenes desktop cada 5 segundos
  useEffect(() => {
    if (desktopHeroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentDesktopImageIndex(
        (prev) => (prev + 1) % desktopHeroImages.length,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [desktopHeroImages.length]);
  
  // Si viene ?redirect en la URL, guardarlo para post-login
  useEffect(() => {
    const redirectParam = searchParams.get("redirect");
    if (redirectParam) {
      setPostLoginRedirect(redirectParam);
    }
  }, [searchParams]);

  // Redirigir si ya está autenticado (respeta redirect almacenado o de la URL)
  useEffect(() => {
    if ((token || user) && !navigatedRef.current) {
      // Si el usuario ya está autenticado, redirigir al dashboard o a la página objetivo
      const target = consumePostLoginRedirect() || searchParams.get("redirect") || "/dashboard";
      navigatedRef.current = true;
      router.push(target);
    }
  }, [token, user, router, searchParams]);
  
  // Estados para los campos del formulario
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryIso, setCountryIso] = useState("CO");
  const [phone, setPhone] = useState("");
  const [howDidYouHearAboutUs, setHowDidYouHearAboutUs] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [recaptchaCompleted, setRecaptchaCompleted] = useState(false);
  
  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Estado para errores de validación
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  
  // Función para validar el formulario
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!firstName) errors.firstName = "El nombre es obligatorio";
    if (!lastName) errors.lastName = "El apellido es obligatorio";
    
    if (!email) {
      errors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "El correo electrónico no es válido";
    }
    
    if (!password) {
      errors.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    if (!phone) {
      errors.phone = "El teléfono es obligatorio";
    }
    
    if (!howDidYouHearAboutUs) {
      errors.howDidYouHearAboutUs = "Este campo es obligatorio";
    }
    
    if (!termsAccepted) {
      errors.termsAccepted = "Debes aceptar los términos y condiciones";
    }
    
    if (!recaptchaCompleted) {
      errors.recaptcha = "Por favor, completa el captcha";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const success = await register({
      firstName,
      lastName,
      email,
      password,
      phone,
      countryPhoneCode: countryCodes.find(c => c.country === countryIso)?.code.replace("+", "") || "34",
      howDidYouHearAboutUs,
      referralCode,
      termsAccepted,
      pageOrigin: "LOKL Academy"
    });
    
    if (success) {
      // Evento GA: Registro exitoso
      if (typeof window !== "undefined") {
        const w = window as unknown as WindowWithDataLayer;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({
          event: "register_on_lokl_next",
        });
      }

      const target = consumePostLoginRedirect() || searchParams.get("redirect") || "/dashboard";
      if (!navigatedRef.current) {
        navigatedRef.current = true;
        router.push(target);
      }
    } else {
      setShowErrorDialog(true);
    }
  };
  
  // Función para cerrar el diálogo de error
  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
    clearError();
  };
  
  // Simulación de reCAPTCHA (en producción usaríamos react-google-recaptcha)
  const handleRecaptchaChange = () => {
    setRecaptchaCompleted(true);
  };
  
  return (
    <div className="relative min-h-screen w-full">
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        {/* Fondo Desktop */}
        <div className="hidden md:block absolute inset-0 overflow-hidden">
          {desktopHeroImages.map((imageUrl, index) => (
            <div
              key={index}
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentDesktopImageIndex
                  ? "opacity-100"
                  : "opacity-0"
                }`}
            >
              <Image
                src={imageUrl}
                alt={`LOKL Academy - Registro desktop ${index + 1}`}
                fill
                className="object-cover object-center"
                priority={true}
                quality={90}
              />
            </div>
          ))}
        </div>

        {/* Fondo Móvil */}
        <div className="md:hidden absolute inset-0 overflow-hidden">
          {mobileHeroImages.map((imageUrl, index) => (
            <div
              key={index}
              aria-hidden="true"
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentMobileImageIndex
                  ? "opacity-100"
                  : "opacity-0"
                }`}
            >
              <Image
                src={imageUrl}
                alt={`LOKL Academy - Registro móvil ${index + 1}`}
                fill
                className="object-cover object-center"
                priority={true}
                quality={90}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-16">
        <Card className="mx-auto max-w-lg backdrop-blur-sm bg-white/95 shadow-xl">
        <CardHeader>
          <CardTitle>
            <H2 variant="section" className="text-center">
              Crear una cuenta
            </H2>
          </CardTitle>
          <CardDescription>
            <Paragraph variant="lead" color="muted" className="text-center">
              Únete a LOKL Academy y comienza tu camino en inversiones inmobiliarias
            </Paragraph>
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Nombre */}
              <FormField label="Nombre" htmlFor="firstName">

                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Tu nombre"
                  className={validationErrors.firstName ? "border-[#FF3B30]" : ""}
                />
                {validationErrors.firstName && (
                  <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.firstName}</p>
                )}
              </FormField>
              
              {/* Apellido */}
              <FormField label="Apellido" htmlFor="lastName">

                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Tu apellido"
                  className={validationErrors.lastName ? "border-[#FF3B30]" : ""}
                />
                {validationErrors.lastName && (
                  <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.lastName}</p>
                )}
              </FormField>
            </div>
            
            {/* Email */}
            <FormField label="Correo electrónico" htmlFor="email">

              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className={validationErrors.email ? "border-[#FF3B30]" : ""}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.email}</p>
              )}
            </FormField>
            
            {/* Contraseña */}
            <FormField label="Contraseña" htmlFor="password">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className={`pr-10 ${validationErrors.password ? "border-[#FF3B30]" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.password}</p>
              )}
            </FormField>
            
            {/* Confirmar Contraseña */}
            <FormField label="Confirmar contraseña" htmlFor="confirmPassword">
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className={`pr-10 ${validationErrors.confirmPassword ? "border-[#FF3B30]" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.confirmPassword}</p>
              )}
            </FormField>
            
            {/* Teléfono */}
            <FormField label="Teléfono" htmlFor="phone">

              <PhoneInput
                countryIso={countryIso}
                setCountryIso={setCountryIso}
                phone={phone}
                setPhone={setPhone}
                error={validationErrors.phone}
              />
            </FormField>
            
            {/* ¿Cómo nos conociste? */}
            <FormField label="¿Cómo nos conociste?" htmlFor="howDidYouHearAboutUs">

              <Select 
                value={howDidYouHearAboutUs} 
                onValueChange={setHowDidYouHearAboutUs}
              >
                <SelectTrigger className={validationErrors.howDidYouHearAboutUs ? "border-[#FF3B30]" : ""}>
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  {referralOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validationErrors.howDidYouHearAboutUs && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.howDidYouHearAboutUs}</p>
              )}
            </FormField>
            
            {/* Código de referido (opcional) */}
            <FormField label="Código de referido (opcional)" htmlFor="referralCode">

              <Input
                id="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Si tienes un código de referido"
              />
            </FormField>
            
            {/* reCAPTCHA */}
            <div className="border border-[#E5E5E5] p-4 rounded-md">
              <div className="flex items-center justify-between">
                <Text>No soy un robot</Text>
                <Checkbox 
                  checked={recaptchaCompleted}
                  onCheckedChange={handleRecaptchaChange}
                  className={validationErrors.recaptcha ? "border-[#FF3B30]" : ""}
                />
              </div>
              {validationErrors.recaptcha && (
                <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.recaptcha}</p>
              )}
            </div>
            
            {/* Términos y condiciones */}
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                className={validationErrors.termsAccepted ? "border-[#FF3B30]" : "mt-1"}
              />
              <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                Acepto los{" "}
                <Link 
                  href="https://drive.google.com/file/d/1R6aOvsRjYVo-d398PskWJjwL4_WrY9PP/view" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5352F6] hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  términos y condiciones
                </Link>
              </label>
            </div>
            {validationErrors.termsAccepted && (
              <p className="mt-1 text-sm text-[#FF3B30]">{validationErrors.termsAccepted}</p>
            )}
            
            {/* Botón de registro */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Registrando..." : "Crear cuenta"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <Text>
            ¿Ya tienes una cuenta?{" "}
            <Link href={searchParams.get("redirect") ? `/login?redirect=${encodeURIComponent(searchParams.get("redirect") || "")}` : "/login"} className="text-[#5352F6] hover:underline">
              Inicia sesión
            </Link>
          </Text>
        </CardFooter>
      </Card>
      </div>
      
      {/* Diálogo de error */}
      <AlertDialog open={showErrorDialog} onOpenChange={handleCloseErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error de registro</AlertDialogTitle>
            <AlertDialogDescription>
              {error || "Ha ocurrido un error al registrarse. Por favor, inténtalo de nuevo."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleCloseErrorDialog}>Aceptar</Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
