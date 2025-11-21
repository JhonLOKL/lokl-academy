export function BenefitsSection() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ¿Por qué definir tu perfil de riesgo?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Conocer tu perfil es el primer paso para tomar decisiones financieras inteligentes y seguras.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Inversiones a tu medida</h3>
                        <p className="text-gray-600">
                            Accede a proyectos que se ajustan a tu tolerancia al riesgo y horizonte de tiempo.
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Claridad y Confianza</h3>
                        <p className="text-gray-600">
                            Invierte con la seguridad de que cada decisión respalda tus objetivos financieros.
                        </p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Acceso Exclusivo</h3>
                        <p className="text-gray-600">
                            Sé el primero en ver oportunidades validadas que encajan perfectamente contigo.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
