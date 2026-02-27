import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { urls } from "../../../../config/urls";

/**
 * POST /api/aldea/sendMessage
 * Proxy limpio para enviar el primer mensaje de WhatsApp con imagen para leads de Aldea.
 * No requiere autenticacion por token ni proxea las cookies para evitar conflictos 401.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validar que tengamos los campos requeridos para WhatsApp
        if (!body.name || !body.projectId || !body.email || !body.numberToSend) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Faltan campos requeridos: name, projectId, email, numberToSend",
                },
                { status: 400 }
            );
        }

        // Hacer la petición a la API externa (Sin await por petición del usuario para mayor velocidad)
        axios.post(
            `${urls.NEW_API_URL}chat/sendMessageWithImage`,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json({
            success: true,
            message: "Mensaje de WhatsApp enviado exitosamente (proceso en segundo plano)",
        });
    } catch (error) {
        console.error("Error en /api/aldea/sendMessage:", error);

        if (axios.isAxiosError(error)) {
            return NextResponse.json(
                {
                    success: false,
                    message: error.response?.data?.message || "Error al enviar el mensaje de WhatsApp",
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
