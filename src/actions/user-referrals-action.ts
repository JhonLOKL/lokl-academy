import { getUserReferralsService } from "@/services/user-referrals-service";

export const getUserReferralsAction = async () => {
  try {
    const response = await getUserReferralsService();
    return response;
  } catch (error) {
    console.error("Error en getUserReferralsAction:", error);
    return {
      success: false,
      message: "No se pudieron cargar los referidos",
      data: [],
    };
  }
};
