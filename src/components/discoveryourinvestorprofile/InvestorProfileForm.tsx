"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useUtmStore } from "@/store/utm-store";
import { 
    createInvestorProfileAction, 
    generateLeadInCRMAction,
    createContactInFormQuiivenAction 
} from "@/actions/discoveryourinvestorprofile-action";

interface Question {
    id: string;
    question: string;
    options: Array<{
        label: string;
        value: string;
        tag: "NOVICE" | "EXPERT" | "DREAMER" | "VISIONARY";
        points: number;
    }>;
}

interface ResultData {
    title: string;
    message: string;
    insights: string[];
    cta: string;
    imageUrl: string;
}

const questions: Question[] = [
    {
        id: "q1",
        question: "¿Cuál es tu fuente principal de ingresos?",
        options: [
            { label: "Trabajo dependiente (empleado/a)", value: "dependiente", tag: "NOVICE", points: 10 },
            { label: "Autónomo o freelance", value: "autonomo", tag: "DREAMER", points: 10 },
            { label: "Ingresos pasivos de otras inversiones", value: "pasivos", tag: "EXPERT", points: 10 },
            { label: "Emprendedor/a con un propósito claro", value: "emprendedor", tag: "VISIONARY", points: 10 },
        ],
    },
    {
        id: "q2",
        question: "¿Cuánto destinas al ahorro/inversión mensualmente?",
        options: [
            { label: "Menos del 10%", value: "menos10", tag: "NOVICE", points: 10 },
            { label: "Entre el 10% y el 25%", value: "10a25", tag: "DREAMER", points: 10 },
            { label: "Más del 25%", value: "mas25", tag: "EXPERT", points: 5 },
            { label: "Más del 25%", value: "mas25_v2", tag: "VISIONARY", points: 5 },
            { label: "No ahorro nada", value: "nada", tag: "NOVICE", points: 10 },
        ],
    },
    {
        id: "q3",
        question: "¿Tienes un fondo de emergencia?",
        options: [
            { label: "Sí, suficiente para 6 meses o más", value: "6mas", tag: "EXPERT", points: 10 },
            { label: "Sí, pero menos de 6 meses", value: "menos6", tag: "VISIONARY", points: 10 },
            { label: "No, pero planeo crear uno", value: "planeo", tag: "DREAMER", points: 10 },
            { label: "No, no he considerado hacerlo", value: "noconsiderado", tag: "NOVICE", points: 10 },
        ],
    },
    {
        id: "q4",
        question: "¿Cuál es el horizonte temporal de tus inversiones?",
        options: [
            { label: "Corto plazo (menos de 3 años)", value: "corto", tag: "DREAMER", points: 10 },
            { label: "Mediano plazo (3-5 años)", value: "medio", tag: "VISIONARY", points: 10 },
            { label: "Largo plazo (más de 5 años)", value: "largo", tag: "EXPERT", points: 10 },
            { label: "Indefinido (no tengo claro)", value: "indefinido", tag: "NOVICE", points: 10 },
        ],
    },
    {
        id: "q5",
        question: "¿Cuál es tu objetivo principal al invertir?",
        options: [
            { label: "Maximizar el retorno financiero", value: "retorno", tag: "EXPERT", points: 10 },
            { label: "Diversificar mis activos", value: "diversificar", tag: "DREAMER", points: 10 },
            { label: "Generar ingresos pasivos regulares", value: "pasivos", tag: "NOVICE", points: 10 },
            { label: "Invertir alineado a mis valores personales", value: "valores", tag: "VISIONARY", points: 10 },
        ],
    },
    {
        id: "q6",
        question: "¿Cómo te identificas con los siguientes perfiles?",
        options: [
            { label: "Experto", value: "experto", tag: "EXPERT", points: 10 },
            { label: "Novato", value: "NOVICE", tag: "NOVICE", points: 10 },
            { label: "Soñador", value: "soñador", tag: "DREAMER", points: 10 },
            { label: "Visionario", value: "visionario", tag: "VISIONARY", points: 10 },
        ],
    },
    {
        id: "q7",
        question: "¿Cuáles son tus principales objetivos a futuro?",
        options: [
            { label: "Comprar una propiedad", value: "propiedad", tag: "EXPERT", points: 10 },
            { label: "Crear un portafolio diversificado", value: "portafolio", tag: "EXPERT", points: 10 },
            { label: "Generar ingresos pasivos", value: "pasivos", tag: "NOVICE", points: 5 },
            { label: "Generar ingresos pasivos", value: "pasivos_soñador", tag: "DREAMER", points: 5 },
            { label: "Contribuir al bienestar social y ambiental", value: "social", tag: "DREAMER", points: 10 },
            { label: "Dejar un legado familiar/comunitario", value: "legado", tag: "VISIONARY", points: 10 },
            { label: "Desarrollar proyectos sostenibles", value: "sostenibles", tag: "VISIONARY", points: 10 },
        ],
    },
    {
        id: "q8",
        question: "¿Qué tipo de impacto te gustaría generar con tus inversiones?",
        options: [
            { label: "Financiero", value: "financiero", tag: "EXPERT", points: 10 },
            { label: "Social", value: "social", tag: "DREAMER", points: 10 },
            { label: "Ambiental", value: "ambiental", tag: "DREAMER", points: 10 },
        ],
    },
    {
        id: "q9",
        question: "¿Qué tipo de proyectos te interesan más?",
        options: [
            { label: "Inmobiliarios tradicionales", value: "tradicionales", tag: "EXPERT", points: 10 },
            { label: "CDT", value: "cdt", tag: "NOVICE", points: 10 },
            { label: "Criptomonedas", value: "cripto", tag: "DREAMER", points: 10 },
            { label: "Proyectos inmobiliarios sostenibles", value: "sostenibles", tag: "VISIONARY", points: 10 },
        ],
    },
    {
        id: "q10",
        question: "¿Qué características valoras más en un modelo de negocio inmobiliario?",
        options: [
            { label: "Rentabilidad a corto plazo", value: "corto", tag: "EXPERT", points: 10 },
            { label: "Crecimiento a largo plazo", value: "largo", tag: "VISIONARY", points: 10 },
            { label: "Innovación y tecnologías", value: "innovacion", tag: "DREAMER", points: 10 },
            { label: "Impacto positivo en la comunidad", value: "comunidad", tag: "DREAMER", points: 10 },
        ],
    },
    {
        id: "q11",
        question: "¿Qué espacio te emociona más?",
        options: [
            { label: "Hotel boutique de lujo urbano", value: "hotel", tag: "EXPERT", points: 10 },
            { label: "Tiny house en el bosque", value: "tiny", tag: "DREAMER", points: 10 },
            { label: "Edificio creativo con coworking", value: "cowork", tag: "VISIONARY", points: 10 },
            { label: "Apartaestudio funcional", value: "apartaestudio", tag: "NOVICE", points: 10 },
        ],
    },
    {
        id: "q12",
        question: "¿Con qué frase conectas más?",
        options: [
            { label: '"Optimizar mi capital, minimizar el riesgo"', value: "riesgo", tag: "EXPERT", points: 10 },
            { label: '"Aprender y empezar con confianza"', value: "empezar", tag: "NOVICE", points: 10 },
            { label: '"Invertir en lo que realmente importa"', value: "importa", tag: "DREAMER", points: 10 },
            { label: '"Construir algo que transforme vidas"', value: "transforme", tag: "VISIONARY", points: 10 },
        ],
    },
    {
        id: "q13",
        question: "¿Qué representa tu idea de éxito?",
        options: [
            { label: "Escalar mi patrimonio y asegurar el futuro", value: "patrimonio", tag: "EXPERT", points: 10 },
            { label: "Tener libertad para vivir sin deudas", value: "libertad", tag: "NOVICE", points: 10 },
            { label: "Hacer parte de un cambio con sentido", value: "sentido", tag: "DREAMER", points: 10 },
            { label: "Liderar transformaciones en comunidad", value: "liderar", tag: "VISIONARY", points: 10 },
        ],
    },
    {
        id: "q14",
        question: "¿Dónde invertirías hoy?",
        options: [
            { label: "Zona turística con alta demanda", value: "turistica", tag: "EXPERT", points: 10 },
            { label: "Barrio emergente con buena financiación", value: "emergente", tag: "NOVICE", points: 10 },
            { label: "Reserva natural regenerativa", value: "reserva", tag: "DREAMER", points: 10 },
            { label: "Comuna con impacto urbano y cultural", value: "comuna", tag: "VISIONARY", points: 10 },
        ],
    },
];

