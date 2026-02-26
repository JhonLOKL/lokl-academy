import { Users } from "lucide-react";

const PUBLICATIONS = [
    "Forbes",
    "Portafolio",
    "La República",
    "Semana",
] as const;

export function AldeaTrustBar() {
    return (
        <section
            className="w-full overflow-x-auto bg-[#5352F6] py-6 sm:overflow-visible sm:py-10"
            aria-label="Confianza y medios"
        >
            {/* En móvil: contenido en una fila deslizable; en desktop: flex normal */}
            <div className="flex w-max min-w-full items-center gap-6 px-4 sm:w-full sm:min-w-0 sm:flex-nowrap sm:justify-between sm:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Izquierda: inversionistas */}
                <div
                    className="flex shrink-0 items-center gap-3 text-white sm:min-h-[200px] sm:flex-1 sm:flex-col sm:justify-center sm:gap-2"
                    aria-label="Inversionistas activos"
                >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20 sm:h-14 sm:w-14">
                        <Users className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} aria-hidden />
                    </div>
                    <div className="shrink-0">
                        <p className="whitespace-nowrap text-2xl font-bold leading-tight tracking-tight sm:text-center sm:text-4xl md:text-5xl">
                            +1,500
                        </p>
                        <p className="whitespace-nowrap text-sm font-normal text-white sm:text-base md:text-lg">
                            inversionistas activos
                        </p>
                    </div>
                </div>

                {/* Derecha: revistas - sin envolver, en fila */}
                <div
                    className="flex shrink-0 items-center gap-6 sm:min-h-[200px] sm:flex-1 sm:justify-center sm:gap-x-12"
                    aria-label="Medios donde hemos aparecido"
                >
                    {PUBLICATIONS.map((name) => (
                        <span
                            key={name}
                            className="whitespace-nowrap text-base font-medium text-white sm:text-lg md:text-xl"
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
