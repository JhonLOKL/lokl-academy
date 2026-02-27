import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { urls } from "@/config/urls";

/**
 * POST /api/aldea/upsertLead
 * Crea o actualiza un lead de la lista de espera de Aldea en el CRM (Google Sheets).
 * Reenvía las cookies de sesión al backend externo para autenticación.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validar que tengamos los campos requeridos
        if (!body.firstName || !body.email || !body.phone) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Faltan campos requeridos: firstName, email, phone",
                },
                { status: 400 }
            );
        }

        // Reenviar las cookies de sesión al backend externo
        const cookieHeader = request.headers.get("cookie") ?? "";

        // Hacer la petición a la API externa (Sin await por petición del usuario para mayor velocidad)
        axios.post(
            `${urls.NEW_API_URL}sheets/upsertLead`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                    ...(cookieHeader && { Cookie: cookieHeader }),
                },
            }
        );

        return NextResponse.json({
            success: true,
            message: "Lead de Aldea enviado exitosamente (proceso en segundo plano)",
        });
    } catch (error) {
        console.error("Error en /api/aldea/upsertLead:", error);

        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        error.response?.data?.message ||
                        "Error al crear/actualizar el lead de Aldea",
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
