interface CTASectionProps {
    onShowForm: () => void;
}

export function CTASection({ onShowForm }: CTASectionProps) {
    return (
        <section
            className="py-20"
            style={{ background: "linear-gradient(135deg, #3533FF 0%, #6366f1 100%)" }}
        >
            <div className="container mx-auto px-4 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        ¿Listo para tomar el control de tus inversiones?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Únete a miles que ya invierten de forma más inteligente con LOKL.
                    </p>
                    <button
                        onClick={onShowForm}
                        className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 text-xl font-medium rounded-md transition-all duration-300 ease-in-out transform hover:scale-105"
                    >
                        Hacer el test gratuito
                    </button>
                </div>
            </div>
        </section>
    );
}
