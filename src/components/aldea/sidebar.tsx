"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
import { Briefcase, HelpCircle, Image, MapPin, Quote, Sparkles, TrendingUp } from "lucide-react";

const QUICK_NAV_SECTIONS = [
    { id: "inspiracion", label: "La visión detrás de Aldea", icon: Sparkles },
    { id: "por-que-union-lugar", label: "Qué hace especial La Unión", icon: MapPin },
    { id: "por-que-invertir", label: "Tu oportunidad de invertir con propósito", icon: TrendingUp },
    { id: "galeria", label: "Así es La Unión: conoce el entorno", icon: Image },
    { id: "modelo-negocio", label: "Cómo generamos valor para todos", icon: Briefcase },
    { id: "testimonios", label: "Qué dicen de nosotros", icon: Quote },
    { id: "faqs", label: "Todo lo que necesitas saber", icon: HelpCircle },
] as const;

interface AldeaSidebarProps {
    onListaClick?: () => void;
    /** "default" = fondo claro, "purple" = fondo morado */
    variant?: "default" | "purple";
}

export function AldeaSidebar({ onListaClick, variant = "default" }: AldeaSidebarProps) {
    const isPurple = variant === "purple";
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [thumbHeight, setThumbHeight] = useState(40);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartY = useRef(0);
    const scrollStartTop = useRef(0);

    const updateScrollIndicator = useCallback(() => {
        const el = scrollRef.current;
        if (!el) return;
        const { scrollTop, scrollHeight, clientHeight } = el;
        const maxScroll = scrollHeight - clientHeight;
        if (maxScroll <= 0) {
            setScrollProgress(0);
            setThumbHeight(100);
            return;
        }
        setScrollProgress(scrollTop / maxScroll);
        const ratio = clientHeight / scrollHeight;
        setThumbHeight(Math.max(24, Math.min(100, ratio * 100)));
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        updateScrollIndicator();
        el.addEventListener("scroll", updateScrollIndicator);
        const ro = new ResizeObserver(updateScrollIndicator);
        ro.observe(el);
        return () => {
            el.removeEventListener("scroll", updateScrollIndicator);
            ro.disconnect();
        };
    }, [updateScrollIndicator]);

    const handleThumbMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        dragStartY.current = e.clientY;
        scrollStartTop.current = scrollRef.current?.scrollTop ?? 0;
    };

    useEffect(() => {
        if (!isDragging) return;
        const onMove = (e: MouseEvent) => {
            const el = scrollRef.current;
            if (!el) return;
            const delta = e.clientY - dragStartY.current;
            const trackHeight = el.clientHeight;
            const maxScroll = el.scrollHeight - el.clientHeight;
            if (maxScroll <= 0) return;
            const scrollDelta = (delta / trackHeight) * maxScroll;
            el.scrollTop = Math.max(0, Math.min(maxScroll, scrollStartTop.current + scrollDelta));
        };
        const onUp = () => setIsDragging(false);
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
    }, [isDragging]);

    return (
        <aside
            className="relative w-full shrink-0 lg:sticky lg:top-24 lg:w-[360px] lg:self-start"
            aria-label="Inversión y acceso rápido"
        >
            <div className="relative flex max-h-[calc(100vh-7rem)] lg:max-h-[calc(100vh-8rem)]">
                {/* Contenedor con scroll: barra nativa oculta */}
                <div
                    ref={scrollRef}
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                    className={`[&::-webkit-scrollbar]:[display:none] flex-1 overflow-y-auto overflow-x-hidden rounded-2xl p-6 shadow-sm ${
                        isPurple
                            ? "border border-white/20 bg-[#5352F6] shadow-lg"
                            : "border border-border bg-card"
                    }`}
                >
                {/* Estado del proyecto */}
                <div
                    className={`mb-6 flex flex-wrap items-center gap-4 text-sm ${
                        isPurple ? "text-white" : "text-muted-foreground"
                    }`}
                >
                    <span className="flex items-center gap-1.5">
                        <span
                            className={`inline-block h-2 w-2 rounded-full ${isPurple ? "bg-amber-300" : "bg-amber-500"}`}
                            aria-hidden
                        />
                        Quedan 9 días
                    </span>
                    <span>
                        <strong className={isPurple ? "text-white" : "text-foreground"}>1500</strong> INVERSORES
                    </span>
                </div>

                {/* CTA Inversión */}
                <div className="mb-6">
                    <h2
                        className={`mb-2 text-xl font-bold ${isPurple ? "text-white" : "text-foreground"}`}
                    >
                        Invertir en <span className={isPurple ? "text-white" : "text-[#5352F6]"}>Aldea</span>
                    </h2>
                    <p
                        className={`mb-4 text-sm leading-relaxed ${
                            isPurple ? "text-white" : "text-muted-foreground"
                        }`}
                    >
                        Regístrate para invertir en Aldea—te mantendremos actualizado sobre los avances del proyecto.
                    </p>
                    {onListaClick ? (
                        <button
                            type="button"
                            onClick={onListaClick}
                            className={
                                isPurple
                                    ? "block w-full rounded-xl border-2 border-white bg-white py-3.5 text-center text-base font-bold text-[#5352F6] shadow-lg transition-colors hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/50"
                                    : "block w-full rounded-xl bg-[#5352F6] py-3.5 text-center text-base font-bold text-white shadow-lg transition-colors hover:bg-[#4241C5] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#5352F6]/50"
                            }
                        >
                            Regístrate para invertir
                        </button>
                    ) : (
                        <Link
                            href="#lista-espera"
                            className={
                                isPurple
                                    ? "block w-full rounded-xl border-2 border-white bg-white py-3.5 text-center text-base font-bold text-[#5352F6] shadow-lg transition-colors hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white/50"
                                    : "block w-full rounded-xl bg-[#5352F6] py-3.5 text-center text-base font-bold text-white shadow-lg transition-colors hover:bg-[#4241C5] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#5352F6]/50"
                            }
                        >
                            Regístrate para invertir
                        </Link>
                    )}
                </div>

                {/* Navegación rápida */}
                <nav aria-label="Acceso rápido a secciones">
                    <p
                        className={`mb-3 text-xs font-semibold uppercase tracking-wider ${
                            isPurple ? "text-white" : "text-muted-foreground"
                        }`}
                    >
                        En esta página
                    </p>
                    <ul className="space-y-1">
                        {QUICK_NAV_SECTIONS.map(({ id, label, icon: Icon }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={
                                        isPurple
                                            ? "flex items-center gap-2 rounded-lg py-2 px-2 text-sm text-white transition-colors hover:bg-white/15 hover:text-white"
                                            : "flex items-center gap-2 rounded-lg py-2 px-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                                    }
                                >
                                    <Icon
                                        className={`h-4 w-4 shrink-0 ${isPurple ? "text-white" : "text-muted-foreground"}`}
                                        aria-hidden
                                    />
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                </div>

                {/* Indicador de scroll personalizado (reemplaza la barra nativa) */}
                <div
                    className="absolute right-1 top-6 bottom-6 w-1.5 shrink-0 rounded-full"
                    style={{
                        background: isPurple ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
                    }}
                    aria-hidden
                >
                    <div
                        className="absolute left-0 right-0 min-h-[24px] w-full rounded-full transition-[top,height] duration-150"
                        style={{
                            top: `${scrollProgress * (100 - thumbHeight)}%`,
                            height: `${thumbHeight}%`,
                            background: isPurple ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.25)",
                            cursor: isDragging ? "grabbing" : "grab",
                        }}
                        onMouseDown={handleThumbMouseDown}
                        role="scrollbar"
                        aria-valuenow={Math.round(scrollProgress * 100)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    />
                </div>
            </div>
        </aside>
    );
}
