import { getDashboardProjectsService } from "@/services/dashboard-projects-service";

export const getDashboardProjectsAction = async () => {
  try {
    const response = await getDashboardProjectsService();
    return response;
  } catch (error) {
    console.error("Error al obtener proyectos del dashboard:", error);
    return {
      success: false,
      message: "Error al obtener proyectos del dashboard",
      projects: [],
    };
  }
};

