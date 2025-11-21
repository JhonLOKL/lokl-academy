import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { urls } from "@/config/urls";

/**
 * POST /api/sheets/upsertLead
 * Crea o actualiza un lead en el CRM (Google Sheets)
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

    // Hacer la petición a la API externa
    const response = await axios.post(
      `${urls.NEW_API_URL}sheets/upsertLead`,
      body
    );

    // Retornar la respuesta de la API externa
    return NextResponse.json({
      success: true,
      message: "Lead creado/actualizado exitosamente en el CRM",
      data: response.data,
    });
  } catch (error) {
    console.error("Error en /api/sheets/upsertLead:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || "Error al crear/actualizar el lead",
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

