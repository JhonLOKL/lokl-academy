"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ArrowRight, Home, TrendingUp, TreePalm } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIPO_VIVIENDA_OPTIONS = [
    { id: "eco-living", label: "Eco-Living", sublabel: "Vivir / Vacacionar", icon: Home },
    { id: "inversion-pura", label: "Inversión Pura", sublabel: "Rentabilidad", icon: TrendingUp },
    { id: "mix", label: "Mix", sublabel: "Disfrutar y Rentar", icon: TreePalm },
] as const;

const RANGO_INVERSION_OPTIONS = [
    { id: "50-100", label: "$50M - $100M COP" },
    { id: "100-200", label: "$100M - $200M COP" },
    { id: "200-plus", label: "+$200M COP" },
] as const;

const STEPS = 3;

interface ListaEsperaModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ListaEsperaModal({ open, onOpenChange }: ListaEsperaModalProps) {
    const [step, setStep] = useState(1);
    const [tipoVivienda, setTipoVivienda] = useState<string | null>(null);
    const [rangoInversion, setRangoInversion] = useState<string | null>(null);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [whatsapp, setWhatsapp] = useState("");

    useEffect(() => {
        if (!open) {
            setStep(1);
            setTipoVivienda(null);
            setRangoInversion(null);
            setNombre("");
            setEmail("");
            setWhatsapp("");
        }
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: enviar a API / server action
        console.log({ tipoVivienda, rangoInversion, nombre, email, whatsapp });
        onOpenChange(false);
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
                    <>
                        <div className="flex items-center justify-between px-6 pb-4">
                            <DialogTitle className="text-2xl font-bold text-foreground">
                                ¿Qué buscas en Hacienda La Unión?
                            </DialogTitle>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 px-6 pb-8">
                            {TIPO_VIVIENDA_OPTIONS.map(({ id, label, sublabel, icon: Icon }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setTipoVivienda(id)}
                                    className={cn(
                                        "flex w-full min-w-[140px] max-w-[180px] flex-col items-center gap-3 rounded-xl border-2 bg-card p-6 text-left transition-all hover:border-[#5352F6]/50",
                                        tipoVivienda === id
                                            ? "border-[#5352F6] bg-[#5352F6]/5"
                                            : "border-border"
                                    )}
                                >
                                    <Icon className="h-10 w-10 text-[#5352F6]" aria-hidden />
                                    <span className="font-semibold text-foreground">{label}</span>
                                    <span className="text-sm text-muted-foreground">{sublabel}</span>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-end border-t border-border px-6 py-4">
                            <Button
                                type="button"
                                disabled={!tipoVivienda}
                                onClick={() => setStep(2)}
                                className="bg-[#5352F6] hover:bg-[#4241C5]"
                            >
                                Siguiente
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
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
                        <DialogTitle className="px-6 pb-4 text-2xl font-bold text-foreground">
                            ¿Cuál es tu rango de inversión?
                        </DialogTitle>
                        <div className="flex flex-col gap-3 px-6 pb-8">
                            {RANGO_INVERSION_OPTIONS.map(({ id, label }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setRangoInversion(id)}
                                    className={cn(
                                        "rounded-xl border-2 py-4 text-center font-medium transition-all",
                                        rangoInversion === id
                                            ? "border-[#5352F6] bg-[#5352F6]/10 text-foreground"
                                            : "border-border bg-card text-foreground hover:border-[#5352F6]/50"
                                    )}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-end border-t border-border px-6 py-4">
                            <Button
                                type="button"
                                disabled={!rangoInversion}
                                onClick={() => setStep(3)}
                                className="bg-[#5352F6] hover:bg-[#4241C5]"
                            >
                                Siguiente
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-4 px-6 pb-2">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Atrás
                            </button>
                        </div>
                        <DialogTitle className="px-6 pb-1 text-2xl font-bold text-foreground">
                            ¡Genial!
                        </DialogTitle>
                        <p className="px-6 pb-6 text-muted-foreground">
                            ¿A dónde te enviamos el brochure?
                        </p>
                        <div className="space-y-5 px-6 pb-6">
                            <div>
                                <label htmlFor="lista-nombre" className="mb-1.5 block text-sm font-semibold text-foreground">
                                    Nombre completo *
                                </label>
                                <Input
                                    id="lista-nombre"
                                    type="text"
                                    placeholder="Juan Pérez"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                    className="h-11 border-0 border-b border-input rounded-none bg-transparent px-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                            <div>
                                <label htmlFor="lista-email" className="mb-1.5 block text-sm font-semibold text-foreground">
                                    Correo electrónico *
                                </label>
                                <Input
                                    id="lista-email"
                                    type="email"
                                    placeholder="juan@ejemplo.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 border-0 border-b border-input rounded-none bg-transparent px-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                            <div>
                                <label htmlFor="lista-whatsapp" className="mb-1.5 block text-sm font-semibold text-foreground">
                                    WhatsApp (opcional)
                                </label>
                                <Input
                                    id="lista-whatsapp"
                                    type="tel"
                                    placeholder="+57 300 123 4567"
                                    value={whatsapp}
                                    onChange={(e) => setWhatsapp(e.target.value)}
                                    className="h-11 border-0 border-b border-input rounded-none bg-transparent px-0 shadow-none focus-visible:ring-0"
                                />
                            </div>
                        </div>
                        <div className="border-t border-border px-6 py-4">
                            <Button
                                type="submit"
                                className="w-full bg-[#5352F6] py-6 text-base font-bold hover:bg-[#4241C5]"
                            >
                                Unirme a la Lista
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
