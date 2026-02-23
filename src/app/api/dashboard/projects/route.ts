import { NextRequest, NextResponse } from "next/server";
import { urls } from "@/config/urls";

/**
 * GET /api/dashboard/projects
 * Ruta privada (requiere sesión). Proxy hacia el dashboard.
 *
 * Nota: el backend de Dashboard valida la cookie HttpOnly y/o Authorization fallback.
 */
export async function GET(request: NextRequest) {
  try {
    const upstreamUrl = `${urls.DASHBOARD_URL}/api/dashboard/projects`;

    const cookieHeader = request.headers.get("cookie") ?? "";
    const authHeader = request.headers.get("authorization") ?? "";

    const upstreamRes = await fetch(upstreamUrl, {
      method: "GET",
      headers: {
        ...(cookieHeader ? { cookie: cookieHeader } : {}),
        ...(authHeader ? { authorization: authHeader } : {}),
        accept: "application/json",
      },
      cache: "no-store",
    });

    // Propagar auth errors como privados
    if (upstreamRes.status === 401 || upstreamRes.status === 403) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: upstreamRes.status }
      );
    }

    const contentType = upstreamRes.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await upstreamRes.json()
      : await upstreamRes.text();

    if (!upstreamRes.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Error obteniendo proyectos del dashboard",
          status: upstreamRes.status,
          error: payload,
        },
        { status: 502 }
      );
    }

    // Respuesta directa del upstream
    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error en GET /api/dashboard/projects:", error);
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