const results: Record<string, ResultData> = {
    NOVICE: {
        title: "NOVATO",
        message: "Sabemos que recién estás empezando, y por eso en LOKL te acompañamos con oportunidades simples, seguras y sin complicaciones.",
        insights: [
            "Entendé tu ROI: un 8% anual te ayuda a superar el rendimiento de una cuenta de ahorros tradicional.",
            "Visualizá riesgo vs. retorno con gráficos sencillos para balancear con tranquilidad.",
            "Recibí alertas cuando tu primer dividendo trimestral esté listo para cobrar.",
            "Accedé a casos reales de otros novatos que ya están percibiendo ganancias.",
            "Seguí tutoriales paso a paso basados en ejemplos prácticos para cada etapa de tu inversión.",
        ],
        cta: "Descubrir cómo empezar fácil",
        imageUrl: "https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/Discover-Your-Investor-Profile/Novice.svg",
    },
    DREAMER: {
        title: "SOÑADOR",
        message: "Querés que tu dinero genere impacto real. En LOKL podés apoyar proyectos que transforman comunidades y construyen un mundo mejor.",
        insights: [
            "Medí tu impacto social: combiná datos de empleo creado y reducción de huella de carbono con tu rentabilidad.",
            "Inspirate con testimonios de vecinos que vieron cambios reales gracias a LOKL.",
            "Explorá un mapa interactivo para ver dónde invertís y cuántas personas ayudás.",
            "Recibí reportes trimestrales con cifras financieras y relatos directos de los beneficiarios.",
            "Participá en eventos donde los promotores te expliquen en lenguaje claro cómo tu inversión cambia realidades.",
        ],
        cta: "Conocer inversiones con impacto",
        imageUrl: "https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/Discover-Your-Investor-Profile/dreamer.svg",
    },
    EXPERT: {
        title: "EXPERTO",
        message: "Tu experiencia te hace buscar decisiones bien fundamentadas. En LOKL vas a encontrar métricas claras, análisis y oportunidades sólidas.",
        insights: [
            "Compará TIR y ROI de cada proyecto con ejemplos prácticos: '12% TIR duplica tu inversión en 6 años'.",
            "Diversificá tu cartera combinando hospitality con residencial o coworking para mitigar riesgos.",
            "Usá dashboards filtrables por período, ubicación y nivel de riesgo para profundizar tu análisis.",
            "Configurá alertas cuando tu proyecto supere un umbral de rentabilidad o cambie la ocupación hotelera en más de 5%.",
            "Accedé a foros exclusivos donde se discuten tendencias de mercado y reportes macro trimestrales.",
        ],
        cta: "Explorar análisis y rendimientos",
        imageUrl: "https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/Discover-Your-Investor-Profile/Expert.svg",
    },
    VISIONARY: {
        title: "VISIONARIO",
        message: "Buscás más que rentabilidad. Querés transformar realidades con tu inversión. En LOKL te conectamos con proyectos que hacen la diferencia.",
        insights: [
            "Invertí en desarrollos que incluyen escuelas o clínicas, con estimaciones claras de retorno e impacto social.",
            "Consultá el dashboard ESG para ver métricas Medioambientales, Sociales y de Gobernanza junto al rendimiento.",
            "Recibí un dossier anual con fotos, datos financieros y el alcance social de tus inversiones.",
            "Sumate a workshops de co-diseño para revisar planos, presupuestos y maximizar impacto y rentabilidad.",
            "Ofrecé mentoría a otros inversores y consolidá tu rol de líder de cambio sin jerga técnica.",
        ],
        cta: "Invertir en transformación social",
        imageUrl: "https://lokl-academy.s3.us-east-1.amazonaws.com/blog-cover/Discover-Your-Investor-Profile/Visionary.svg",
    },
};

