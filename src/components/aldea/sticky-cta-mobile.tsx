"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface AldeaStickyCtaMobileProps {
    onListaClick?: () => void;
}

/**
 * Barra fija inferior solo en móvil. Se muestra cuando el usuario ha pasado el hero
 * e incita a registrarse. Usa los colores de la página (#5352F6).
 */
export function AldeaStickyCtaMobile({ onListaClick }: AldeaStickyCtaMobileProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const updateVisible = () => {
            const mobile = typeof window !== "undefined" && window.innerWidth < 1024;
            const pastHero = typeof window !== "undefined" && window.scrollY > window.innerHeight - 20;
            setVisible(Boolean(mobile && pastHero));
        };

        updateVisible();
        window.addEventListener("scroll", updateVisible, { passive: true });
        window.addEventListener("resize", updateVisible);
        return () => {
            window.removeEventListener("scroll", updateVisible);
            window.removeEventListener("resize", updateVisible);
        };
    }, []);

    if (!onListaClick || !visible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-t border-border bg-card px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                    Invierte en La Unión
                </p>
                <p className="truncate text-xs text-muted-foreground">
                    Únete a la lista y recibe el brochure
                </p>
            </div>
            <button
                type="button"
                onClick={onListaClick}
                className="shrink-0 rounded-xl bg-[#5352F6] px-5 py-3 text-sm font-bold text-white shadow-lg transition-colors hover:bg-[#4241C5] active:scale-[0.98]"
            >
                Regístrate
                <ArrowRight className="ml-1.5 inline-block h-4 w-4" aria-hidden />
            </button>
        </div>
    );
}
