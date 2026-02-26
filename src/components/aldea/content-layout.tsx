"use client";

import { AldeaSidebar } from "./sidebar";

interface AldeaContentLayoutProps {
    children: React.ReactNode;
    onListaClick?: () => void;
    /** Si es false, no se renderiza la columna del sidebar (útil cuando el sidebar va fuera del layout). Por defecto true. */
    renderSidebar?: boolean;
    /** Si es false, el sidebar se oculta (p. ej. cuando el hero está en vista). Por defecto true. */
    showSidebar?: boolean;
    /** "default" = sidebar fondo claro, "purple" = sidebar morado */
    sidebarVariant?: "default" | "purple";
}

/**
 * Layout de una columna para la página Aldea.
 * El contenido ocupa todo el ancho. En desktop (lg), al pasar el ratón por el borde derecho
 * se despliega un sidebar flotante con CTA y navegación rápida.
 */
export function AldeaContentLayout({ children, onListaClick, renderSidebar = true, showSidebar = true, sidebarVariant = "default" }: AldeaContentLayoutProps) {
    return (
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 pb-24 sm:px-6 lg:pb-10 lg:px-8 min-w-0">
            {/* Contenido en una sola columna */}
            <main className="min-w-0 w-full">
                {children}
            </main>

            {/* Zona de activación + sidebar: solo en desktop cuando renderSidebar y showSidebar son true.
                Oculto en el hero (showSidebar false) para no superponerse. */}
            {renderSidebar && (
                <div
                    className={`group/sidebar hidden lg:block fixed right-0 top-0 bottom-0 z-30 w-10 hover:w-[384px] transition-[width,opacity] duration-300 ease-out ${
                        showSidebar ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none w-0"
                    }`}
                    aria-label="Área para desplegar menú lateral"
                    aria-hidden={!showSidebar}
                >
                    <div className="absolute inset-y-0 right-0 w-full">
                        {/* Franja lateral: más visible para que se entienda que hay menú */}
                        <div
                            className="absolute right-0 top-0 bottom-0 w-3 rounded-l bg-[#5352F6]/35 shadow-[0_0_12px_rgba(83,82,246,0.25)] group-hover/sidebar:bg-[#5352F6]/55 group-hover/sidebar:shadow-[0_0_16px_rgba(83,82,246,0.35)] transition-all duration-300"
                            aria-hidden
                        />
                        {/* Panel del sidebar: sobresale un poco para indicar que existe; al hover se abre del todo */}
                        <div className="absolute right-0 top-0 bottom-0 w-[360px] translate-x-[calc(100%-2rem)] transition-transform duration-300 ease-out group-hover/sidebar:translate-x-0 pt-24 pb-10 pr-2 pl-2 overflow-visible">
                            <AldeaSidebar onListaClick={onListaClick} variant={sidebarVariant} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
