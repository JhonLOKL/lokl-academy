"use client";

import { useState, useEffect } from "react";
import { useUtmStore } from "@/store/utm-store";
import { ChevronLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "@/components/simulator/phone-input-styles.css";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { upsertAldeaLeadAction, sendAldeaMessageAction, enrollLeadAction } from "@/actions/aldea-action";

const COMO_NOS_CONOCISTE_OPTIONS = [
    { id: "instagram", label: "Instagram" },
    { id: "facebook", label: "Facebook" },
    { id: "tiktok", label: "TikTok" },
    { id: "google", label: "Búsqueda en Google" },
    { id: "recomendacion", label: "Recomendación de un amigo / familiar" },
    { id: "otro", label: "Otro" },
] as const;

const STEPS = 3;

interface ListaEsperaModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ListaEsperaModal({ open, onOpenChange }: ListaEsperaModalProps) {
    const [step, setStep] = useState(1);
    const { utmSource, utmMedium, utmCampaign, utmTerm, utmContent } = useUtmStore();

    // State variables for the new form
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [comoNosConociste, setComoNosConociste] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!open) {
            setStep(1);
            setNombre("");
            setApellido("");
            setEmail("");
            setTelefono("");
            setComoNosConociste(null);
        }
    }, [open]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!comoNosConociste) return;

        // Mapear la opción de "cómo nos conociste" a un leadOrigin legible
        const leadOriginMap: Record<string, string> = {
            instagram: "Instagram",
            facebook: "Facebook",
            tiktok: "TikTok",
            google: "Google",
            recomendacion: "Recomendación",
            otro: "Otro",
        };

        setIsSubmitting(true);
        try {
            await upsertAldeaLeadAction({
                firstName: nombre,
                lastName: apellido,
                email,
                phone: telefono,
                project: "Aldea",
                origin: "Formulario de Aldea",
                status: "Interesado",
                leadOrigin: leadOriginMap[comoNosConociste] ?? comoNosConociste,
                ...(utmSource && { utmSource }),
                ...(utmMedium && { utmMedium }),
                ...(utmCampaign && { utmCampaign }),
                ...(utmTerm && { utmTerm }),
                ...(utmContent && { utmContent }),
            });

            // Registrar enrollment (Publico)
            await enrollLeadAction({
                firstName: nombre,
                lastName: apellido,
                email: email,
                phone: telefono?.replace(/\D/g, "") || "", // Solo números
                countryPhoneCode: "57", // Por defecto Colombia, se podría extraer si el input lo permite
                leadOrigin: leadOriginMap[comoNosConociste] ?? comoNosConociste,
                projectIds: ["d1f50b31-1e1b-4ebe-881e-0d390458f471"], // Aldea
            });

            // Enviar mensaje de WhatsApp (Publico, no requiere token)
            const fullPhone = telefono?.replace(/\+/g, "");
            await sendAldeaMessageAction({
                name: `${nombre} ${apellido}`.trim(),
                projectId: "d1f50b31-1e1b-4ebe-881e-0d390458f471",
                email: email,
                numberToSend: fullPhone,
            });

            setStep(4); // paso de éxito
        } catch {
            console.error("Error al enviar el formulario de Aldea");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={true}
                className="max-w-2xl rounded-2xl p-0 pt-4 sm:pt-6"
            >
                {/* Barra de progreso */}
                <div className="mb-6 flex gap-1 px-6">
                    {Array.from({ length: STEPS }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "h-1 flex-1 rounded-full transition-colors",
                                i + 1 <= step ? "bg-[#5352F6]" : "bg-border"
                            )}
                        />
                    ))}
                </div>

                {step === 1 && (
                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                        <div className="flex items-center justify-between px-6 pb-4">
                            <DialogTitle className="text-2xl font-bold text-foreground">
                                ¡Comencemos!
                            </DialogTitle>
                        </div>
                        <p className="px-6 pb-6 text-muted-foreground">
                            Ingresa tus datos personales para unirte a la lista de espera de Hacienda La Unión.
                        </p>
                        <div className="space-y-5 px-6 pb-8">
                            <div>
                                <label htmlFor="nombre" className="mb-1.5 block text-sm font-semibold text-foreground">
                                    Nombre *
                                </label>
                                <Input
                                    id="nombre"
                                    type="text"
                                    placeholder="Juan"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                    className="h-11 border-0 border-b border-input rounded-none bg-transparent px-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                            <div>
                                <label htmlFor="apellido" className="mb-1.5 block text-sm font-semibold text-foreground">
                                    Apellido *
                                </label>
                                <Input
                                    id="apellido"
                                    type="text"
                                    placeholder="Pérez"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    required
                                    className="h-11 border-0 border-b border-input rounded-none bg-transparent px-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end border-t border-border px-6 py-4">
                            <Button
                                type="submit"
                                disabled={!nombre.trim() || !apellido.trim()}
                                className="bg-[#5352F6] hover:bg-[#4241C5]"
                            >
                                Siguiente
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                        <div className="flex items-center gap-4 px-6 pb-4">
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Atrás
                            </button>
                        </div>
                        <DialogTitle className="px-6 pb-1 text-2xl font-bold text-foreground">
                            ¿Dónde te enviamos la información?
                        </DialogTitle>
                        <p className="px-6 pb-6 pt-2 text-muted-foreground">
                            Déjanos tus datos de contacto.
                        </p>
                        <div className="space-y-5 px-6 pb-8">
                            <div>
                                <label htmlFor="telefono" className="mb-1.5 block text-sm font-semibold text-foreground">
                                    Teléfono *
                                </label>
                                <PhoneInput
                                    id="telefono"
                                    defaultCountry="CO"
                                    international
                                    countryCallingCodeEditable={false}
                                    value={telefono}
                                    onChange={(val) => setTelefono((val as string) || "")}
                                    placeholder="+57 300 123 4567"
                                    required
                                    className="flex h-11 w-full border-0 border-b border-input rounded-none bg-transparent px-0 shadow-none focus-visible:ring-0 [&>input]:bg-transparent [&>input]:border-none [&>input]:outline-none [&>input]:shadow-none [&>input]:h-full [&>input]:w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
                                    Correo electrónico *
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="juan@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 border-0 border-b border-input rounded-none bg-transparent px-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end border-t border-border px-6 py-4">
                            <Button
                                type="submit"
                                disabled={!telefono.trim() || !email.trim()}
                                className="bg-[#5352F6] hover:bg-[#4241C5]"
                            >
                                Siguiente
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-4 px-6 pb-4">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Atrás
                            </button>
                        </div>
                        <DialogTitle className="px-6 pb-4 text-2xl font-bold text-foreground">
                            Para terminar, ¿cómo nos conociste?
                        </DialogTitle>
                        <div className="flex flex-col gap-3 px-6 pb-8">
                            {COMO_NOS_CONOCISTE_OPTIONS.map(({ id, label }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setComoNosConociste(id)}
                                    className={cn(
                                        "rounded-xl border-2 py-4 text-center font-medium transition-all",
                                        comoNosConociste === id
                                            ? "border-[#5352F6] bg-[#5352F6]/10 text-foreground"
                                            : "border-border bg-card text-foreground hover:border-[#5352F6]/50"
                                    )}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <div className="border-t border-border px-6 py-4">
                            <Button
                                type="submit"
                                disabled={!comoNosConociste || isSubmitting}
                                className="w-full bg-[#5352F6] py-6 text-base font-bold hover:bg-[#4241C5]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        Procesando...
                                    </>
                                ) : (
                                    <>
                                        Unirme a la Lista
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                )}

                {step === 4 && (
                    <div className="flex flex-col items-center gap-6 px-6 pb-10 pt-4 text-center">
                        <CheckCircle2 className="h-16 w-16 text-[#5352F6]" />
                        <DialogTitle className="text-2xl font-bold text-foreground">
                            ¡Ya estás en la lista!
                        </DialogTitle>
                        <p className="text-muted-foreground">
                            Gracias, <span className="font-semibold text-foreground">{nombre}</span>. Pronto recibirás novedades sobre Hacienda La Unión directamente en tu correo.
                        </p>
                        <Button
                            onClick={() => onOpenChange(false)}
                            className="w-full bg-[#5352F6] py-6 text-base font-bold hover:bg-[#4241C5]"
                        >
                            Cerrar
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
