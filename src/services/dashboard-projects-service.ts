import axios from "axios";
import { getApi } from "@/schemas/api-schema";

export interface DashboardProjectLevelUp {
  nextLevelUnits?: number;
  nextLevelName: string | null;
  nextLevelAmount?: number;
  benefits?: string[];
}

export interface DashboardProject {
  id?: string;
  name?: string;
  code?: string;
  levelUp?: DashboardProjectLevelUp;
  // ...otras propiedades (no relevantes para el dashboard por ahora)
  [key: string]: unknown;
}

export interface DashboardProjectsResponse {
  success: boolean;
  message?: string;
  projects?: DashboardProject[];
}

export async function getDashboardProjectsService(): Promise<DashboardProjectsResponse> {
  try {
    // Consistente con el resto del repo: usa URL_BASE_PATH + withCredentials + token fallback
    return await getApi("/api/dashboard/projects", true);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data as DashboardProjectsResponse;
    }
    throw error;
  }
}

