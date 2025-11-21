interface HeroSectionProps {
    onShowForm: () => void;
}

export function HeroSection({ onShowForm }: HeroSectionProps) {
    return (
        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Descubre tu tipo de{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            inversionista LOKL
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        En solo <strong>3 minutos</strong>, te daremos un perfil claro y te mostraremos las oportunidades de inversión que realmente se alinean con tus metas.
                    </p>
                    <button
                        onClick={onShowForm}
                        className="text-white px-8 py-3 text-lg font-medium rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-blue-300"
                        style={{ backgroundColor: "#3533FF" }}
                    >
                        Descubrir mi perfil ahora
                    </button>
                </div>
            </div>
        </section>
    );
}
