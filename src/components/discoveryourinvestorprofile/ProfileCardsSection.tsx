import { perfiles } from "./data";

interface ProfileCardsSectionProps {
    onShowForm: () => void;
}

export function ProfileCardsSection({ onShowForm }: ProfileCardsSectionProps) {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        ¿Con cuál perfil te identificas?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Cada inversionista es único. Estos son los perfiles que puedes descubrir en LOKL.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {Object.values(perfiles).map((perfil) => {
                        const IconComponent = perfil.icon;
                        return (
                            <div key={perfil.title} className="bg-gray-50 rounded-lg p-6 flex flex-col">
                                <div className="mb-4 flex justify-center">
                                    <IconComponent className="w-14 h-14 text-[#3533FF]" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{perfil.title}</h3>
                                <p className="text-gray-600 mb-6 flex-grow">{perfil.message}</p>
                                <button
                                    type="button"
                                    onClick={onShowForm}
                                    className="mt-auto self-start text-left text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 transform hover:scale-105"
                                    style={{ backgroundColor: "#3533FF" }}
                                >
                                    {perfil.cta}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
