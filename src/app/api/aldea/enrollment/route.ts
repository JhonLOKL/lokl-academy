import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { urls } from "../../../../config/urls";

/**
 * POST /api/aldea/enrollment
 * Proxy para inscribir un lead en un proyecto (enrollment).
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validar campos requeridos
        const requiredFields = ["firstName", "lastName", "phone", "email", "countryPhoneCode", "leadOrigin", "projectIds"];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Faltan campos requeridos: ${field}`,
                    },
                    { status: 400 }
                );
            }
        }

        // Hacer la petición a la API externa (Sin await por petición del usuario para mayor velocidad)
        axios.post(
            `${urls.NEW_API_URL}lead/enrollment`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json({
            success: true,
            message: "Lead enviado para inscripción exitosamente (proceso en segundo plano)",
        });
    } catch (error) {
        console.error("Error en /api/aldea/enrollment:", error);

        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.response?.data?.message || "Error al inscribir el lead",
                    error: error.response?.data,
                },
                { status: error.response?.status || 500 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Error interno del servidor",
            },
            { status: 500 }
        );
    }
}
