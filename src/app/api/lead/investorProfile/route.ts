import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { urls } from "@/config/urls";

/**
 * POST /api/lead/investorProfile
 * Crea un perfil de inversor en la API externa
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar que tengamos los campos requeridos
    if (!body.firstName || !body.lastName || !body.email || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos requeridos: firstName, lastName, email, phone",
        },
        { status: 400 }
      );
    }

    // Hacer la petición a la API externa
    const response = await axios.post(
      `${urls.NEW_API_URL}lead/investorProfile`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Retornar la respuesta de la API externa
    return NextResponse.json({
      success: true,
      message: "Perfil de inversor creado exitosamente",
      data: response.data,
    });
  } catch (error) {
    console.error("Error en /api/lead/investorProfile:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: error.response?.data?.message || "Error al crear el perfil de inversor",
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