interface InvestorProfileFormProps {
    onBack: () => void;
}

export function InvestorProfileForm({ onBack }: InvestorProfileFormProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string[]>>({});
    const [step, setStep] = useState<"preguntas" | "formularioUsuario" | "resultado">("preguntas");
    const [result, setResult] = useState<string>("");
    const [formData, setFormData] = useState({ nombre: "", apellidos: "", telefono: "", correo: "" });
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [scores, setScores] = useState<Record<string, number>>({
        NOVICE: 0,
        DREAMER: 0,
        EXPERT: 0,
        VISIONARY: 0,
        totalPoints: 0,
    });
    
    // Obtener parámetros UTM del store
    const utmParams = useUtmStore();

    useEffect(() => {
        if (step === "resultado" && result) {
            const data = results[result as keyof typeof results];
            if (data && data.insights.length > 0) {
                const timer = setInterval(() => {
                    setCurrentInsightIndex((prevIndex) => (prevIndex + 1) % data.insights.length);
                }, 5000);

                return () => clearInterval(timer);
            }
        }
    }, [step, result]);

    const handleAnswer = (questionId: string, value: string) => {
        const newAnswers = { ...answers, [questionId]: [value] };
        setAnswers(newAnswers);
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                calculateResult(newAnswers);
            }
        }, 200);
    };

    const handleBack = () => {
        if (currentQuestion === 0) {
            if (onBack) {
                onBack();
                return;
            }
        } else {
            setCurrentQuestion((q) => Math.max(q - 1, 0));
        }
    };

    const calculateResult = (finalAnswers: Record<string, string[]>) => {
        const calculatedScores: Record<string, number> = {
            NOVICE: 0,
            DREAMER: 0,
            EXPERT: 0,
            VISIONARY: 0,
            totalPoints: 0,
        };

        questions.forEach((q) => {
            const answer = finalAnswers[q.id]?.[0];
            const option = q.options.find((o) => o.value === answer);
            if (option) {
                calculatedScores[option.tag] += option.points;
                calculatedScores.totalPoints += option.points;
            }
        });

        const profileScores = {
            NOVICE: calculatedScores.NOVICE,
            DREAMER: calculatedScores.DREAMER,
            EXPERT: calculatedScores.EXPERT,
            VISIONARY: calculatedScores.VISIONARY,
        };

        const maxScore = Math.max(...Object.values(profileScores));
        const winner = Object.keys(profileScores).find(
            (key) => profileScores[key as keyof typeof profileScores] === maxScore
        );

        setResult(winner || "NOVICE");
        setScores(calculatedScores);
        setStep("formularioUsuario");

        return calculatedScores;
    };

    const guardarYContinuar = async () => {
        setIsSubmitting(true);
        
        try {
            // Transformar las respuestas al formato esperado por el backend
            const formattedTestResponses = questions.map((question) => {
                const selectedValue = answers[question.id]?.[0];
                const selectedOption = question.options.find((opt) => opt.value === selectedValue);
                
                return {
                    id: question.id,
                    question: question.question,
                    answer: selectedOption?.label || "",
                    value: selectedValue || "",
                    tag: selectedOption?.tag || "",
                    points: selectedOption?.points || 0,
                };
            });

            console.log("📋 Test Responses formateados:", formattedTestResponses);
            console.log("📊 Scores:", scores);

            // 1. Crear el perfil de inversor en la API
            const investorProfileResult = await createInvestorProfileAction({
                firstName: formData.nombre,
                lastName: formData.apellidos,
                email: formData.correo,
                phone: formData.telefono,
                investorProfile: result,
                scores: {
                    NOVICE: scores.NOVICE,
                    DREAMER: scores.DREAMER,
                    EXPERT: scores.EXPERT,
                    VISIONARY: scores.VISIONARY,
                    totalPoints: scores.totalPoints,
                },
                testResponses: formattedTestResponses,
                testVersion: "1.0",
            });

            if (!investorProfileResult.success) {
                console.error("Error al crear perfil de inversor:", investorProfileResult.error);
            } else {
                console.log("✅ Perfil de inversor creado exitosamente");
            }

            // 2. Generar lead en el CRM
            const leadResult = await generateLeadInCRMAction({
                name: `${formData.nombre} ${formData.apellidos}`,
                email: formData.correo,
                phone: formData.telefono,
                leadOrigin: "discoveryourinvestorprofile",
                origin: "Perfil de Inversor",
                utmSource: utmParams.utmSource,
                utmMedium: utmParams.utmMedium,
                utmCampaign: utmParams.utmCampaign,
                utmTerm: utmParams.utmTerm,
                utmContent: utmParams.utmContent,
            });

            if (!leadResult.success) {
                console.error("Error al generar lead en CRM:", leadResult.error);
            } else {
                console.log("✅ Lead creado exitosamente en el CRM");
            }

            // 3. Crear contacto en Quiiven (opcional)
            const quiivenResult = await createContactInFormQuiivenAction({
                firstName: formData.nombre,
                lastName: formData.apellidos,
                email: formData.correo,
                phone: formData.telefono,
                leadOrigin: "discoveryourinvestorprofile",
                origin: `Perfil de Inversor - ${result}`,
                projectNames: "Discovery Investor Profile",
                utmSource: utmParams.utmSource,
                utmMedium: utmParams.utmMedium,
                utmCampaign: utmParams.utmCampaign,
                utmTerm: utmParams.utmTerm,
                utmContent: utmParams.utmContent,
            });

            if (!quiivenResult.success) {
                console.error("Error al crear contacto en Quiiven:", quiivenResult.error);
            } else {
                console.log("✅ Contacto creado exitosamente en Quiiven");
            }

            // Mostrar resultado independientemente de los errores de las APIs
            setStep("resultado");
        } catch (error) {
            console.error("Error general al guardar datos:", error);
            // Mostrar resultado de todos modos para no bloquear al usuario
            setStep("resultado");
        } finally {
            setIsSubmitting(false);
        }
    };

    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    if (step === "formularioUsuario") {
        return (
            <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-slate-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 md:p-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">¡Ya casi! Estás a un paso</h2>
                    <p className="text-gray-600 mb-8">
                        Con esta información, te mostraremos los proyectos que mejor se adaptan a ti.
                    </p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (!aceptaTerminos) return alert("Por favor acepta los términos y condiciones.");
                            guardarYContinuar();
                        }}
                        className="space-y-5"
                    >
                        <input
                            type="text"
                            required
                            placeholder="Tu nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            required
                            placeholder="Tus apellidos"
                            value={formData.apellidos}
                            onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="tel"
                            required
                            placeholder="Tu teléfono"
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="email"
                            required
                            placeholder="Tu correo electrónico"
                            value={formData.correo}
                            onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={!aceptaTerminos || isSubmitting}
                            className="w-full bg-[#3533FF] text-white py-3 mt-4 rounded-lg font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Procesando...
                                </>
                            ) : (
                                "Descubrir mi perfil"
                            )}
                        </button>
                        <div className="flex items-start gap-2 mt-4 text-left">
                            <input
                                id="terminos"
                                type="checkbox"
                                checked={aceptaTerminos}
                                onChange={(e) => setAceptaTerminos(e.target.checked)}
                                className="mt-1"
                            />
                            <label htmlFor="terminos" className="text-sm text-gray-700">
                                Acepto los{" "}
                                <a
                                    href="https://drive.google.com/file/d/1R6aOvsRjYVo-d398PskWJjwL4_WrY9PP/view"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline text-blue-600"
                                >
                                    términos y condiciones
                                </a>{" "}
                                de LOKL S.A.S
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    if (step === "resultado") {
        const data = results[result as keyof typeof results];
        if (!data) {
            return <div className="min-h-screen flex items-center justify-center">Cargando resultado...</div>;
        }

        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-24">
                <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        {/* Image Section - Ocupa todo el espacio */}
                        <div className="relative h-64 md:h-auto min-h-[500px]">
                            <Image
                                src={data.imageUrl}
                                alt={data.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
                            <h1 className="text-4xl lg:text-5xl font-bold text-[#3533FF] mb-4">{data.title}</h1>
                            <p className="text-lg text-gray-600 leading-relaxed mb-10">{data.message}</p>

                            <div className="min-h-[120px]">
                                {data.insights.length > 0 && (
                                    <div
                                        key={currentInsightIndex}
                                        className="flex items-center bg-slate-50 rounded-xl p-4 transition-all duration-500 ease-in-out"
                                    >
                                        <div className="flex-shrink-0 mr-4">
                                            <svg
                                                className="w-7 h-7 text-[#3533FF]"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-800">{data.insights[currentInsightIndex]}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-12">
                                <a
                                    href="/#newprojects"
                                    className="inline-block w-full bg-[#3533FF] text-white py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-1 text-center"
                                >
                                    {data.cta}
                                </a>
                                <button
                                    onClick={onBack}
                                    className="w-full mt-4 py-3 rounded-lg text-gray-500 font-medium transition-colors hover:text-[#3533FF]"
                                >
                                    Volver al inicio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 pt-28 md:pt-32 pb-20 md:pb-24 flex items-start justify-center">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <div className="mb-6">
                    <div className="flex justify-between items-center text-sm mb-2">
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 px-2 py-1 text-[#3533FF] hover:underline"
                            aria-label="Volver"
                        >
                            Volver
                        </button>

                        <span className="text-gray-600">
                            Pregunta {currentQuestion + 1} de {questions.length}
                        </span>
                    </div>

                    <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-[#3533FF] h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-4 text-gray-900">{question.question}</h2>
                <div className="space-y-3">
                    {question.options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleAnswer(question.id, option.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-left hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
